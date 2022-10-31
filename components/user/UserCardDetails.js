import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';
// import DropIn from 'braintree-web-drop-in-react';
import { apiRoute, getApiHeader } from '../../utils/helpers';
import { getLocalStorageAuth, setLocalStorageAuth } from '../../utils/helpers';
import ReactTooltip from 'react-tooltip';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CourseServices from '../../services/courseServices';
import dynamic from 'next/dynamic';
import moment from 'moment';

const DropIn = dynamic(import('braintree-web-drop-in-react'), {
  ssr: false
});


class UserCardDetails extends Component {
  constructor(props) {
    super(props);
    this.cancelModal = React.createRef();
    this.resumeModal = React.createRef();
    this.cardDetailModal = React.createRef();
    this.generateReport = React.createRef();
    this.transactionReportModal = React.createRef();
    this.updateCardDetails = this.updateCardDetails.bind(this);
    this.resumeSubscription = this.resumeSubscription.bind(this);
    this.state = {
      user: {},
      subscriptionDetails: {},
      subscription: [],
      myCourses: [],
      subscriptionStatus: 0,
      braintreeId: '',
      alert: false,
      alertType: '',
      alertMsg: '',
      couponCode: '',
      planPrice: 21,
      startDate: new Date(),
      endDate: new Date(),
      reasonArray: [],
      reason1: false,
      reason2: false,
      reason3: false,
      reason4: false,
      reason5: false,
      reason6: false,
      reason7: false,
      reason8: false,
      description: '',
      reasonErrorShow: false,
      showDateError: false,
      redirectToGenerate: false,
      transactionReportUrl: '',
      renewPlanId: 2,
      couponApplied: false,
      couponReadOnly: false,
      appiedCouponCode: '',
      couponApplyError: false,
      couponError: false,
      couponErrorMessage: '',
      clintId: '',
      subscription_cancel_date: '',
    };
  }

  handleStartDateChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  handleEndDateChange = (date) => {
    this.setState({
      endDate: date,
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    CourseServices.getClintId(this.props.history).then((res) => {
      this.setState({ clintId: res.data });
    });

    const auth = getLocalStorageAuth();
    console.log(auth)
    if (auth) {
      const userDetails = auth.userDetails;
      console.log(userDetails)
      this.setState({
        user: userDetails,
        subscriptionStatus: userDetails.subscription_status,
        braintreeId: userDetails.braintree_id,
        // braintreeId: userDetails.id,
        subscription_cancel_date: userDetails.subscription_cancel_date,
      });

      if (userDetails.transaction_id) {
      const requestOptions = {
        headers: getApiHeader(true),
      };
      this.props.setLoading(true);
      axios
        .get(
          apiRoute(
            'user-dashboard/get-subscription-details/' +
            userDetails.transaction_id
          ),
          requestOptions
        )
        .then((res) => {
          if (res.data) {
            if (res.data.status == 'Active') {
              this.setState({
                subscriptionDetails: res.data,
                subscriptionStatus: 0,
              });
            } else {
              this.setState({
                subscriptionDetails: res.data,
                subscriptionStatus: 1,
              });
            }
          }
          this.props.setLoading(false);
        })
        .catch((error) => {
          this.props.setLoading(false);
        });
      }else{
        this.setState({
          subscriptionDetails: userDetails,
        });
      } 

      const requestOptions = {
        headers: getApiHeader(true),
      };
      this.props.setLoading(true);
      axios
        .get(apiRoute('user-courses/' + auth.userDetails.id + '/' + 0), requestOptions)
        .then((res) => {

          if (auth.userDetails.has_subscription == '1') {
            let allCourses = [...res.data.courses];
            var myAllCourses = allCourses.filter(
              (v, i, a) => a.findIndex((t) => t.id === v.id) === i
            );
            // console.log("from me page")
            // console.log(res.data);
          } else {
            let allCourses = res.data.courses;
            var myAllCourses = allCourses.filter(
              (v, i, a) => a.findIndex((t) => t.id === v.id) === i
            );
          }
          this.setState({ myCourses: myAllCourses });
        });
    }
  }

  cancelSubscription = (e) => {
    e.preventDefault();
    const requestOptions = {
      headers: getApiHeader(true),
    };
    let reasonArray = [...this.state.reasonArray];

    if (
      this.state.description[0] !== '' &&
      this.state.description[0] !== undefined
    ) {
      reasonArray.push(this.state.description[0]);
    }
    if (reasonArray.length === 0) {
      this.setState({ reasonErrorShow: true });
      return;
    }
    const details = {
      id: this.state.user.id,
      reasons: reasonArray,
    };
    this.cancelModal.current.click();
    this.props.setLoading(true);
    axios
      .post(
        apiRoute('user-dashboard/cancel-user-subscription'),
        details,
        requestOptions
      )
      .then((res) => {
        window.scrollTo(0, 0);
        const auth = getLocalStorageAuth();
        auth.userDetails.subscription_status = 1;
        auth.userDetails.subscription_cancel_date = res.data.userData.subscription_cancel_date;
        setLocalStorageAuth(auth);
        this.setState({
          reasonArray: [],
          reason1: false,
          reason2: false,
          reason3: false,
          reason4: false,
          reason5: false,
          reason6: false,
          reason7: false,
          reason8: false,
          description: '',
          reasonErrorShow: false,
          showOtherReasonInput: false,
          alert: true,
          alertType: 'success',
          alertMsg: res.data.message,
          subscriptionStatus: 1,
        });
        this.props.setLoading(false);
      })
      .catch((error) => {
        window.scrollTo(0, 0);
        this.setState({
          alert: true,
          alertType: 'error',
          alertMsg: 'Something went wrong please try again.',
        });
        this.props.setLoading(false);
      });
  };

  async resumeSubscription(e) {
    e.preventDefault();
    const {
      nonce,
      type,
      details,
    } = await this.renewInstance.requestPaymentMethod();
    const requestOptions = {
      headers: getApiHeader(true),
    };
    this.resumeModal.current.click();
    this.props.setLoading(true);
    const renewDetails = {
      id: this.state.user.id,
      plan: this.state.renewPlanId,
      event: '2',
      couponApplied: this.state.couponApplied,
      couponCode: this.state.appiedCouponCode,
      paymentType: type,
      paymentNonce: nonce,
      paymentDetails: details,
    };
    axios
      .post(
        apiRoute('user-dashboard/resume-user-subscription'),
        renewDetails,
        requestOptions
      )
      .then((res) => {
        window.scrollTo(0, 0);
        const auth = getLocalStorageAuth();
        auth.userDetails = res.data.user;
        setLocalStorageAuth(auth);
        this.setState({
          user: res.data.user,
          alert: true,
          alertType: 'success',
          alertMsg: res.data.message,
          subscriptionStatus: 0,
        });
        this.props.setLoading(false);
        setTimeout(function () {
          window.location.reload(1);
        }, 2000);
      })
      .catch((error) => {
        this.setState({
          alert: true,
          alertType: 'error',
          alertMsg: 'Something went wrong please try again.',
        });
        this.props.setLoading(false);
      });
  }

  async updateCardDetails(e) {
    e.preventDefault();
    const { nonce, type, details } = await this.instance.requestPaymentMethod();
    const requestOptions = {
      headers: getApiHeader(true),
    };
    this.cardDetailModal.current.click();
    this.props.setLoading(true);
    const alldetails = {
      id: this.state.user.id,
      paymentType: type,
      paymentDetails: details,
      token: nonce,
    };
    const auth1 = getLocalStorageAuth();
    auth1.userDetails.card_expiration_date = alldetails.paymentDetails.expirationYear;
    auth1.userDetails.card_last_four = alldetails.paymentDetails.lastFour;
    setLocalStorageAuth(auth1);

    axios
      .post(
        apiRoute('user-dashboard/update-card-details'),
        alldetails,
        requestOptions
      )
      .then((res) => {
        window.scrollTo(0, 0);
        const auth = getLocalStorageAuth();
        auth.userDetails = res.data.user;
        // setLocalStorageAuth(auth);
        this.setState({
          alert: true,
          alertType: 'success',
          alertMsg: res.data.message,
          subscriptionStatus: 0,
        });
        this.setState({
          user: {
            card_expiration_date: alldetails.paymentDetails.expirationYear,
            card_last_four: alldetails.paymentDetails.card_last_four,
          }
        })
        this.props.setLoading(false);
        setTimeout(function () {
          // window.location.reload(1);
        }, 2000);
      })
      .catch((error) => {
        window.scrollTo(0, 0);
        this.setState({
          alert: true,
          alertType: 'error',
          alertMsg: 'Something went wrong please try again.',
        });
        this.props.setLoading(false);
      });
  }

  onCheckboxChange = (e) => {
    const reasonArray = this.state.reasonArray;
    if (e.target.checked) {
      reasonArray.push(e.target.value);
      this.setState({ [e.target.name]: true });
    } else {
      this.setState({ [e.target.name]: false });
      const index = reasonArray.indexOf(e.target.value);
      if (index > -1) {
        reasonArray.splice(index, 1);
      }
    }
    this.setState({ reasonArray: reasonArray });
    console.log(reasonArray);
  };

  onOtherCheckboxChange = (e) => {
    if (e.target.checked) {
      this.setState({ showOtherReasonInput: true, reason8: true });
    } else {
      this.setState({
        showOtherReasonInput: false,
        reason8: false,
        description: '',
      });
    }
  };

  onDiscriptionChange = (e) => {
    this.setState({ description: [e.target.value] });
  };

  handleGenerateReport = (e) => {
    e.preventDefault();
    const startDate = this.state.startDate;
    const endDate = this.state.endDate;
    if (endDate.getTime() > startDate.getTime()) {
      this.setState({ showDateError: false });
      this.transactionReportModal.current.click();
      const requestOptions = {
        headers: getApiHeader(true),
      };
      this.props.setLoading(true);
      const details = {
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        id: this.state.braintreeId,
      };
      axios
        .post(
          apiRoute('user-dashboard/generate-transaction-report'),
          details,
          requestOptions
        )
        .then((res) => {
          this.setState({
            transactionReportUrl: res.data,
            startDate: new Date(),
            endDate: new Date(),
          });
          setTimeout(() => {
            this.generateReport.current.click();
          }, 100);

          this.props.setLoading(false);
        })
        .catch((error) => {
          this.setState({
            alert: true,
            alertType: 'error',
            alertMsg: 'Something went wrong please try again.',
          });
          this.props.setLoading(false);
        });
    } else {
      this.setState({ showDateError: true });
      return false;
    }
  };

  chnageRenewPlan = (e) => {
    this.setState({ renewPlanId: e.target.value });
    this.setState({
      couponApplied: false,
      error: false,
      errors: [],
      couponReadOnly: false,
      couponCode: '',
    });
    if (e.target.value == '2') {
      this.setState({ planPrice: 21 });
    } else {
      this.setState({ planPrice: 210 });
    }
  };

  applyCouponCode = () => {
    //\\ this.props.setLoadingTrue();
    const details = {
      plan: this.state.renewPlanId,
      couponCode: this.state.couponCode,
      event: '2',
    };
    const requestOptions = {
      headers: getApiHeader(),
    };
    axios
      .post(apiRoute('check-subscriber-coupon'), details, requestOptions)
      .then((res) => {
        if (res.data.type == '2') {
          this.setState({
            couponApplied: true,
            freeTrialDays: res.data.freeDays,
            appiedCouponCode: this.state.couponCode,
            couponReadOnly: true,
            couponError: false,
            couponErrorMessage: '',
          });
        } else {
          this.setState({
            couponApplied: true,
            planPrice: res.data.price,
            appiedCouponCode: this.state.couponCode,
            couponReadOnly: true,
            couponError: false,
            couponErrorMessage: '',
          });
        }
        //  this.props.setLoading(false);
      })
      .catch((error) => {
        window.scrollTo(0, 0);
        this.setState({
          couponApplied: false,
          couponError: true,
          couponErrorMessage: 'Invalid coupon code.',
          couponReadOnly: false,
          couponCode: '',
        });
        // this.props.setLoading(false);
      });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { alert, alertType, alertMsg } = this.state;
    const clintId = this.state.clintId;
    const nextBillingsub = this.state.subscriptionDetails.nextBillingDate
      ? this.state.subscriptionDetails.nextBillingDate.date.split(' ')[0]
      : '-';
    const lastBillingsub = this.state.subscriptionDetails.nextBillingDate
      ? this.state.subscriptionDetails.billingPeriodStartDate.date.split(' ')[0]
      : '-';
    return (
      <>
        {this.state.subscriptionStatus !== 0 ? (
          <div class='text-right'>
            <button
              class='btn btn-sm my-3'
              type='submit'
              name='action'
              data-toggle='modal'
              data-target='#delete-account'
            >
              Delete my account
            </button>
          </div>
        ) : (
          ''
        )}
        <div className='tooltipster plantype tooltipstered'>
          Membership
        </div>
        {alert && alertType === 'error' && (
          <div className='alert alert-danger' role='alert'>
            {alertMsg}
          </div>
        )}
        {alert && alertType === 'success' && (
          <div className='alert alert-success' role='alert'>
            {alertMsg}
          </div>
        )}
        <table className='table table-striped profile-table detail-table border-0'>
          <tbody>
            {/* <tr>
              <th scope='row'>Name:</th>
              <td>
                {this.state.user.first_name} {this.state.user.last_name}
              </td>
            </tr> */}
            <tr>
              <th scope='row'>Email:</th>
              <td>{this.state.user.email}</td>
            </tr>
            <tr>
              <th scope='row'>Membership Status:</th>
              <td>
                {/* {this.state.subscriptionStatus == 0 ? 'Active' : 'Canceled'} */}
                {this.state.subscriptionStatus == 0 ? 'Active' : 'Inactive'}
                {
                  this.state.subscriptionStatus == 0 ? (
                    <span className='btn btn-sm ml-3' >
                      <div data-toggle='modal' data-target='#cancel-sub'>
                        <a
                          className=''
                          data-html={true}
                          data-for='custom-color-no-arrow'
                          data-tip='Cancel subscription'
                        >
                          Cancel
                        </a>
                        <ReactTooltip
                          id='custom-color-no-arrow'
                          className='react-tooltip'
                          delayHide={1000}
                          textColor='#FFF'
                          backgroundColor='#000'
                          effect='solid'
                        />
                      </div>
                    </span>
                  ) : (
                    <div data-toggle='modal' data-target='#resume-sub'>
                      <a
                        className='btn btn-sm '
                        data-html={true}
                        data-for='custom-color-no-arrow'
                        data-tip='Renew subscription'
                      >
                        Reactivate
                      </a>
                      <ReactTooltip
                        id='custom-color-no-arrow'
                        className='react-tooltip'
                        delayHide={1000}
                        textColor='#FFF'
                        backgroundColor='#000'
                        effect='solid'
                      />
                    </div>
                  )
                }
              </td>
            </tr>
            <tr>
              <th scope='row'>Membership Plan:</th>
              <td>
                {this.state.user.plan_id == 2 ? 'Monthly' : 'Yearly'} Plan
                {/* <span className='btn btn-sm bg-yellow'>
                  {this.state.user.plan_id == 2 ? 'Monthly' : 'Yearly'} Plan
                </span> */}
              </td>
            </tr>
            <tr>
              <th scope='row'>Plan Price:</th>
              <td>${this.state.subscriptionDetails.price? this.state.subscriptionDetails.price : this.state.subscriptionDetails.amount}</td>
           </tr>
           <tr>
              <th scope='row'>Paid Amount:</th>
              {/* {this.state.subscriptionDetails.transactions &&
                this.state.subscriptionDetails.transactions.length > 0 ? ( */}
                <td>${this.state.user.gross_amount}.00</td>
              {/* ) : (
                <td>$00.00</td>
              )}  */}
            </tr>
            {this.state.subscriptionStatus == 0 ? (
              <>
                <tr>
                  <th scope='row'>Next billing Amount:</th>
                  <td>
                  {this.state.subscriptionStatus == 0
                  ? this.state.subscriptionDetails.nextBillingPeriodAmount? '$'+this.state.subscriptionDetails.nextBillingPeriodAmount : '00.00'
                  : '00.00'}
                  </td>
                </tr>
                <tr>
                  <th scope='row'>Renewal Date:</th>
                  <td>
                    {this.state.subscriptionStatus == 0 ? moment(nextBillingsub).format('Do MMMM YYYY') : '-'}
                  </td>
                </tr>
                <tr>
                  <th scope='row'>Subscribed Date:</th>
                  <td>
                    {this.state.subscriptionStatus == 0 ? moment(lastBillingsub).format('Do MMMM YYYY') : '-'}
                  </td>
                </tr>
              </>
            ) : (
              <tr>
                <th scope='row'>Cancel Subscription Date:</th>
                <td>{moment(this.state.subscription_cancel_date?.split(' ')[0]).format('Do MMMM YYYY')}</td>
              </tr>
            )}

          </tbody>
        </table>
        <div className='operation_sub text-right d-none'>
          {/* {this.state.user.plan_id == 2 ?
            <div data-toggle="modal" data-target="#upgrade"><a className="pop btn btn-sm" data-container="body" data-toggle="popover" data-placement="top" data-content="Upgrade to yearly subscription" data-original-title title><i className="fas fa-arrow-up" /></a></div>
            : null} */}

          {/* {this.state.subscriptionStatus == 0 ?
            <div data-toggle="modal" data-target="#cancel-sub">
              <a className="btn btn-sm red" data-html={true} data-for='custom-color-no-arrow' data-tip='Cancel subscription'><i className="fas fa-times" /></a>
              <ReactTooltip id='custom-color-no-arrow' className='react-tooltip' delayHide={1000} textColor='#FFF' backgroundColor='#000' effect='solid'/>
            </div>
            :
            <div data-toggle="modal" data-target="#resume-sub">
              <a className="btn btn-sm green" data-html={true} data-for='custom-color-no-arrow' data-tip='Renew subscription'><i className="fas fa-check" /></a>
              <ReactTooltip id='custom-color-no-arrow' className='react-tooltip' delayHide={1000} textColor='#FFF' backgroundColor='#000' effect='solid'/>
            </div>}

          <div data-toggle="modal" data-target="#manage-method">
            <a data-html={true} data-for='custom-color-no-arrow' data-tip='Manage payment method'><img src="/../images/mastercard.png" /></a>
            <ReactTooltip id='custom-color-no-arrow' className='react-tooltip' delayHide={1000} textColor='#FFF' backgroundColor='#000' effect='solid'/>
            </div>*/}
        </div>
        {/* {this.state.subscriptionStatus == 0 ? (
          <div className='upgrade-wrapper'>
            <div className='tooltipster plantype tooltipstered'>
              Update your payment card details
            </div>
            <div className='upgrade-box'>
              <p className='mb-0 mr-2'>
                If you face a problem renewing your subscription or you want to
                change your payment card, please click the icon.
              </p>
              <div data-toggle='modal' data-target='#manage-method'>
                <a
                  data-html={true}
                  data-for='custom-color-no-arrow'
                  data-tip='Manage payment method'
                >
                  <img src='/../images/mastercard.png' />
                </a>
                <ReactTooltip
                  id='custom-color-no-arrow'
                  className='react-tooltip'
                  delayHide={1000}
                  textColor='#FFF'
                  backgroundColor='#000'
                  effect='solid'
                />
              </div>
            </div>
          </div>
        ) : (
          ''
        )} */}

        {this.state.subscriptionStatus == 0 ? (
          <div>
            <div className='tooltipster plantype tooltipstered mt-2'>
              Payment Method
            </div>
            <table className='table table-striped profile-table detail-table border-0'>
              <tbody>
                <tr>
                  <th scope='row'>Payment card:</th>
                  <td>{this.state.user.card_brand}</td>
                </tr>
                <tr>
                  <th scope='row'>Card Number:</th>
                  <td>**** **** **** {this.state.user.card_last_four}</td>
                </tr>
                <tr>
                  <th scope='row'>Expiry Date:</th>
                  <td>{this.state.user.card_expiration_date? this.state.user.card_expiration_date : 'Null'}</td>
                </tr>
              </tbody>
            </table>
            <p className='mb-0 mr-2'>
              If you face a problem renewing your subscription or you want to
              change your payment card.
            </p>
            <div className='mt-3 text-right' data-toggle='modal' data-target='#manage-method'>
              <a
                className='btn btn-sm mb-3'
                data-html={true}
                data-for='custom-color-no-arrow'
                data-tip='Manage payment method'
              >
                Update Payment Method
              </a>
              <ReactTooltip
                id='custom-color-no-arrow'
                className='react-tooltip'
                delayHide={1000}
                textColor='#FFF'
                backgroundColor='#000'
                effect='solid'
              />
            </div>
          </div>
        ) : (
          ''
        )}
        {/* <div className='upgrade-wrapper'>
          {this.state.subscriptionStatus == 0 ? (
            <div>
              <div className='tooltipster plantype tooltipstered'>
                Cancel Subscription
              </div>
              <div className='upgrade-box'>
                <p className='mb-0 mr-2'>
                  You may cancel your subscription by clicking the icon. We are
                  sad to see you leave!
                </p>
                <div data-toggle='modal' data-target='#cancel-sub'>
                  <a
                    className='btn btn-sm red'
                    data-html={true}
                    data-for='custom-color-no-arrow'
                    data-tip='Cancel subscription'
                  >
                    <i className='fas fa-times' />
                  </a>
                  <ReactTooltip
                    id='custom-color-no-arrow'
                    className='react-tooltip'
                    delayHide={1000}
                    textColor='#FFF'
                    backgroundColor='#000'
                    effect='solid'
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className='tooltipster plantype tooltipstered'>
                Reactivate Subscription
              </div>
              <div className='upgrade-box'>
                <p className='mb-0 mr-2'>
                  You can now reactivate the subscription from your dashboard,
                  to reactivate the subscription click the icon.
                </p>
                <div data-toggle='modal' data-target='#resume-sub'>
                  <a
                    className='btn btn-sm green'
                    data-html={true}
                    data-for='custom-color-no-arrow'
                    data-tip='Renew subscription'
                  >
                    <i className='fas fa-check' />
                  </a>
                  <ReactTooltip
                    id='custom-color-no-arrow'
                    className='react-tooltip'
                    delayHide={1000}
                    textColor='#FFF'
                    backgroundColor='#000'
                    effect='solid'
                  />
                </div>{' '}
              </div>
            </div>
          )}
        </div> */}


        {this.state.subscriptionStatus == 0 ? (
          <>

            <div className='tooltipster plantype tooltipstered mt-2'>
              Your Purchased Courses
            </div>
            {this.state.myCourses.length > 0 ? (
              <>
                <table className='table table-striped profile-table detail-table border-0'>
                  <tbody>
                    <tr>
                      <th>Id</th>
                      <th scope='row'>Course Name</th>
                      <td>Amount($)</td>
                      <td>Purchased Date</td>
                    </tr>{this.state.myCourses.map((item, index) => {
                      return (
                        <>
                          <tr>
                            <td scope='row'>{index + 1}</td>                            <td>{item.title}</td>
                            <td>${item.price}</td>
                            <td>{item.created_at.split(' ')[0]}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </>
            ) : null}
            {this.state.myCourses.length == 0 ? (
              <div className='card-panel valign-wrapper grey lighten-4'>
                <div className='row'>
                  <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center'>
                    No data found in this category.
                  </div>
                  <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center'>
                    <Link href='/user/my-courses'>
                      <a className='btn btn-sm'>Discover Now</a>
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}



          </>
        ) : (
          ''
        )}

        {/* <h5 className='card-title'>Payment History</h5> */}
        <div className='tooltipster plantype tooltipstered mt-2'>
          Payment History
        </div>
        <div className='table-responsive scroll-visible'>
          <table className='table table-striped profile-table mb-0'>
            <tbody>
              <tr>
                <td>Id</td>
                <td>Plan</td>
                <td>Amount($)</td>
                <td>Status</td>
                <td>Applied Coupons</td>
                <td>Transaction History</td>
                <td>Created On</td>
              </tr>
              <tr>
                <td>1</td>
                <td>{this.state.user.plan_id == 2 ? 'Monthly' : 'Yearly'}</td>
                <td>${this.state.subscriptionDetails.price}</td>
                <td>
                  {this.state.subscriptionStatus == 0 ? 'Active' : 'Canceled'}
                </td>
                <td>
                  {this.state.user.discount_amount == 0
                    ? '-'
                    : this.state.user.discount_amount}
                </td>
                <td>
                  <div data-toggle='modal' data-target='#transactions'>
                    <a
                      className='btn-sm black px-3 text-white'
                      data-html={true}
                      data-for='custom-color-no-arrow'
                      data-tip='View all transactions'
                    >
                      Transactions
                    </a>
                    <ReactTooltip
                      id='custom-color-no-arrow'
                      className='react-tooltip'
                      delayHide={1000}
                      textColor='#FFF'
                      backgroundColor='#000'
                      effect='solid'
                    />
                  </div>
                </td>
                <td>
                  {this.state.subscriptionDetails.billingPeriodStartDate
                    ? this.state.subscriptionDetails.billingPeriodStartDate.date.split(
                      ' '
                    )[0]
                    : ''}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className='modal fade show'
          id='cancel-sub'
          tabindex='-1'
          role='dialog'
          aria-labelledby='cancel-subTitle'
          aria-modal='true'
        >
          <div
            className='modal-dialog modal-lg modal-dialog-centered'
            role='document'
          >
            <div className='modal-content'>
              <div className='modal-body p-4'>
                <form onSubmit={this.cancelSubscription}>
                  <h6 class='mb-4'>Cancel Sattva Connect Subscription</h6>
                  {this.state.reasonErrorShow && (
                    <div className='alert alert-success col-sm-8' role='alert'>
                      Please select a reason for cancelling your subscription.
                    </div>
                  )}
                  <p>
                    Hi {this.state.user.first_name} {this.state.user.last_name},
                    we are sorry to see that you are leaving Sattva Connect. We
                    are committed to continuously improve the user experience,
                    please take a moment to let us know why are you leaving us:
                  </p>
                  <div className='checkbox'>
                    <input
                      id='reason1'
                      type='checkbox'
                      name='reason1'
                      value='Financial reason'
                      onChange={this.onCheckboxChange}
                      checked={this.state.reason1}
                    />
                    <label htmlFor='reason1'>Financial reason</label>
                  </div>
                  <div className='checkbox'>
                    <input
                      id='reason2'
                      type='checkbox'
                      name='reason2'
                      value='Not worth the price.'
                      onChange={this.onCheckboxChange}
                      checked={this.state.reason2}
                    />
                    <label htmlFor='reason2'>Not worth the price</label>
                  </div>
                  <div className='checkbox'>
                    <input
                      id='reason3'
                      type='checkbox'
                      name='reason3'
                      value='It is not intuitive.'
                      onChange={this.onCheckboxChange}
                      checked={this.state.reason3}
                    />
                    <label htmlFor='reason3'>It is not intuitive</label>
                  </div>
                  <div className='checkbox'>
                    <input
                      id='reason4'
                      type='checkbox'
                      name='reason4'
                      value='I need improved Customer Service.'
                      onChange={this.onCheckboxChange}
                      checked={this.state.reason4}
                    />
                    <label htmlFor='reason4'>
                      I need improved Customer Service
                    </label>
                  </div>
                  <div className='checkbox'>
                    <input
                      id='reason5'
                      type='checkbox'
                      name='reason5'
                      value="I don't like SattvaConnect contents."
                      onChange={this.onCheckboxChange}
                      checked={this.state.reason5}
                    />
                    <label htmlFor='reason5'>
                      I don't like SattvaConnect contents
                    </label>
                  </div>
                  {/* <div className="checkbox">
                  <input id="reason6" type="checkbox" name="reason6" value="Moving where SattvaConnect doesn't work." onChange={this.onCheckboxChange} checked={this.state.reason6} />
                  <label htmlFor="reason6">Moving where SattvaConnect doesn't work</label>
                </div> */}
                  <div className='checkbox'>
                    <input
                      id='reason7'
                      type='checkbox'
                      name='reason7'
                      value='I want to try another service.'
                      onChange={this.onCheckboxChange}
                      checked={this.state.reason7}
                    />
                    <label htmlFor='reason7'>
                      I want to try another service
                    </label>
                  </div>
                  <div className='checkbox'>
                    <input
                      id='reason8'
                      type='checkbox'
                      name='reason8'
                      onChange={this.onOtherCheckboxChange}
                      checked={this.state.reason8}
                    />
                    <label htmlFor='reason8'>Other</label>
                  </div>
                  {this.state.showOtherReasonInput && (
                    <div className='input-field position-relative'>
                      <textarea
                        cols={50}
                        rows={5}
                        name='description'
                        class='mt-3 pt-0'
                        value={this.state.description}
                        onChange={this.onDiscriptionChange}
                      />
                      <label htmlFor='address'>Write your own reason</label>
                    </div>
                  )}
                  <div className='text-right mt-3 d-flex justify-content-end'>
                    <button
                      type='submit'
                      className='btn btn-sm red waves-effect waves-light'
                    >
                      Cancel Subscription
                    </button>
                    <button
                      type='button'
                      ref={this.cancelModal}
                      className='btn btn-sm waves-effect waves-light ml-3'
                      data-dismiss='modal'
                    >
                      Stay with us
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          data-toggle='modal'
          data-target='#transaction-history'
          className=' mt-3 text-right'
        >
          <a
            className='btn btn-sm'
            data-html={true}
            data-for='custom-color-no-arrow'
            data-tip='Download/Print Transaction History'
          >
            Transaction history <i class='fa fa-print' aria-hidden='true'></i>
          </a>
          <ReactTooltip
            id='custom-color-no-arrow'
            className='react-tooltip'
            delayHide={1000}
            textColor='#FFF'
            backgroundColor='#000'
            effect='solid'
          />
        </div>
        {this.state.subscriptionStatus == 1 ? (
          <div
            className='modal fade show'
            id='resume-sub'
            tabindex='-1'
            role='dialog'
            aria-labelledby='cancel-subTitle'
            aria-modal='true'
          >
            <div
              className='modal-dialog modal-lg modal-dialog-centered'
              role='document'
            >
              <div className='modal-content'>
                <div className='modal-content'>
                  <div className='modal-body'>
                    <h6>Renew your subscription.</h6>
                    {this.state.couponApplied && (
                      <div
                        className='alert alert-success mt-2 col-sm-8'
                        role='alert'
                      >
                        Coupon applied successfully.
                      </div>
                    )}
                    {this.state.couponError && (
                      <div
                        className='alert alert-danger mt-2 col-sm-8'
                        role='alert'
                      >
                        {this.state.couponErrorMessage}
                      </div>
                    )}
                    <form onSubmit={this.resumeSubscription}>
                      <div className='table-responsive mt-20'>
                        <div class='control-group'>
                          <label
                            id='Plan-lbl'
                            for='Plan'
                            class='control-label active'
                          >
                            Plan<span class='required'>&nbsp;*</span>
                          </label>
                          <select
                            onChange={this.chnageRenewPlan}
                            name='renewPlan'
                          >
                            <option value='2'>Monthly</option>
                            <option value='5'>Yearly</option>
                          </select>
                        </div>

                        <div class='control-group'>
                          <label
                            id='Price-lbl'
                            for='Price'
                            class='control-label'
                          >
                            Price<span class='required'>&nbsp;*</span>
                          </label>
                          <input
                            type='text'
                            name='Price'
                            id='Price'
                            readonly=''
                            value={this.state.planPrice}
                          />
                        </div>
                        <div className='control-group'>
                          <div className='col-sm-12'>
                            <div className='position-relative'>
                              <label
                                id='couponCode-lbl'
                                for='couponCode'
                                className='control-label'
                              >
                                Coupon Code
                              </label>
                              <input
                                type='text'
                                name='couponCode'
                                readOnly={this.state.couponReadOnly}
                                id='couponCode'
                                value={this.state.couponCode}
                                onChange={this.onChange}
                              />
                              {this.state.couponApplied == false ? (
                                <button
                                  type='button'
                                  class='btn btn-lg waves-effect waves-light couponBtn'
                                  onClick={this.applyCouponCode}
                                >
                                  Apply{' '}
                                </button>
                              ) : (
                                <button
                                  type='button'
                                  class='btn btn-lg waves-effect waves-light couponBtn'
                                >
                                  Applied
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <h6 className='mt-3'>Enter Card Details</h6>

                      {clintId ? (
                        <DropIn
                          options={{
                            authorization: clintId,
                            paymentOptionPriority: ['card', 'paypal'],
                            paypal: { flow: 'vault' },
                          }}
                          onInstance={(instance) =>
                            (this.renewInstance = instance)
                          }
                        />
                      ) : (
                        ''
                      )}
                      <div className='text-right'>
                        <button type='submit' className='pop btn btn-sm'>
                          Renew
                        </button>
                        <button
                          type='button'
                          ref={this.resumeModal}
                          className='btn btn-sm ml-3'
                          data-dismiss='modal'
                        >
                          <i class='fas fa-times'></i>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        {this.state.subscriptionStatus == 0 ? (
          <div
            className='modal fade'
            id='manage-method'
            tabindex='-1'
            role='dialog'
            aria-labelledby='manage-methodTitle'
            aria-hidden='true'
          >
            <div
              className='modal-dialog modal-lg modal-dialog-centered'
              role='document'
            >
              <div className='modal-content'>
                <div className='modal-body'>
                  <h6>Payment Method</h6>
                  <div className='table-responsive'>
                    <table className='table table-striped profile-table mt-3'>
                      <tbody>
                        {this.state.user.paypanet_type == 'CreditCard' ? (
                          <>
                            <tr>
                              <td>Method:</td>
                              <td>Card</td>
                            </tr>
                            <tr>
                              <td>Payment card:</td>
                              <td>{this.state.user.card_brand}</td>
                            </tr>
                            <tr>
                              <td>Last 4 digits:</td>
                              <td>{this.state.user.card_last_four}</td>
                            </tr>
                          </>
                        ) : (
                          <>
                            <tr>
                              <td>Method:</td>
                              <td>PayPal</td>
                            </tr>
                            <tr>
                              <td>PayPal Email:</td>
                              <td>{this.state.user.paypal_email}</td>
                            </tr>
                            <tr>
                              <td>User:</td>
                              <td>{this.state.user.paypal_user}</td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <h6 className='mt-3'>Update payment method</h6>
                  <form onSubmit={this.updateCardDetails}>
                    {clintId ? (
                      <DropIn
                        options={{
                          authorization: clintId,
                          paymentOptionPriority: ['card', 'paypal'],
                          paypal: { flow: 'vault' },
                        }}
                        onInstance={(instance) => (this.instance = instance)}
                      />
                    ) : (
                      ''
                    )}
                    <div className='text-right'>
                      <button type='submit' className='pop btn btn-sm'>
                        Update
                      </button>
                      <button
                        type='button'
                        ref={this.cardDetailModal}
                        className='btn btn-sm ml-3'
                        data-dismiss='modal'
                      >
                        <i class='fas fa-times'></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        <div
          className='modal fade'
          id='transactions'
          tabindex='-1'
          role='dialog'
          aria-labelledby='transactionsTitle'
          aria-hidden='true'
        >
          <div
            className='modal-dialog modal-lg modal-dialog-centered'
            role='document'
          >
            <div className='modal-content'>
              <div className='modal-body'>
                <h6>Transactions</h6>
                <div className='table-responsive scroll-visible'>
                  <table className='table table-striped profile-table mt-3'>
                    <tbody>
                      <tr>
                        <th>Id</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Currency</th>
                        <th>Card Type</th>
                        <th>Type</th>
                        <th>Updated</th>
                      </tr>
                      {this.state.subscriptionDetails.transactions &&
                        this.state.subscriptionDetails.transactions.map(
                          (item, index) => {
                            return (
                              <tr>
                                <td>{item.id}</td>
                                <td>
                                  <span className=' trans-settled'>
                                    {item.status}
                                  </span>
                                </td>
                                <td>{item.amount}</td>
                                <td>{item.currencyIsoCode}</td>
                                <td>{item.paymentInstrumentType}</td>
                                <td>
                                  <span className=' trans-settled'>
                                    {item.type}
                                  </span>
                                </td>
                                <td>{item.createdAt.date.split(' ')[0]}</td>
                              </tr>
                            );
                          }
                        )}
                    </tbody>
                  </table>
                </div>
                <div class='text-right mt-3'>
                  <button
                    type='button'
                    className='btn btn-sm'
                    data-dismiss='modal'
                  >
                    <i class='fas fa-times'></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className='modal fade'
          id='transaction-history'
          tabindex='-1'
          role='dialog'
          aria-labelledby='transactionsTitle'
          aria-hidden='true'
        >
          <div
            className='modal-dialog modal-lg modal-dialog-centered'
            role='document'
          >
            <div className='modal-content'>
              <form
                className='customer-form mt-0'
                onSubmit={this.handleGenerateReport}
              >
                <div className='modal-body'>
                  <h6>Select a date range</h6>

                  <div className='input-field col-md-12 p-0 custom-datepicker'>
                    <DatePicker
                      name='startDate'
                      selected={this.state.startDate}
                      onChange={this.handleStartDateChange}
                      dateFormat='yyyy-MM-dd'
                      maxDate={new Date()}
                    />
                    <label htmlFor='graduationDate' className='active'>
                      Start date:
                    </label>
                  </div>
                  <div className='input-field col-md-12 p-0 custom-datepicker'>
                    <DatePicker
                      name='endDate'
                      selected={this.state.endDate}
                      onChange={this.handleEndDateChange}
                      dateFormat='yyyy-MM-dd'
                      maxDate={new Date()}
                    />
                    <label htmlFor='graduationDate' className='active'>
                      End date:
                    </label>
                  </div>
                  {this.state.showDateError && (
                    <div className='alert alert-danger col-sm-8' role='alert'>
                      <p>End date is must be greater than start date</p>
                    </div>
                  )}
                  <a
                    href={this.state.transactionReportUrl}
                    target='_blank'
                    className='dsb'
                    ref={this.generateReport}
                  ></a>
                  <div class='text-right mt-3'>
                    <button className='btn btn-sm' type='submit'>
                      {' '}
                      <i class='fa fa-print' aria-hidden='true'></i> Generate
                      Report
                    </button>
                    <button
                      type='button'
                      className='btn btn-sm ml-3'
                      data-dismiss='modal'
                      ref={this.transactionReportModal}
                    >
                      <i class='fas fa-times'></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UserCardDetails;