import React, { Component } from 'react';
import axios from 'axios';
import Router from 'next/router';
import Constants from '../../constants';
// import DropIn from 'braintree-web-drop-in-react';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  apiRoute,
  getApiHeader,
  getGpayMerchantId,
  getLocalStorage,
} from '../../utils/helpers';
import SimpleReactValidator from 'simple-react-validator';
import CountryOptions from '../CountryOptions';
import CourseServices from '../../services/courseServices';
import PhoneCodeOptions from '../PhoneCodeOptions';
// import FacebookLogin from 'react-facebook-login';

import dynamic from 'next/dynamic';
const DropIn = dynamic(import('braintree-web-drop-in-react'), { ssr: false });

const max = 9;
const rand1 = Math.floor(Math.random(1) * Math.floor(max));
const rand2 = Math.floor(Math.random(1) * Math.floor(max));
const initialState = {
  username: '',
  password: '',
  confirmPassword: '',
  senderFirstName: '',
  senderLastName: '',
  senderAddress1: '',
  senderAddress2: '',
  senderCity: '',
  senderZip: '',
  senderCountry: '',
  senderCountryCode: '',
  senderPhone: '',
  senderEmail: '',
  senderConfirmEmail: '',
  receiverFirstName: '',
  receiverLastName: '',
  receiverEmail: '',
  planId: '',
  planName: '',
  planPrice: '',
  labelClass: '',
  couponCode: '',
  other: '',
  freeTrialDays: 14,
  // senderEmailAvailability: true,
  receiverEmailAvailability: true,
  usenameAvailability: true,
  successMessage: false,
  confirmPasswordError: false,
  pageLoading: true,
  errors: [],
  error: false,
  errorMsg: '',
  security: true,
  recaptcha: false,
  terms: '',
  newslatter: '',
  SenderConfirmEmailError: false,
  showOtherField: false,
  couponApplied: false,
  couponReadOnly: false,
  appiedCouponCode: '',
  couponApplyError: false,
  clientId: false,
  loading: false,
  gpayMerchantId: getGpayMerchantId(),
  readonly: '',
  affiliate_id: ' ',
  fb: true,
  fb_id: '',
  fbIdAvailability: true,
  notification: '',
};

class GiftSubscriptionRegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    this.recaptchaRef = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCountryChange = this.onCountryChange.bind(this);
    this.onSenderEmailChange = this.onSenderEmailChange.bind(this);
    this.onReceiverEmailChange = this.onReceiverEmailChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    this.state = initialState;

    this.fbLogindata = this.fbLogindata.bind(this);
  }

  componentDidMount() {
    const script = document.createElement('script');

    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;

    document.body.appendChild(script);

    console.log(this.props.affiliateId);
    CourseServices.getClintId().then((res) => {
      this.setState({
        clientId: res.data,
      });
    });
    const requestOptions = {
      headers: getApiHeader(),
    };
    axios
      .get(apiRoute('get-plan-details/' + this.props.planId), requestOptions)
      .then((res) => {
        this.setState({
          planId: res.data.braintree_id,
          planName: res.data.name,
          planPrice: res.data.price,
        });
      });
    const affiliate_id = localStorage.getItem('uniqueAffiliate_id');
    if (affiliate_id) {
      this.setState({ affiliate_id: affiliate_id });
    }
    //facebook javascript

    window.fbAsyncInit = function () {
      FB.init({
        appId: Constants.FB_LIVE_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v10.0',
        localStorage: false,
      });
    };
  }

  fbLogindata = () => {
    window.FB.login(() => {
      FB.api('/me', { fields: 'last_name,first_name,email' }, (response) => {
        console.log(response);
        this.setState({ firstName: response.last_name });
        CourseServices.checkFbId(response.id)
          .then((res) => {
            console.log(res);
            if (res.data.status == true) {
              console.log(res.data.status);
              this.setState({ fbIdAvailability: true });
            } else {
              console.log(res.data.status);
              this.setState({ fbIdAvailability: false });
            }
          })
          .catch((error) => {
            this.setState({ fbIdAvailability: false });
          });

        CourseServices.checkUserEmail(response.email)
          .then((res) => {
            if (res.data.status == true) {
              this.setState({ emailAvailability: true });
            } else {
              console.log(res.data.status);
              this.setState({ emailAvailability: false });
            }
          })
          .catch((error) => {
            this.setState({ emailAvailability: false });
          });
        this.setState({ firstName: response.first_name });
        this.setState({ lastName: response.last_name });
        this.setState({ email: response.email });
        this.setState({ confirmEmail: response.email });
        this.setState({ fb_id: response.id });
      });
    });
  };

  onCountryChange(e) {
    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index];
    var phoneCode = optionElement.getAttribute('phoneCode');
    this.setState({ senderCountry: e.target.value });
    this.setState({ senderCountryCode: phoneCode });
  }

  onCheckboxChange = (e) => {
    if (e.target.checked) {
      this.setState({ [e.target.name]: 1 });
    } else {
      this.setState({ [e.target.name]: '' });
    }
  };

  onCheckboxChangeNotification = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
    if (!this.state.notification) {


      console.log(e.target.value);
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onRecaptchaChange = (e) => {
    this.setState({ securityVal: e.target.value });
    let currentVal = Number(e.target.value);
    const currectVal = this.state.currectSecurity;
    if (currentVal !== currectVal) {
      this.setState({ security: false });
    } else {
      this.setState({ security: true });
    }
  };

  onPasswordChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value !== '' && this.state.confirmPassword !== '') {
      if (this.state.confirmPassword !== e.target.value) {
        this.setState({ confirmPasswordError: true });
        return false;
      } else {
        this.setState({ confirmPasswordError: false });
      }
    } else {
      this.setState({ confirmPasswordError: false });
    }
  }

  onConfirmPasswordChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (this.state.password !== '' && e.target.value !== '') {
      if (this.state.password !== e.target.value) {
        this.setState({ confirmPasswordError: true });
        return false;
      } else {
        this.setState({ confirmPasswordError: false });
      }
    } else {
      this.setState({ confirmPasswordError: false });
    }
  }

  onSenderEmailChange(e) {
    const senderEmail = e.target.value;
    this.setState({ senderEmail: senderEmail });
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(senderEmail)) {
      // CourseServices.checkUserEmail(senderEmail)
      //   .then((res) => {
      //     if (res.data.status == true) {
      //       this.setState({ senderEmailAvailability: true });
      //     } else {
      //       this.setState({ senderEmailAvailability: false });
      //     }
      //   })
      //   .catch((error) => {
      //     this.setState({ senderEmailAvailability: false });
      //   });
      return true;
    } else {
      return false;
    }
    if (this.state.senderConfirmEmail !== '' && e.target.value !== '') {
      if (this.state.senderConfirmEmail !== e.target.value) {
        this.setState({ senderConfirmEmailError: true });
        return false;
      } else {
        this.setState({ senderConfirmEmailError: false });
      }
    } else {
      this.setState({ senderConfirmEmailError: false });
    }
  }

  onReceiverEmailChange(e) {
    const receiverEmail = e.target.value;
    this.setState({ receiverEmail: receiverEmail });
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(receiverEmail)) {
      CourseServices.checkUserEmail(receiverEmail)
        .then((res) => {
          if (res.data.status == true) {
            this.setState({ receiverEmailAvailability: true });
          } else {
            this.setState({ receiverEmailAvailability: false });
          }
        })
        .catch((error) => {
          this.setState({ receiverEmailAvailability: false });
        });
    } else {
      return false;
    }
  }

  onConfirmEmailChange = (e) => {
    const senderConfirmEmail = e.target.value;
    this.setState({ senderConfirmEmail: senderConfirmEmail });
    if (this.state.senderEmail !== '' && e.target.value !== '') {
      if (this.state.senderEmail !== e.target.value) {
        this.setState({ senderConfirmEmailError: true });
        return false;
      } else {
        this.setState({ senderConfirmEmailError: false });
      }
    } else {
      this.setState({ senderConfirmEmailError: false });
    }
  };

  onUsernameChange(e) {
    const username = e.target.value;
    this.setState({ username: username });
    CourseServices.checkUserUsername(username)
      .then((res) => {
        if (res.data.status == true) {
          this.setState({ usenameAvailability: true });
        } else {
          this.setState({ usenameAvailability: false });
        }
      })
      .catch((error) => {
        this.setState({ usenameAvailability: false });
      });
  }

  async onSubmit(e) {
    e.preventDefault();

    if (!this.validator.allValid()) {
      this.validator.showMessages();
      this.forceUpdate();
      window.scrollTo(0, 0);
      return false;
    }
    if (this.state.password !== this.state.confirmPassword) {
      window.scrollTo(0, 0);
      this.setState({ confirmPasswordError: true });
      return false;
    } else {
      this.setState({ confirmPasswordError: false });
    }
    if (this.state.senderEmail !== this.state.senderConfirmEmail) {
      window.scrollTo(0, 0);
      this.setState({ senderConfirmEmailError: true });
      return false;
    } else {
      this.setState({ senderConfirmEmailError: false });
    }

    // if (!this.state.senderEmailAvailability) {
    //   window.scrollTo(0, 0);
    //   return false;
    // }
    if (!this.state.usenameAvailability) {
      window.scrollTo(0, 0);
      return false;
    }
    if (this.state.couponCode !== '' && this.state.couponApplied == false) {
      this.setState({ couponApplyError: true });
      window.scrollTo(0, 0);
      return false;
    }
    const recaptcha = await this.recaptchaRef.current.getValue();
    if (!recaptcha) {
      window.scrollTo(0, 0);
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
    this.setState({ loading: true });
    const { nonce, type, details } = await this.instance.requestPaymentMethod();
    const userDetail = {
      username: this.state.username,
      password: this.state.password,
      senderFirstName: this.state.senderFirstName,
      senderLastName: this.state.senderLastName,
      senderAddress1: this.state.senderAddress1,
      senderAddress2: this.state.senderAddress2,
      senderCity: this.state.senderCity,
      senderZip: this.state.senderZip,
      senderCountry: this.state.senderCountry,
      senderCountryCode: this.state.senderCountryCode,
      senderPhone: this.state.senderPhone,
      senderEmail: this.state.senderEmail,
      receiverFirstName: this.state.receiverFirstName,
      receiverLastName: this.state.receiverLastName,
      receiverEmail: this.state.receiverEmail,
      planId: this.props.planId,
      affiliateId: this.props.affiliateId,
      plan: this.state.planId,
      planName: this.state.planName,
      planPrice: this.state.planPrice,
      couponCode: this.state.appiedCouponCode,
      newslatter: this.state.newslatter,
      recaptcha: recaptcha,
      paymentType: type,
      paymentNonce: nonce,
      paymentDetails: details,
      event: '1',
      affiliate_id: this.state.affiliate_id,
      fb_id: this.state.fb_id,
    };
    // console.log(userDetail);
    CourseServices.userGiftsubscriptionRegistration(userDetail)
      .then((res) => {
        window.scrollTo(0, 0);
        const userEmailDetails = {
          receiverFirstName: this.state.receiverFirstName,
          receiverLastName: this.state.receiverLastName,
          receiverEmail: this.state.receiverEmail,
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
        //Thankyou Redirect page
        this.setState({ loading: false });
        Router.push(
          Constants.SITE_URL +
          '/user-registration-success/' +
          this.state.planPrice
        );
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
  howYouKnowChange = (e) => {
    const text = e.target.value;
    if (text == 'Other') {
      this.setState({ showOtherField: true });
    } else {
      this.setState({ showOtherField: false, other: '' });
    }
  };

  applyCouponCode = () => {
    this.setState({ loading: true });
    const details = {
      plan: this.props.planId,
      couponCode: this.state.couponCode,
      event: '1',
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
            error: false,
            errors: [],
          });
        } else {
          this.setState({
            couponApplied: true,
            planPrice: res.data.price,
            appiedCouponCode: this.state.couponCode,
            couponReadOnly: true,
            error: false,
            errors: [],
          });
        }
        this.setState({ loading: false });
      })
      .catch((error) => {
        window.scrollTo(0, 0);
        var errorsArray = [];
        errorsArray.push({ message: 'Invalid coupon code.' });
        this.setState({
          couponApplied: false,
          error: true,
          errors: errorsArray,
          couponReadOnly: false,
          couponCode: '',
        });
        this.setState({ loading: false });
      });
  };

  onResolved = () => {
    this.setState({ recaptcha: this.recaptcha.getResponse() });
    console.log(this.recaptcha.getResponse());
  };
  fbEvent = () => {
    this.setState({ fb: false });
  };
  // responseFacebook = (response) => {
  //   console.log(response);
  //   console.log(response.id);
  //   CourseServices.checkFbId(response.id)
  //     .then((res) => {
  //       console.log(res);
  //       if (res.data.status == true) {
  //         console.log(res.data.status);
  //         this.setState({ fbIdAvailability: true });
  //       } else {
  //         console.log(res.data.status);
  //         this.setState({ fbIdAvailability: false });
  //       }
  //     })
  //     .catch((error) => {
  //       this.setState({ fbIdAvailability: false });
  //     });

  //   CourseServices.checkUserEmail(response.email)
  //     .then((res) => {
  //       if (res.data.status == true) {
  //         console.log(res.data.status);
  //         this.setState({ emailAvailability: true });
  //       } else {
  //         console.log(res.data.status);
  //         this.setState({ emailAvailability: false });
  //       }
  //     })
  //     .catch((error) => {
  //       this.setState({ emailAvailability: false });
  //     });

  //   this.setState({ firstName: response.first_name });
  //   this.setState({ lastName: response.last_name });
  //   this.setState({ email: response.email });
  //   this.setState({ confirmEmail: response.email });
  //   this.setState({ fb_id: response.id });
  // };
  render() {
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
        <div className='card subscription-card'>
          <form
            onSubmit={this.onSubmit}
            id='giftCourseForm'
            autocomplete='off'
            className='form form-horizontal'
          >
            <div className='reg-head-div'>
              <div className='signUp-title-div'>
                <h4 className='revamp-subtitle'>Account Information</h4>
                <p className='revamp-para-small'>
                  You can sign up with your email address
                </p>
              </div>
              {/* <div className='mb-3'>
                <p>
                  {' '}
                  <a
                    className='fb-button'
                    onClick={this.fbLogindata}
                    type='button'
                    style={{ fontWeight: '500' }}
                  >
                    <img
                      height='36px'
                      width='36px'
                      className='facebook-image mr-3'
                      src={Constants.SITE_URL + '/images/signup-fb.svg'}
                    />

                    Signup with facebook
                  </a>
                </p>
              </div> */}
            </div>
            <div className='customer-support p-0'>
            {this.state.errors.map((item, index) => {
                  return (
                    <div className='col-md-12 control-group'>    
                      <div className='alert alert-danger alert-dismissible fade show' role='alert' >
                        <p>{item.message}</p>
                      </div>
                    </div>
                  );
                })}

                {this.state.confirmPasswordError == true && (
                  <div
                    className='alert alert-danger alert-dismissible fade show'
                    role='alert'
                  >
                    <p>Password does not match.</p>
                  </div>
                )}
                {this.state.senderConfirmEmailError == true && (
                  <div
                    className='alert alert-danger alert-dismissible fade show'
                    role='alert'
                  >
                    <p>Email does not match.</p>
                  </div>
                )}
                {/* {this.state.senderEmailAvailability == false && (
                  <div
                    className='alert alert-danger alert-dismissible fade show'
                    role='alert'>
                    <p>Sender Email is already in used.</p>
                  </div>
                )} */}

                {this.state.receiverEmailAvailability == false && (
                  <div
                    className='alert alert-danger alert-dismissible fade show'
                    role='alert'>
                    <p>Receiver Email is already in used.</p>
                  </div>
                )}

                {this.state.fbIdAvailability == false && (
                  <div
                    className='alert alert-danger alert-dismissible fade show'
                    role='alert'
                  >
                    <p>This facebook account already in used.</p>
                  </div>
                )}

                {this.state.usenameAvailability == false && (
                  <div
                    className='alert alert-danger alert-dismissible fade show'
                    role='alert'
                  >
                    <p>Username is already in used.</p>
                  </div>
                )}
                {this.state.couponApplyError == true && (
                  <div
                    className='alert alert-danger alert-dismissible fade show'
                    role='alert'
                  >
                    <p>Please apply coupon before submitting the form.</p>
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
              <div className="row detail-form">
                <div className='col-md-6 control-group'>
                  <label
                    id='senderFirstName-lbl'
                    for='senderFirstName'
                    className='control-label'
                  >
                    Sender First Name<span className='required'>&#160;*</span>
                  </label>
                  <input
                    type='text'
                    name='senderFirstName'
                    id='senderFirstName'
                    value={this.state.senderFirstName}
                    onChange={this.onChange}
                  />
                  {this.validator.message(
                    'senderFirstName',
                    this.state.senderFirstName,
                    'required|max:50'
                  )}
                </div>
                <div className='col-md-6 control-group'>
                  <label
                    id='senderLastName-lbl'
                    for='senderLastName'
                    className='control-label'
                  >
                    Sender Last Name<span className='required'>&#160;*</span>
                  </label>
                  <input
                    type='text'
                    name='senderLastName'
                    id='senderLastName'
                    value={this.state.senderLastName}
                    onChange={this.onChange}
                  />
                  {this.validator.message(
                    'senderLastName',
                    this.state.senderLastName,
                    'required|max:50'
                  )}
                </div>
                <div className='col-md-6 control-group'>
                  <label id='senderEmail-lbl' for='senderEmail' className='control-label'>
                    Sender Email<span className='required'>&#160;*</span>
                  </label>
                  <input
                    type='text'
                    name='senderEmail'
                    id='senderEmail'
                    value={this.state.senderEmail}
                    onChange={this.onSenderEmailChange}
                  />
                  {this.validator.message(
                    'senderEmail',
                    this.state.senderEmail,
                    'required|email'
                  )}
                </div>
                <div className='col-md-6 control-group'>
                  <label
                    id='senderCofirmEmail-lbl'
                    for='senderCofirmEmail'
                    className='control-label'
                  >
                    Retype Sender Email<span className='required'>&#160;*</span>
                  </label>
                  <input
                    type='text'
                    name='senderCofirmEmail'
                    id='senderCofirmEmail'
                    value={this.state.senderConfirmEmail}
                    onChange={this.onConfirmEmailChange}
                  />
                  {this.validator.message(
                    'senderCofirmEmail',
                    this.state.senderConfirmEmail,
                    'required|email'
                  )}
                </div>
                <div className='col-md-6 control-group'>
                  <label
                    id='username-lbl'
                    for='username'
                    className='control-label'
                  >
                    Login Username<span className='required'>&#160;*</span>
                  </label>
                  <input
                    type='text'
                    name='username'
                    id='username'
                    autoComplete='new-username'
                    value={this.state.username}
                    onChange={this.onUsernameChange}
                  />
                  {this.validator.message(
                    'username',
                    this.state.username,
                    'required'
                  )}
                </div>
                <div className='col-md-6 control-group'>
                  <label
                    id='password-lbl'
                    for='password'
                    className='control-label'
                  >
                    Login Password<span className='required'>&#160;*</span>
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    autoComplete='new-password'
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                  />
                  {this.validator.message(
                    'password',
                    this.state.password,
                    'required|min:6'
                  )}
                </div>
                <div className='col-md-6 control-group'>
                  <label
                    id='confirmPassword-lbl'
                    for='confirmPassword'
                    className='control-label'
                  >
                    Retype-password<span className='required'>&#160;*</span>
                  </label>
                  <input
                    type='password'
                    name='confirmPassword'
                    id='confirmPassword'
                    value={this.state.confirmPassword}
                    onChange={this.onConfirmPasswordChange}
                  />
                  {this.validator.message(
                    'confirm password',
                    this.state.confirmPassword,
                    'required|min:6'
                  )}
                </div>
                <div className='col-md-6 control-group'>
                  <label
                    id='senderAddress1-lbl'
                    for='senderAddress1'
                    className='control-label'
                  >
                    Sender Address1<span className='required'>&#160;*</span>
                  </label>
                  <input
                    type='text'
                    name='senderAddress1'
                    id='senderAddress1'
                    value={this.state.senderAddress1}
                    onChange={this.onChange}
                  />
                  {this.validator.message(
                    'senderAddress1',
                    this.state.senderAddress1,
                    'required'
                  )}
                </div>
                <div className='col-md-6 control-group'>
                  <label
                    id='senderAddress2-lbl'
                    for='senderAddress2'
                    className='control-label'
                  >
                    Sender Address2
                  </label>
                  <input
                    type='text'
                    name='senderAddress2'
                    id='senderAddress2'
                    value={this.state.senderAddress2}
                    onChange={this.onChange}
                  />
                </div>
                <div className='col-md-6 control-group'>
                  <label id='senderCity-lbl' for='senderCity' className='control-label'>
                    Sender City<span className='required'>&#160;*</span>
                  </label>
                  <input
                    type='text'
                    name='senderCity'
                    id='senderCity'
                    value={this.state.senderCity}
                    onChange={this.onChange}
                  />
                  {this.validator.message('senderCity', this.state.senderCity, 'required')}
                </div>
                <div className='col-md-6 control-group'>
                  <label id='senderZip-lbl' for='senderZip' className='control-label'>
                    Sender Zip Code<span className='required'>&#160;*</span>
                  </label>
                  <input
                    type='text'
                    name='senderZip'
                    id='senderZip'
                    value={this.state.senderZip}
                    onChange={this.onChange}
                  />
                  {this.validator.message('senderZip', this.state.senderZip, 'required')}
                </div>
                <div className='col-md-6 control-group'>
                  <label for='country' className='control-label'>
                    Sender Country<span className='required'>&#160;*</span>
                  </label>
                  <select
                    id='senderCountry'
                    name='senderCountry'
                    onChange={this.onCountryChange}
                  >
                    <option selected>Select Country</option>
                    <CountryOptions />
                  </select>
                  {this.validator.message(
                    'senderCountry',
                    this.state.senderCountry,
                    'required'
                  )}
                </div>
                <div className='col-md-6 control-group'>
                  <label for='senderCountry' className='control-label'>
                    Sender Dial Code(+)<span className='required'>&#160;*</span>
                  </label>
                  <select
                    id='senderCountryCode'
                    name='senderCountryCode'
                    value={this.state.senderCountryCode}
                    onChange={this.onChange}
                  >
                    <option> Dial Code(+)</option>
                    <PhoneCodeOptions />
                  </select>
                  {this.validator.message(
                    'senderCountryCode',
                    this.state.senderCountryCode,
                    'required'
                  )}
                </div>
                <div className='col-md-6 control-group'>
                  <label id='senderPhone-lbl' for='senderPhone' className='control-label'>
                    Sender Phone<span className='required'>&#160;*</span>
                  </label>
                  <input
                    type='text'
                    name='senderPhone'
                    id='senderPhone'
                    value={this.state.senderPhone}
                    onChange={this.onChange}
                  />
                  {this.validator.message(
                    'senderPhone',
                    this.state.senderPhone,
                    'required|max:16'
                  )}
                </div>
                <div className='col-md-6 control-group'>
                  <label id='receiverFirstName-lbl' for='receiverFirstName' className='control-label'>
                    Receiver First Name<span className='required'>&#160;*</span>
                  </label>
                  <input
                    type='text'
                    name='receiverFirstName'
                    id='receiverFirstName'
                    value={this.state.receiverFirstName}
                    onChange={this.onChange}
                  />
                  {this.validator.message(
                    'receiverFirstName',
                    this.state.receiverFirstName,
                    'required|max:50'
                  )}
                </div>
                <div className='col-md-6 control-group'>
                  <label
                    id='receiverLastName-lbl'
                    for='receiverLastName'
                    className='control-label'
                  >
                    Receiver Last Name<span className='required'>&#160;*</span>
                  </label>
                  <input
                    type='text'
                    name='receiverLastName'
                    id='receiverLastName'
                    value={this.state.receiverLastName}
                    onChange={this.onChange}
                  />
                  {this.validator.message(
                    'receiverLastName',
                    this.state.receiverLastName,
                    'required|max:50'
                  )}
                </div>
                <div className='col-md-6 control-group'>
                  <label id='receiverEmail-lbl' for='receiverEmail' className='control-label'>
                    Receiver Email<span className='required'>&#160;*</span>
                  </label>
                  <input
                    type='text'
                    name='receiverEmail'
                    id='receiverEmail'
                    value={this.state.receiverEmail}
                    onChange={this.onReceiverEmailChange}
                  />
                  {this.validator.message(
                    'receiverEmail',
                    this.state.receiverEmail,
                    'required|email'
                  )}
                </div>
                <div className='col-md-6 control-group'
                  id='field_osm_osmosmhowdidyougettoknow_us'
                >
                  <div className='control-label'>
                    <label
                      id='osm_osmosmhowdidyougettoknow_us-lbl'
                      for='osm_osmosmhowdidyougettoknow_us'
                      class=''
                    >
                      How did you get to know us?
                      <span className='required'>&nbsp;*</span>
                    </label>
                  </div>
                  <div className='controls'>
                    <select
                      id='osm_osmosmhowdidyougettoknow_us'
                      name='howknowUs'
                      onChange={this.howYouKnowChange}
                    >
                      <option value='Sattva Yoga Academy'>
                        Sattva Yoga Academy
                      </option>
                      <option value='Sattva Collection'>Sattva Collection</option>
                      <option value='Google'>Google</option>
                      <option value='Facebook'>Facebook</option>
                      <option value='Instagram'>Instagram</option>
                      <option value='Family and friends'>
                        Family and friends
                      </option>
                      <option value='SC member'>SC member</option>
                      <option value='Other'>Other</option>
                    </select>
                  </div>
                </div>
                {this.state.showOtherField && (
                  <div className='col-md-6 control-group'>
                    <label for='other' className='control-label'>
                      Other
                    </label>
                    <textarea
                      name='other'
                      value={this.state.other}
                      onChange={this.onChange}
                    ></textarea>
                    {this.validator.message(
                      'other',
                      this.state.other,
                      'required'
                    )}
                  </div>
                )}
                <div className='col-md-6 control-group'>
                  <label id='Plan-lbl' for='Plan' className='control-label'>
                    Plan<span className='required'>&#160;*</span>
                  </label>
                  <input
                    type='text'
                    name='Plan'
                    id='Plan'
                    value={this.state.planName}
                    readOnly
                  />
                </div>
                <div className='col-md-6 control-group'>
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

                <div className='col-md-6 control-group'>
                  <label id='Price-lbl' for='Price' className='control-label'>
                    Price<span className='required'>&#160;*</span>
                  </label>
                  <input
                    type='text'
                    name='Price'
                    id='Price'
                    value={'$' + this.state.planPrice}
                    readOnly
                  />
                </div>
              </div>
              <div className='row detail-form'>
                <div className='col-md-12 control-group'>
                  <h4 className='mt-3 revamp-subtitle'>Payment Information</h4>
                  <p className='mb-3 freeTrailMsg revamp-para-small black-text'>
                    Your credit card will not be charged after your 14-days free trial,
                    unless you cancel before the trial period ends. This can be done from your account settings.
                    Please note that your membership is automatically renewed after every billing cycle.
                  </p>
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
                  <div className='checkbox'>
                    <input
                      id='terms'
                      type='checkbox'
                      name='terms'
                      value='terms'
                      onChange={this.onCheckboxChange}
                      checked={this.state.terms}
                    />
                    <label htmlFor='terms'>
                      I accept the
                      <a href='/terms-of-services' target='_blank'>
                        {' '}
                        Terms and Conditions
                      </a>
                      <span className='required'>&#160;*</span>
                    </label>
                    {this.validator.message('terms', this.state.terms, 'required')}
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
                  {/* <div className='checkbox'>
                <input
                  id='notification'
                  type='checkbox'
                  name='notification'
                  value='Notification'
                  onChange={this.onCheckboxChangeNotification}
                  checked={this.state.notification}
                />
                <label htmlFor='notification'>
                  Yes, I would like to receive notifications about events.
                </label>
              </div> */}
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
                </div>
              </div>
            </div>

            <div className='input-field text-right'>
              <button type='submit' className='btn btn-lg'>
                Start your Sattva journey now
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default GiftSubscriptionRegistrationForm;
