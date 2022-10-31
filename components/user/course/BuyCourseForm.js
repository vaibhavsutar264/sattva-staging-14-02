import React, { Component } from 'react';
import Link from 'next/link';
// import DropIn from 'braintree-web-drop-in-react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import Router from 'next/router';
import Constants from '../../../constants';
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

import dynamic from 'next/dynamic';

const DropIn = dynamic(import('braintree-web-drop-in-react'), {
  ssr: false
});

class BuyCourseForm extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    this.recaptchaRef = React.createRef();
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      address: '',

      
      city: '',
      country: '',
      countryCode: '',
      phone: '',
      zip: '',
      couponCode: '',
      appiedCouponCode: '',
      course: {},
      recaptcha: false,
      affiliateUrlId: '',
      courseId: this.props.courseId,
      emailAvailability: true,
      usenameAvailability: true,
      successMessage: false,
      confirmPasswordError: false,
      terms: '',
      newslatter: '',
      confirmEmailError: false,
      userId: '',
      purchaseId: '',
      security: true,
      errors: [],
      error: false,
      errorMsg: '',
      successMessage: false,
      donationAmount: '',
      redirectToThankyou: false,
      minDonationStatus: true,
      couponApplied: false,
      coursePrice: 0,
      clientId: false,
      loading: false,
      gpayMerchantId: getGpayMerchantId(),
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onCountryChange = this.onCountryChange.bind(this);
  }

  componentDidMount() {
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
        city: auth.userDetails.city,
        phone: auth.userDetails.phone,
        username: auth.userDetails.username,
        userId: auth.userDetails.id,
      });
    }
    CourseServices.getClintId().then((res) => {
      this.setState({
        clientId: res.data,
      });
    });
    this.setState({
      course: this.props.course,
      coursePrice: this.props.course.price,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCountryChange(e) {
    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index];
    var phoneCode = optionElement.getAttribute('phonecode');
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

  onUsernameChange(e) {
    const username = e.target.value;
    this.setState({ username: username });
    if (username !== '') {
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
    } else {
      this.setState({ usenameAvailability: false });
    }
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
    if (!this.state.minDonationStatus) {
      window.scrollTo(500, 500);
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
    const { nonce, type, details } = await this.instance.requestPaymentMethod();
    this.setState({ loading: true });
    const userDetail = {
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      city: this.state.city,
      zip: this.state.zip,
      country: this.state.country,
      countryCode: this.state.countryCode,
      phone: this.state.phone,
      userId: this.state.userId,
      courseId: this.props.courseId,
      newslatter: this.state.newslatter,
      recaptcha: recaptcha,
      paymentType: type,
      paymentNonce: nonce,
      paymentDetails: details,
      donationAmount: this.state.donationAmount,
      couponApplied: this.state.couponApplied,
      appiedCouponCode: this.state.appiedCouponCode,
    };

    CourseServices.buyCourseWithoutRegistration(userDetail)
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
        this.setState({ loading: false });
        if (this.state.newslatter == '1') {
          axios.post(
            apiRoute('add-user-to-mailchimp'),
            userEmailDetails,
            requestOptions
          );
        }

        Router.push(Constants.SITE_URL + '/user/course-buy-success');
        this.setState({ redirectToThankyou: true, loading: false });
      })
      .catch((error) => {
        window.scrollTo(0, 0);
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
        this.setState({ loading: false });
      });
  }

  applyCouponCode = () => {
    console.log("hello");

    const details = {
      courseId: this.props.courseId,
      couponCode: this.state.couponCode,
      type: '1',
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
        console.log("hello");
        this.setState({
          couponApplied: true,
          coursePrice: newPrice,
          appiedCouponCode: this.state.couponCode,
          couponReadOnly: true,
          error: false,
          errors: [],
          loading: false,
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

  onResolved = () => {
    this.setState({ recaptcha: this.recaptcha.getResponse() });
    console.log(this.recaptcha.getResponse());
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
        <div className='card p-4 d-block'>
          <div className='customer-support p-0'>
            <h4>Your Details</h4>

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
            {this.state.confirmPasswordError == true && (
              <div
                className='alert alert-danger alert-dismissible fade show'
                role='alert'
              >
                <p>Password does not match.</p>
              </div>
            )}
            {this.state.minDonationStatus == false && (
              <div
                className='alert alert-danger alert-dismissible fade show'
                role='alert'
              >
                <p>Minimum donation amount is ${this.state.coursePrice}.</p>
              </div>
            )}
            {this.state.confirmEmailError == true && (
              <div
                className='alert alert-danger alert-dismissible fade show'
                role='alert'
              >
                <p>Email does not match.</p>
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
            {this.state.security === false && (
              <div
                className='alert alert-danger alert-dismissible fade show'
                role='alert'
              >
                <p>Recaptcha is required.</p>
              </div>
            )}
            <form
              onSubmit={this.onSubmit}
              id='buyCourseForm'
              autoComplete='off'
              className='form form-horizontal'
            >
              <div className='row detail-form'>
                <div className='input-field col-md-6'>
                  <label
                    id='firstName-lbl'
                    htmlFor='firstName'
                    className=' required active'
                  >
                    First Name<span className='star'>&#160;*</span>
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
                  <label
                    id='lastName-lbl'
                    htmlFor='lastName'
                    className='required active'
                  >
                    Last Name<span className='star'>&#160;*</span>
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
                  <label
                    id='email-lbl'
                    htmlFor='email'
                    className=' required active'
                  >
                    Email ID<span className='star'>&#160;*</span>
                  </label>
                  <input
                    type='text'
                    name='email'
                    id='email'
                    readOnly={true}
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
                  <label
                    id='username-lbl'
                    htmlFor='username'
                    className=' required active'
                  >
                    User Name<span className='star'>&#160;*</span>
                  </label>
                  <input
                    type='text'
                    name='username'
                    id='username'
                    value={this.state.username}
                    onChange={this.onUsernameChange}
                  />
                  {this.validator.message(
                    'username',
                    this.state.username,
                    'required'
                  )}
                </div>

                <div className='input-field col-md-6'>
                  <label id='country-lbl' className='requir active'>
                    Country<span className='star'>&#160;*</span>
                  </label>
                  <select
                    id='country'
                    name='country'
                    onChange={this.onCountryChange}
                  >
                    <option defaultValue>Select Country</option>
                    <CountryOptions country={this.state.country} />
                  </select>
                  {this.validator.message(
                    'country',
                    this.state.country,
                    'required'
                  )}
                </div>
                <div className='input-field col-md-2'>
                  <label id='countryCode-lbl' className='requir active'>
                    Dial Code(+)<span className='star'>&#160;*</span>
                  </label>
                  <select
                    id='countryCode'
                    name='countryCode'
                    value={this.state.countryCode}
                    onChange={this.onChange}
                  >
                    <option>Dial Code(+)</option>
                    <PhoneCodeOptions countryCode={this.state.countryCode} />
                  </select>
                  {this.validator.message(
                    'countryCode',
                    this.state.countryCode,
                    'required'
                  )}
                </div>
                <div className='col-md-4 input-field '>
                  <label
                    id='phone-lbl'
                    htmlFor='phone'
                    className=' required active'
                  >
                    Phone Number<span className='star'>&#160;*</span>
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
                    'required'
                  )}
                </div>

                <div className='col-md-6 input-field '>
                  <label
                    id='address-lbl'
                    htmlFor='address'
                    className=' required active'
                  >
                    Address<span className='star'>&#160;*</span>
                  </label>
                  <input
                    type='text'
                    name='address'
                    id='address'
                    value={this.state.address}
                    onChange={this.onChange}
                  />
                  {this.validator.message(
                    'address',
                    this.state.address,
                    'required|max:1200'
                  )}
                </div>
                <div className='input-field col-md-6'>
                  <label
                    id='city-lbl'
                    htmlFor='city'
                    className='required active'
                  >
                    City<span className='star'>&#160;*</span>
                  </label>
                  <input
                    type='text'
                    name='city'
                    id='city'
                    value={this.state.city}
                    onChange={this.onChange}
                  />
                  {this.validator.message(
                    'city',
                    this.state.city,
                    'required|max:50'
                  )}
                </div>

                <div className='input-field col-md-6'>
                  <label
                    id='zip-lbl'
                    fohtmlfor='zip'
                    className=' required active'
                  >
                    Zip Code<span className='star'>&#160;*</span>
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
                {this.props.course && this.props.course.course_type === 2 ? (
                  <div className='input-field col-md-6'>
                    { this.props.courseId=='MzE=' ?
                    (
                      <label
                      id='donationAmount-lbl'
                      htmlFor='donationAmount'
                      className=' required'
                    >
                      Donation Amount (Min. $54)
                      <span className='star'>&#160;*</span>
                    </label>
                    ) : this.props.courseId=='NTM=' ? (
                      <label
                      id='donationAmount-lbl'
                      htmlFor='donationAmount'
                      className=' required'
                    >
                      Donation Amount (Min. ${this.state.coursePrice})
                      <span className='star'>&#160;*</span>
                    </label>
                    )
                    :
                    (
                      <label
                      id='donationAmount-lbl'
                      htmlFor='donationAmount'
                      className=' required'
                    >
                      Donation Amount (Min. $10)
                      <span className='star'>&#160;*</span>
                    </label>
                    )


                    }
                    
                    
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
                          Applieds
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
                        I have read and accept the{' '}
                        <Link href='/terms-of-services'>
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
              <div className='input-field col-md-12 text-right'>
                <button type='submit' className='btn btn-lg'>
                  Buy Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default BuyCourseForm;
