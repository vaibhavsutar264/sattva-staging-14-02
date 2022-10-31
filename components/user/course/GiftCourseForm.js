import React, { Component } from 'react';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {
  apiRoute,
  getApiHeader,
  getLocalStorageAuth,
  getGpayMerchantId,
} from '../../../utils/helpers';
import CourseServices from '../../../services/courseServices';
import SimpleReactValidator from 'simple-react-validator';
import CountryOptions from '../../CountryOptions';
import PhoneCodeOptions from '../../PhoneCodeOptions';
import Constants from '../../../constants';
import Router from 'next/router';
import dynamic from 'next/dynamic';

const DropIn = dynamic(import('braintree-web-drop-in-react'),{
  ssr:false
});

class GiftCourseForm extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.recaptchaRef = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.onCountryChange = this.onCountryChange.bind(this);
    this.validator = new SimpleReactValidator();
    this.state = {
      senderEmail: '',
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      countryCode: '',
      phone: '',
      terms: '',
      message: '',
      newslatter: '',
      couponCode: '',
      appiedCouponCode: '',
      security: true,
      errors: [],
      error: false,
      errorMsg: '',
      donationAmount: '',
      userId: '',
      date: new Date(),
      giftedDate: this.getCurrentDate(),
      redirectToThankyou: false,
      recaptcha: false,
      minDonationStatus: true,
      haveCourse: false,
      couponApplied: false,
      coursePrice: 0,
      clientId: false,
      loading: false,
      gpayMerchantId: getGpayMerchantId(),
    };
  }

  componentDidMount() {
    CourseServices.getClintId().then((res) => {
      this.setState({
        clientId: res.data,
      });
    });
    const auth = getLocalStorageAuth();
    if (auth) {
      this.setState({
        senderEmail: auth.userDetails.email,
        userId: auth.userDetails.id,
      });
    }
    this.setState({
      course: this.props.course,
      coursePrice: this.props.course.price,
    });
  }

  getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    var today = yyyy + '-' + mm + '-' + dd;
    return today;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCountryChange(e) {
    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index];
    var phoneCode = optionElement.getAttribute('phoneCode');
    this.setState({ country: e.target.value });
    this.setState({ countryCode: phoneCode });
  }

  onCheckboxChange = (e) => {
    if (e.target.checked) {
      this.setState({ [e.target.name]: 1 });
    } else {
      this.setState({ [e.target.name]: '' });
    }
  };

  onEmailChange(e) {
    const email = e.target.value;
    const requestOptions = {
      headers: getApiHeader(),
    };
    axios
      .get(
        apiRoute('check-user-have-course/' + this.props.courseId + '/' + email),
        requestOptions
      )
      .then((res) => {
        this.setState({ haveCourse: res.data.status });
      });

    this.setState({ email: email });
  }

  onResolved = () => {
    this.setState({ recaptcha: this.recaptcha.getResponse() });
    console.log(this.recaptcha.getResponse());
  };

  async onSubmit(e) {
    e.preventDefault();
    if (!this.validator.allValid()) {
      window.scrollTo(500, 500);
      this.validator.showMessages();
      this.forceUpdate();
      return false;
    }

    if (!this.state.minDonationStatus) {
      window.scrollTo(500, 500);
      return false;
    }
    if (this.state.haveCourse) {
      window.scrollTo(500, 500);
      return false;
    }

    const recaptcha = await this.recaptchaRef.current.getValue();
    if (!recaptcha) {
      window.scrollTo(500, 500);
      const widId = this.recaptchaRef.current.getWidgetId();
      this.recaptchaRef.current.reset(widId);
      this.setState({ security: false });
      return false;
    } else {
      this.setState({ security: true });
    }

    if (!this.instance) {
      return false;
    }
    const { nonce, type, details } = await this.instance.requestPaymentMethod();
    this.setState({ loading: true });
    const userDetail = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      city: this.state.city,
      zip: this.state.zip,
      country: this.state.country,
      countryCode: this.state.countryCode,
      phone: this.state.phone,
      email: this.state.email,
      senderEmail: this.state.senderEmail,
      message: this.state.message,
      courseId: this.props.courseId,
      newslatter: this.state.newslatter,
      giftedDate: this.state.giftedDate,
      recaptcha: recaptcha,
      paymentType: type,
      paymentNonce: nonce,
      paymentDetails: details,
      donationAmount: this.state.donationAmount,
      couponApplied: this.state.couponApplied,
      appiedCouponCode: this.state.appiedCouponCode,
    };

    CourseServices.giftCourseWithRegistration(userDetail)
      .then((res) => {
        window.scrollTo(0, 0);
        const userEmailDetails = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
        };
        const requestOptions = {
          headers: getApiHeader(),
        };
        if (this.state.newslatter == '1') {
          axios.post(
            apiRoute('add-user-to-mailchimp'),
            userEmailDetails,
            requestOptions
          );
        }
        Router.push(Constants.SITE_URL + '/user/course-buy-success');
        this.setState({ loading: false });
      })
      .catch((error) => {
        window.scrollTo(0, 0);
        this.setState({ loading: false });
        const widId = this.recaptchaRef.current.getWidgetId();
        this.recaptchaRef.current.reset(widId);
        var errorsArray = [];
        if (error.response.status === 422) {
          var errors = error.response.data.errors;
          Object.keys(errors).forEach(function (key) {
            errorsArray.push({ message: errors[key][0] });
          });
          this.setState({ error: true, errors: errorsArray });
        } else {
          errorsArray.push({ message: error.response.data.message });
          this.setState({ error: true, errors: errorsArray });
        }
      });
  }

  applyCouponCode = () => {
    const details = {
      courseId: this.props.courseId,
      couponCode: this.state.couponCode,
      type: '2',
      couponFor: '1',
    };
    const requestOptions = {
      headers: getApiHeader(),
    };
    this.setState({ loading: true });
    axios
      .post(apiRoute('check-course-coupon'), details, requestOptions)
      .then((res) => {
        let newPrice = this.state.coursePrice - res.data.amount;
        this.setState({
          loading: false,
          couponApplied: true,
          coursePrice: newPrice,
          appiedCouponCode: this.state.couponCode,
          couponReadOnly: true,
          error: false,
          errors: [],
        });
      })
      .catch((error) => {
        window.scrollTo(500, 500);
        var errorsArray = [];
        errorsArray.push({ message: 'Invalid coupon code.' });
        this.setState({
          loading: false,
          couponApplied: false,
          error: true,
          errors: errorsArray,
          couponReadOnly: false,
          couponCode: '',
        });
      });
  };

  onDonationChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value) {
      if (e.target.value >= this.state.coursePrice) {
        this.setState({ minDonationStatus: true });
      } else {
        this.setState({ minDonationStatus: false });
      }
    } else {
      this.setState({ minDonationStatus: false });
    }
  };

  render() {
    const handleOnBlur = ({ target: { value } }) => {
      this.setState({ giftedDate: value });
    };

    const { clientId } = this.state;
    return (
      <>
        {this.state.loading && (
          <div className='preloader-background'>
            <div className='big sattva_loader active'>
              <img src={Constants.SITE_URL + '/images/loader.png'} />
            </div>
          </div>
        )}
        <form
          onSubmit={this.onSubmit}
          id='giftCourseForm'
          autocomplete='off'
          className='form form-horizontal'
        >
          <div className='card p-4 d-block'>
            <div className='customer-support p-0'>
              <h4>Receiver Details</h4>
              {this.state.minDonationStatus == false && (
                <div
                  className='alert alert-danger alert-dismissible fade show'
                  role='alert'
                >
                  <p>Minimum donation amount is ${this.state.coursePrice}.</p>
                </div>
              )}
              {this.state.haveCourse == true && (
                <div
                  className='alert alert-danger alert-dismissible fade show'
                  role='alert'
                >
                  <p>{this.state.email} already have this course.</p>
                </div>
              )}
              {this.state.security === false && (
                <div
                  className='alert alert-danger alert-dismissible fade show'
                  role='alert'
                >
                  <p>Recaptcha is required.</p>
                </div>
              )}
              {this.state.errors.map((item, index) => {
                return (
                  <div
                    className='alert alert-danger alert-dismissible fade show'
                    role='alert'
                  >
                    <p>{item.message}</p>
                  </div>
                );
              })}
              <div className='row detail-form'>
                <div className='input-field col-md-6'>
                  <label
                    id='firstName-lbl'
                    for='firstName'
                    className=' required'
                  >
                    Receiver's First Name<span className='star'>&#160;*</span>
                  </label>
                  <input
                    type='text'
                    name='firstName'
                    id='firstName'
                    value={this.state.firstName}
                    onChange={this.onChange}
                  />
                  {this.validator.message(
                    'firstName',
                    this.state.firstName,
                    'required|max:50'
                  )}
                </div>
                <div className='input-field col-md-6'>
                  <label id='lastName-lbl' for='lastName' className='required'>
                    Receiver's Last Name<span className='star'>&#160;*</span>
                  </label>
                  <input
                    type='text'
                    name='lastName'
                    id='lastName'
                    value={this.state.lastName}
                    onChange={this.onChange}
                  />
                  {this.validator.message(
                    'lastName',
                    this.state.lastName,
                    'required|max:50'
                  )}
                </div>
                <div className='input-field col-md-6'>
                  <label id='email-lbl' for='email' className=' required'>
                    Receiver's Email<span className='star'>&#160;*</span>
                  </label>
                  <input
                    type='text'
                    name='email'
                    id='buyerEmail'
                    value={this.state.email}
                    onChange={this.onEmailChange}
                  />
                  {this.validator.message(
                    'email',
                    this.state.email,
                    'required|email'
                  )}
                </div>
                <div className='input-field col-md-6'>
                  <label id='date-lbl' for='date' className='required active'>
                    Select Send Date<span className='star'>&nbsp;*</span>
                  </label>
                  <DatePicker
                    selected={this.state.date}
                    onChange={(date) => this.setState({ date: date })}
                    onBlur={handleOnBlur}
                    minDate={new Date()}
                    dateFormat='yyyy-MM-dd'
                  />
                </div>
                <div className='input-field col-md-6'>
                  <label id='country-lbl' className='requir active'>
                    Receiver's Country<span className='star'>&#160;*</span>
                  </label>
                  <select
                    id='country'
                    name='country'
                    onChange={this.onCountryChange}
                  >
                    <option selected>Receiver's Country</option>
                    <CountryOptions />
                  </select>
                  {this.validator.message(
                    'country',
                    this.state.country,
                    'required'
                  )}
                </div>
                <div className='input-field col-md-3'>
                  <label id='countryCode-lbl' className='requir active'>
                    Receiver's Dial Code(+)<span className='star'>&#160;*</span>
                  </label>
                  <select
                    id='countryCode'
                    name='countryCode'
                    value={this.state.countryCode}
                    onChange={this.onChange}
                  >
                    <option>Receiver's Dial Code(+)</option>
                    <PhoneCodeOptions />
                  </select>
                  {this.validator.message(
                    'countryCode',
                    this.state.countryCode,
                    'required'
                  )}
                </div>
                <div className='col-md-3 input-field '>
                  <label id='phone-lbl' for='phone' className=' required'>
                    Receiver's Phone Number<span className='star'>&#160;*</span>
                  </label>
                  <input
                    type='number'
                    name='phone'
                    id='phone'
                    value={this.state.phone}
                    onChange={this.onChange}
                  />
                  {this.validator.message(
                    'phone',
                    this.state.phone,
                    'required'
                  )}
                </div>
                <div className='col-md-6 input-field '>
                  <label
                    id='senderEmail-lbl'
                    for='senderEmail'
                    className='required active'
                  >
                    Sender Email<span className='star'>&#160;*</span>
                  </label>
                  <input
                    type='email'
                    name='senderEmail'
                    id='senderEmail'
                    value={this.state.senderEmail}
                    readOnly={true}
                  />
                  {this.validator.message(
                    'senderEmail',
                    this.state.senderEmail,
                    'required|email'
                  )}
                </div>
                {this.state.course && this.state.course.course_type === 1 ? (
                  <div className='input-field col-md-6'>
                    <label
                      id='price-lbl'
                      htmlFor='price'
                      className='active required'
                    >
                      Price<span className='star'>&#160;*</span>
                    </label>
                    <input
                      type='text'
                      name='price'
                      id='price'
                      value={this.state.coursePrice}
                      readOnly
                    />
                  </div>
                ) : (
                  ''
                )}
                {this.state.course && this.state.course.course_type === 2 ? (
                  <div className='input-field col-md-6'>
                    <label
                      id='donationAmount-lbl'
                      htmlFor='donationAmount'
                      className=' required'
                    >
                      Donation Amount (Min. ${this.state.coursePrice})
                      <span className='star'>&#160;*</span>
                    </label>
                    <input
                      type='number'
                      min='1'
                      name='donationAmount'
                      id='donationAmount'
                      value={this.state.donationAmount}
                      onChange={this.onDonationChange}
                    />
                    {this.validator.message(
                      'donationAmount',
                      this.state.donationAmount,
                      'required|integer'
                    )}
                  </div>
                ) : (
                  ''
                )}

                <div className='col-md-6 input-field '>
                  <label id='message-lbl' for='message' className='required'>
                    Gift Message<span className='star'>&#160;*</span>
                  </label>
                  <textarea
                    type='text'
                    name='message'
                    rows='3'
                    id='message'
                    value={this.state.message}
                    onChange={this.onChange}
                  ></textarea>
                  {this.validator.message(
                    'message',
                    this.state.message,
                    'required'
                  )}
                </div>
                <div className='control-group col-md-6'>
                  <div className='row'>
                    <div className='col-sm-12 position-relative'>
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
                <div className='col-md-12'>
                  <h4 className='mt-3'>Payment Information</h4>
                  {clientId ? (
                    <DropIn
                      options={{
                        authorization: clientId,
                        paymentOptionPriority: ['card', 'paypal', 'googlePay'],
                        paypal: { flow: 'vault' },
                        googlePay: { flow: 'vault' },
                        googlePay: {
                          environment: 'PRODUCTION',
                          googlePayVersion: 2,
                          merchantId: this.state.gpayMerchantId,

                          transactionInfo: {
                            totalPriceStatus: 'FINAL',
                            totalPrice: '21',
                            currencyCode: 'USD',
                          },
                        },
                      }}
                      onInstance={(instance) => (this.instance = instance)}
                    />
                  ) : (
                    ''
                  )}
                </div>

                <div className=''>
                  <div className=''>
                    <div className='checkbox checkError'>
                      <input
                        id='terms'
                        type='checkbox'
                        name='terms'
                        value='terms'
                        onChange={this.onCheckboxChange}
                        checked={this.state.terms}
                      />
                      <label htmlFor='terms'>
                        I have accept the{' '}
                        <Link href='/user/terms-of-services'>
                          <a target='_blank'>Terms and Conditions</a>
                        </Link>
                      </label>
                      {this.validator.message(
                        'terms',
                        this.state.terms,
                        'required'
                      )}
                    </div>
                    <div className='checkbox'>
                      <input
                        id='newslatter'
                        type='checkbox'
                        name='newslatter'
                        value='newslatter'
                        onChange={this.onCheckboxChange}
                        checked={this.state.newslatter}
                      />
                      <label htmlFor='newslatter'>
                        Yes, I would like to receive weekly updates from Sattva
                        Connect (newsletter)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='control-group'>
                <div className='security-check'>
                  <div className='input-group-prepend user-reg-security'>
                    <ReCAPTCHA
                      ref={this.recaptchaRef}
                      sitekey='6LeO0r0ZAAAAAN2hNPGgn_eHl3Ki_Oxn0JaPtujV'
                      onChange={this.onResolved}
                    />
                  </div>
                </div>
              </div>
              <div className='input-field text-right'>
                <button type='submit' className='btn btn-lg ml-2'>
                  Gift Now
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}
export default GiftCourseForm;
