import React, { Component } from 'react';
import axios from 'axios';
import Router from 'next/router';
import Constants from '../../constants';
import DropIn from 'braintree-web-drop-in-react';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  apiRoute,
  getApiHeader,
  getLocalStorageAuth,
  getGpayMerchantId,
} from '../../utils/helpers';
import SimpleReactValidator from 'simple-react-validator';
import CountryOptions from '../CountryOptions';
import CourseServices from '../../services/courseServices';
import PhoneCodeOptions from '../PhoneCodeOptions';

const max = 9;
const rand1 = Math.floor(Math.random(1) * Math.floor(max));
const rand2 = Math.floor(Math.random(1) * Math.floor(max));
const initialState = {
  username: '',
  password: 'DummyPassword',
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  zip: '',
  country: '',
  countryCode: '',
  phone: '',
  email: '',
  confirmEmail: '',
  planId: '',
  planName: '',
  planPrice: '',
  labelClass: '',
  couponCode: '',
  other: '',
  freeTrialDays: 14,
  emailAvailability: true,
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
  confirmEmailError: false,
  showOtherField: false,
  couponApplied: false,
  couponReadOnly: false,
  appiedCouponCode: '',
  couponApplyError: false,
  clientId: false,
  loading: false,
  gpayMerchantId: getGpayMerchantId(),
};

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    this.recaptchaRef = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCountryChange = this.onCountryChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.state = initialState;
  }
  componentDidMount() {
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

    const auth = getLocalStorageAuth();
    if (auth) {
      this.setState({
        email: auth.userDetails.email,
        firstName: auth.userDetails.first_name,
        lastName: auth.userDetails.last_name,
        country: auth.userDetails.country,
        countryCode: auth.userDetails.country_code,
        zip: auth.userDetails.zip_code,
        address: auth.userDetails.address1,
        phone: auth.userDetails.phone,
        username: auth.userDetails.username,
        city: auth.userDetails.city,
        address1: auth.userDetails.address1,
        userId: auth.userDetails.id,
      });
    }
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
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      zip: this.state.zip,
      country: this.state.country,
      countryCode: this.state.countryCode,
      phone: this.state.phone,
      email: this.state.email,
      planId: this.props.planId,
      plan: this.state.planId,
      planName: this.state.planName,
      planPrice: this.state.planPrice,
      couponCode: this.state.appiedCouponCode,
      newslatter: this.state.newslatter,
      userId: this.state.userId,
      recaptcha: recaptcha,
      paymentType: type,
      paymentNonce: nonce,
      paymentDetails: details,
      event: '1',
    };

    CourseServices.userRegistrationFromUserdashboard(userDetail)
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
        this.setState({ loading: false });
        Router.push(Constants.SITE_URL + '/user/user-registration-success');
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
            <h4>Account Information</h4>

            <div className='customer-support p-0'>
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
              <div className='control-group'>
                <label
                  id='firstName-lbl'
                  for='firstName'
                  className='control-label'
                >
                  First Name<span className='required'>&#160;*</span>
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
              <div className='control-group'>
                <label
                  id='lastName-lbl'
                  for='lastName'
                  className='control-label'
                >
                  Last Name<span className='required'>&#160;*</span>
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
              <div className='control-group'>
                <label id='email-lbl' for='email' className='control-label'>
                  Email<span className='required'>&#160;*</span>
                </label>
                <input
                  type='text'
                  name='email'
                  id='email'
                  value={this.state.email}
                  readOnly={true}
                />
                {this.validator.message(
                  'email',
                  this.state.email,
                  'required|email'
                )}
              </div>

              <div className='control-group'>
                <label
                  id='username-lbl'
                  for='username'
                  className='control-label'
                >
                  Username<span className='required'>&#160;*</span>
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

              <div className='control-group'>
                <label
                  id='address1-lbl'
                  for='address1'
                  className='control-label'
                >
                  Address1<span className='required'>&#160;*</span>
                </label>
                <input
                  type='text'
                  name='address1'
                  id='address1'
                  value={this.state.address1}
                  onChange={this.onChange}
                />
                {this.validator.message(
                  'address1',
                  this.state.address1,
                  'required'
                )}
              </div>
              <div className='control-group'>
                <label
                  id='address2-lbl'
                  for='address2'
                  className='control-label'
                >
                  Address2
                </label>
                <input
                  type='text'
                  name='address2'
                  id='address2'
                  value={this.state.address2}
                  onChange={this.onChange}
                />
              </div>

              <div className='control-group'>
                <label id='city-lbl' for='city' className='control-label'>
                  City<span className='required'>&#160;*</span>
                </label>
                <input
                  type='text'
                  name='city'
                  id='city'
                  value={this.state.city}
                  onChange={this.onChange}
                />
                {this.validator.message('city', this.state.city, 'required')}
              </div>
              <div className='control-group'>
                <label id='zip-lbl' for='zip' className='control-label'>
                  Zip Code<span className='required'>&#160;*</span>
                </label>
                <input
                  type='text'
                  name='zip'
                  id='zip'
                  value={this.state.zip}
                  onChange={this.onChange}
                />
                {this.validator.message('zip', this.state.zip, 'required')}
              </div>
              <div className='control-group'>
                <label for='country' className='control-label'>
                  Country<span className='required'>&#160;*</span>
                </label>
                <select
                  id='country'
                  name='country'
                  onChange={this.onCountryChange}
                >
                  <option selected>Select Country</option>
                  <CountryOptions country={this.state.country} />
                </select>
                {this.validator.message(
                  'country',
                  this.state.country,
                  'required'
                )}
              </div>
              <div className='control-group'>
                <label for='country' className='control-label'>
                  Dial Code(+)<span className='required'>&#160;*</span>
                </label>
                <select
                  id='countryCode'
                  name='countryCode'
                  value={this.state.countryCode}
                  onChange={this.onChange}
                >
                  <option> Dial Code(+)</option>
                  <PhoneCodeOptions countryCode={this.state.countryCode} />
                </select>
                {this.validator.message(
                  'countryCode',
                  this.state.countryCode,
                  'required'
                )}
              </div>
              <div className='control-group'>
                <label id='phone-lbl' for='phone' className='control-label'>
                  Phone<span className='required'>&#160;*</span>
                </label>
                <input
                  type='text'
                  name='phone'
                  id='phone'
                  value={this.state.phone}
                  onChange={this.onChange}
                />
                {this.validator.message(
                  'phone',
                  this.state.phone,
                  'required|max:16'
                )}
              </div>

              <div className='control-group'>
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
              <div className='control-group'>
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
              <div className='control-group'>
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
              <h4 className='mt-3'>Payment Information</h4>
              <p className='mb-3 freeTrailMsg'>
                Your credit card will not be charged now. The card will be
                charged ${this.state.planPrice} after your{' '}
                {this.state.freeTrialDays}-days free trial to continue your
                membership, unless you cancel before the trial ends from your
                account settings. Please also notice that your subscription is
                automatically renewed after every billing cycle.
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

export default RegistrationForm;
