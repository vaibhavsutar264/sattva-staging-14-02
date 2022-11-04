import React, { Component } from "react";
import axios from "axios";
import Router from "next/router";
import Constants from "../../constants";
// import DropIn from 'braintree-web-drop-in-react';
import ReCAPTCHA from "react-google-recaptcha";
import {
  apiRoute,
  getApiHeader,
  getGpayMerchantId,
  getLocalStorage,
} from "../../utils/helpers";
import SimpleReactValidator from "simple-react-validator";
import CountryOptions from "../CountryOptions";
import CourseServices from "../../services/courseServices";
import PhoneCodeOptions from "../PhoneCodeOptions";
// import FacebookLogin from 'react-facebook-login';

import dynamic from "next/dynamic";
const DropIn = dynamic(import("braintree-web-drop-in-react"), { ssr: false });

// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_51LLSFfAdsI3iQAxrqEJ3Mcnxao4GJ7FBcyWu48RW2GRESHlf4gAaHieXJKpMLavrP7QZtCgzYMPO0Y7Z7XVFqlfh002cmAQyev');
// const options = {
//   // passing the client secret obtained from the server
//   clientSecret: 'sk_test_51LLSFfAdsI3iQAxreb3PQ1SeDuF6M3oUNjaSgU4r3ORiuqw5o3UlaYWmwQoahHvxSoKhNMJksLXeUXrXzHwsQbaQ00vstFtAB3',
// };

const max = 9;
const rand1 = Math.floor(Math.random(1) * Math.floor(max));
const rand2 = Math.floor(Math.random(1) * Math.floor(max));
const initialState = {
  username: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  zip: "",
  country: "",
  countryCode: "",
  phone: "",
  email: "",
  confirmEmail: "",
  planId: "",
  planName: "",
  planPrice: "",
  labelClass: "",
  couponCode: "",
  other: "",
  freeTrialDays: 14,
  emailAvailability: true,
  usenameAvailability: true,
  successMessage: false,
  confirmPasswordError: false,
  pageLoading: true,
  errors: [],
  error: false,
  errorMsg: "",
  security: true,
  recaptcha: false,
  terms: "",
  newslatter: "",
  confirmEmailError: false,
  showOtherField: false,
  couponApplied: false,
  couponReadOnly: false,
  appiedCouponCode: "",
  couponApplyError: false,
  clientId: false,
  loading: false,
  gpayMerchantId: getGpayMerchantId(),
  readonly: "",
  affiliate_id: " ",
  fb: true,
  fb_id: "",
  fbIdAvailability: true,
  notification: "",
};

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    this.recaptchaRef = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCountryChange = this.onCountryChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    this.state = initialState;

    this.fbLogindata = this.fbLogindata.bind(this);
  }

  componentDidMount() {
    const script = document.createElement("script");

    script.src = "https://connect.facebook.net/en_US/sdk.js";
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
      .get(apiRoute("get-plan-details/" + this.props.planId), requestOptions)
      .then((res) => {
        this.setState({
          planId: res.data.braintree_id,
          planName: res.data.name,
          planPrice: res.data.price,
        });
      });
    const affiliate_id = localStorage.getItem("uniqueAffiliate_id");
    if (affiliate_id) {
      this.setState({ affiliate_id: affiliate_id });
    }
    //facebook javascript

    window.fbAsyncInit = function () {
      FB.init({
        appId: Constants.FB_LIVE_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: "v10.0",
        localStorage: false,
      });
    };
  }

  fbLogindata = () => {
    window.FB.login(() => {
      FB.api("/me", { fields: "last_name,first_name,email" }, (response) => {
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
    var phoneCode = optionElement.getAttribute("phoneCode");
    this.setState({ country: e.target.value });
    this.setState({ countryCode: phoneCode });
  }

  onCheckboxChange = (e) => {
    if (e.target.checked) {
      this.setState({ [e.target.name]: 1 });
    } else {
      this.setState({ [e.target.name]: "" });
    }
  };

  onCheckboxChangeNotification = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
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
    if (e.target.value !== "" && this.state.confirmPassword !== "") {
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
    if (this.state.password !== "" && e.target.value !== "") {
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

  onEmailChange(e) {
    const email = e.target.value;
    this.setState({ email: email });
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      CourseServices.checkUserEmail(email)
        .then((res) => {
          if (res.data.status == true) {
            this.setState({ emailAvailability: true });
          } else {
            this.setState({ emailAvailability: false });
          }
        })
        .catch((error) => {
          this.setState({ emailAvailability: false });
        });
    } else {
      return false;
    }
    if (this.state.confirmEmail !== "" && e.target.value !== "") {
      if (this.state.confirmEmail !== e.target.value) {
        this.setState({ confirmEmailError: true });
        return false;
      } else {
        this.setState({ confirmEmailError: false });
      }
    } else {
      this.setState({ confirmEmailError: false });
    }
  }

  onConfirmEmailChange = (e) => {
    const email = e.target.value;
    this.setState({ confirmEmail: email });
    if (this.state.email !== "" && e.target.value !== "") {
      if (this.state.email !== e.target.value) {
        this.setState({ confirmEmailError: true });
        return false;
      } else {
        this.setState({ confirmEmailError: false });
      }
    } else {
      this.setState({ confirmEmailError: false });
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
    if (this.state.email !== this.state.confirmEmail) {
      window.scrollTo(0, 0);
      this.setState({ confirmEmailError: true });
      return false;
    } else {
      this.setState({ confirmEmailError: false });
    }

    if (!this.state.emailAvailability) {
      window.scrollTo(0, 0);
      return false;
    }
    if (!this.state.usenameAvailability) {
      window.scrollTo(0, 0);
      return false;
    }
    if (this.state.couponCode !== "" && this.state.couponApplied == false) {
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
      event: "1",
      affiliate_id: this.state.affiliate_id,
      fb_id: this.state.fb_id,
    };

    CourseServices.userRegistration(userDetail)
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
        if (this.state.newslatter == "1") {
          axios.post(
            apiRoute("add-user-to-mailchimp"),
            userEmailDetails,
            requestOptions
          );
        }
        this.setState({ loading: false });
        Router.push(
          Constants.SITE_URL +
            "/user-registration-success/" +
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
    if (text == "Other") {
      this.setState({ showOtherField: true });
    } else {
      this.setState({ showOtherField: false, other: "" });
    }
  };

  applyCouponCode = () => {
    this.setState({ loading: true });
    const details = {
      plan: this.props.planId,
      couponCode: this.state.couponCode,
      event: "1",
    };
    const requestOptions = {
      headers: getApiHeader(),
    };
    axios
      .post(apiRoute("check-subscriber-coupon"), details, requestOptions)
      .then((res) => {
        if (res.data.type == "2") {
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
        errorsArray.push({ message: "Invalid coupon code." });
        this.setState({
          couponApplied: false,
          error: true,
          errors: errorsArray,
          couponReadOnly: false,
          couponCode: "",
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
          <div className="preloader-background">
            <div className="big sattva_loader active">
              <img src={Constants.SITE_URL + "/images/loader.png"} />
            </div>
          </div>
        )}
        <div className="card subscription-card">
          <form
            onSubmit={this.onSubmit}
            id="giftCourseForm"
            autocomplete="off"
            className="form form-horizontal"
          >
            <div className="reg-head-div">
              <div className="signUp-title-div">
                <h4 className="revamp-subtitle">Account Information</h4>
                <p
                  className="revamp-para-small"
                  style={{ marginBottom: "15px" }}
                >
                  You can sign up with your email address or you can sign up
                  using Facebook.
                </p>
              </div>
              <div className="mb-3">
                <p>
                  {" "}
                  <a
                    className="fb-button"
                    onClick={this.fbLogindata}
                    type="button"
                    style={{ fontWeight: "500" }}
                  >
                    <img
                      height="36px"
                      width="36px"
                      className="facebook-image mr-3"
                      src={Constants.SITE_URL + "/images/signup-fb.svg"}
                    />
                    Signup with facebook
                  </a>
                </p>
              </div>
            </div>

            <div className="customer-support p-0">
              {this.state.errors.map((item, index) => {
                return (
                  <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                  >
                    <p>{item.message}</p>
                  </div>
                );
              })}

              {this.state.confirmPasswordError == true && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <p>Password does not match.</p>
                </div>
              )}
              {this.state.confirmEmailError == true && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <p>Email does not match.</p>
                </div>
              )}
              {this.state.emailAvailability == false && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <p>Email is already in used.</p>
                </div>
              )}

              {this.state.fbIdAvailability == false && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <p>This facebook account already in used.</p>
                </div>
              )}

              {this.state.usenameAvailability == false && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <p>Username is already in used.</p>
                </div>
              )}
              {this.state.couponApplyError == true && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <p>Please apply coupon before submitting the form.</p>
                </div>
              )}
              {this.state.security === false && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <p>Recaptcha is required.</p>
                </div>
              )}
              <div
                className="control-group"
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f2f2f2",
                  // padding: "5px",
                }}
              >
                <label
                  id="firstName-lbl"
                  for="firstName"
                  className="control-label"
                  style={{ width: "200px", marginLeft: "5px" }}
                >
                  First Name<span className="required">&#160;*</span> :
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={this.state.firstName}
                  onChange={this.onChange}
                />
              </div>
              {this.validator.message(
                "firstName",
                this.state.firstName,
                "required|max:50"
              )}
              <div
                className="control-group"
                style={{
                  display: "flex",
                  alignItems: "center",
                  // backgroundColor: "#f2f2f2",
                  // padding: "5px",
                }}
              >
                <label
                  id="lastName-lbl"
                  for="lastName"
                  className="control-label"
                  style={{ width: "200px", marginLeft: "5px" }}
                >
                  Last Name<span className="required">&#160;*</span> :
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={this.state.lastName}
                  onChange={this.onChange}
                />
              </div>
              {this.validator.message(
                "lastName",
                this.state.lastName,
                "required|max:50"
              )}
              <div
                className="control-group"
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f2f2f2",
                  // padding: "5px",
                }}
              >
                <label
                  id="email-lbl"
                  for="email"
                  className="control-label"
                  style={{ width: "200px", marginLeft: "5px" }}
                >
                  Email<span className="required">&#160;*</span> :
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={this.state.email}
                  onChange={this.onEmailChange}
                />
              </div>
              {this.validator.message(
                "email",
                this.state.email,
                "required|email"
              )}
              <div
                className="control-group"
                style={{
                  display: "flex",
                  alignItems: "center",
                  // backgroundColor: "#f2f2f2",
                  // padding: "5px",
                }}
              >
                <label
                  id="cofirmEmail-lbl"
                  for="cofirmEmail"
                  className="control-label"
                  style={{ width: "200px", marginLeft: "5px" }}
                >
                  Retype-Email<span className="required">&#160;*</span> :
                </label>
                <input
                  type="text"
                  name="cofirmEmail"
                  id="cofirmEmail"
                  value={this.state.confirmEmail}
                  onChange={this.onConfirmEmailChange}
                />
              </div>
              {this.validator.message(
                "cofirmEmail",
                this.state.confirmEmail,
                "required|email"
              )}
              <div
                className="control-group"
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f2f2f2",
                  // padding: "5px",
                }}
              >
                <label
                  id="username-lbl"
                  for="username"
                  className="control-label"
                  style={{ width: "200px", marginLeft: "5px" }}
                >
                  Username<span className="required">&#160;*</span> :
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="new-username"
                  value={this.state.username}
                  onChange={this.onUsernameChange}
                />
              </div>
              {this.validator.message(
                "username",
                this.state.username,
                "required"
              )}
              <div
                className="control-group"
                style={{
                  display: "flex",
                  alignItems: "center",
                  // backgroundColor: "#f2f2f2",
                  // padding: "5px",
                }}
              >
                <label
                  id="password-lbl"
                  for="password"
                  className="control-label"
                  style={{ width: "200px", marginLeft: "5px" }}
                >
                  Password<span className="required">&#160;*</span> :
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  value={this.state.password}
                  onChange={this.onPasswordChange}
                />
              </div>
              {this.validator.message(
                "password",
                this.state.password,
                "required|min:6"
              )}
              <div
                className="control-group"
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f2f2f2",
                  // padding: "5px",
                }}
              >
                <label
                  id="confirmPassword-lbl"
                  for="confirmPassword"
                  className="control-label"
                  style={{ width: "200px", marginLeft: "5px" }}
                >
                  Retype-password<span className="required">&#160;*</span> :
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.onConfirmPasswordChange}
                />
              </div>
              {this.validator.message(
                "confirm password",
                this.state.confirmPassword,
                "required|min:6"
              )}
              <div
                className="control-group"
                style={{
                  display: "flex",
                  alignItems: "center",
                  // backgroundColor: "#f2f2f2",
                  // padding: "5px",
                }}
              >
                <label
                  id="address1-lbl"
                  for="address1"
                  className="control-label"
                  style={{ width: "200px", marginLeft: "5px" }}
                >
                  Address1<span className="required">&#160;*</span> :
                </label>
                <input
                  type="text"
                  name="address1"
                  id="address1"
                  value={this.state.address1}
                  onChange={this.onChange}
                />
              </div>
              {this.validator.message(
                "address1",
                this.state.address1,
                "required"
              )}
              <div
                className="control-group"
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f2f2f2",
                  // padding: "5px",
                }}
              >
                <label
                  id="address2-lbl"
                  for="address2"
                  className="control-label"
                  style={{ width: "200px", marginLeft: "5px" }}
                >
                  Address2 :
                </label>{" "}
                <input
                  type="text"
                  name="address2"
                  id="address2"
                  value={this.state.address2}
                  onChange={this.onChange}
                />
              </div>

              <div
                className="control-group"
                style={{
                  display: "flex",
                  alignItems: "center",
                  // backgroundColor: "#f2f2f2",
                  // padding: "5px",
                }}
              >
                <label
                  id="city-lbl"
                  for="city"
                  className="control-label"
                  style={{ width: "200px", marginLeft: "5px" }}
                >
                  City<span className="required">&#160;*</span> :
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={this.state.city}
                  onChange={this.onChange}
                />
              </div>
              {this.validator.message("city", this.state.city, "required")}
              <div
                className="control-group"
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f2f2f2",
                  // padding: "5px",
                }}
              >
                <label
                  id="zip-lbl"
                  for="zip"
                  className="control-label"
                  style={{ width: "200px", marginLeft: "5px" }}
                >
                  Zip Code<span className="required">&#160;*</span> :
                </label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  value={this.state.zip}
                  onChange={this.onChange}
                />
              </div>
              {this.validator.message("zip", this.state.zip, "required")}
              <div
                className="control-group"
                style={{
                  display: "flex",
                  alignItems: "center",
                  // backgroundColor: "#f2f2f2",
                  // padding: "5px",
                }}
              >
                <label
                  for="country"
                  className="control-label"
                  style={{ width: "200px", marginLeft: "5px" }}
                >
                  Country<span className="required">&#160;*</span> :
                </label>
                <select
                  id="country"
                  name="country"
                  onChange={this.onCountryChange}
                >
                  <option selected>Select Country</option>
                  <CountryOptions />
                </select>
              </div>
              {this.validator.message(
                "country",
                this.state.country,
                "required"
              )}
              <div
                className="control-group"
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f2f2f2",
                  // padding: "5px",
                }}
              >
                <label
                  for="country"
                  className="control-label"
                  style={{ width: "200px", marginLeft: "5px" }}
                >
                  Dial Code(+)<span className="required">&#160;*</span> :
                </label>
                <select
                  id="countryCode"
                  name="countryCode"
                  value={this.state.countryCode}
                  onChange={this.onChange}
                >
                  <option> Dial Code(+)</option>
                  <PhoneCodeOptions />
                </select>
              </div>
              {this.validator.message(
                "countryCode",
                this.state.countryCode,
                "required"
              )}
              <div
                className="control-group"
                style={{
                  display: "flex",
                  alignItems: "center",
                  // backgroundColor: "#f2f2f2",
                  // padding: "5px",
                }}
              >
                <label
                  id="phone-lbl"
                  for="phone"
                  className="control-label"
                  style={{ width: "200px", marginLeft: "5px" }}
                >
                  Phone<span className="required">&#160;*</span> :
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                />
              </div>
              {this.validator.message(
                "phone",
                this.state.phone,
                "required|max:16"
              )}
              <div
                className="control-group"
                id="field_osm_osmosmhowdidyougettoknow_us"
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f2f2f2",
                  // padding: "5px",
                }}
              >
                <div className="control-label">
                  <label
                    id="osm_osmosmhowdidyougettoknow_us-lbl"
                    for="osm_osmosmhowdidyougettoknow_us"
                    class=""
                    style={{ width: "200px", marginLeft: "5px" }}
                  >
                    {/* How did you get to know us? */}
                    How did you find us?
                    <span className="required">&nbsp;*</span> :
                  </label>
                </div>
                <div className="controls" style={{ width: "100%" }}>
                  <select
                    id="osm_osmosmhowdidyougettoknow_us"
                    name="howknowUs"
                    onChange={this.howYouKnowChange}
                  >
                    <option value="Sattva Yoga Academy">
                      Sattva Yoga Academy
                    </option>
                    <option value="Sattva Collection">Sattva Collection</option>
                    <option value="Google">Google</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Family and friends">
                      Family and friends
                    </option>
                    <option value="SC member">SC member</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              {this.state.showOtherField && (
                <div
                  className="control-group"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    // backgroundColor: "#f2f2f2",
                    // padding: "5px",
                  }}
                >
                  <label
                    for="other"
                    className="control-label"
                    style={{ width: "200px", marginLeft: "5px" }}
                  >
                    Other :
                  </label>
                  <textarea
                    name="other"
                    value={this.state.other}
                    onChange={this.onChange}
                  ></textarea>
                </div>
              )}
              {this.validator.message("other", this.state.other, "required")}
              <div
                className="control-group"
                style={{
                  display: "flex",
                  alignItems: "center",
                  // backgroundColor: "#f2f2f2",
                  // padding: "5px",
                }}
              >
                <label
                  id="Plan-lbl"
                  for="Plan"
                  className="control-label"
                  style={{ width: "200px", marginLeft: "5px" }}
                >
                  Plan<span className="required">&#160;*</span> :
                </label>
                <input
                  type="text"
                  name="Plan"
                  id="Plan"
                  value={this.state.planName}
                  readOnly
                />
              </div>
              <div
                className="control-group"
                // style={{
                //   display: "flex",
                //   alignItems: "center",
                //   backgroundColor: "#f2f2f2",
                // padding: "10px",
                // }}
              >
                <div
                  className="col-sm-12 position-relative"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#f2f2f2",
                    paddingLeft: "0px",
                    // padding: "5px",
                  }}
                >
                  <label
                    id="couponCode-lbl"
                    for="couponCode"
                    className="control-label"
                    style={{ width: "200px", marginLeft: "5px" }}
                  >
                    Coupon Code:
                  </label>
                  <input
                    type="text"
                    name="couponCode"
                    readOnly={this.state.couponReadOnly}
                    id="couponCode"
                    value={this.state.couponCode}
                    onChange={this.onChange}
                  />
                  {this.state.couponApplied == false ? (
                    <button
                      type="button"
                      class="btn btn-lg waves-effect waves-light couponBtn"
                      onClick={this.applyCouponCode}
                    >
                      Apply{" "}
                    </button>
                  ) : (
                    <button
                      type="button"
                      class="btn btn-lg waves-effect waves-light couponBtn"
                    >
                      Applied
                    </button>
                  )}
                </div>
              </div>

              <div
                className="control-group"
                style={{
                  display: "flex",
                  alignItems: "center",
                  // backgroundColor: "#f2f2f2",
                  // padding: "5px",
                }}
              >
                <label
                  id="Price-lbl"
                  for="Price"
                  className="control-label"
                  style={{ width: "200px", marginLeft: "5px" }}
                >
                  Price<span className="required">&#160;*</span> :
                </label>
                <input
                  type="text"
                  name="Price"
                  id="Price"
                  value={"$" + this.state.planPrice}
                  readOnly
                />
              </div>
              <h4 className="mt-3 revamp-subtitle">Payment Information</h4>
              <p className="mb-3 freeTrailMsg revamp-para-small black-text">
                Your credit card will not be charged after your 14-days free
                trial, unless you cancel before the trial period ends. This can
                be done from your account settings. Please note that your
                membership is automatically renewed after every billing cycle.
              </p>
              {clientId ? (
                <>
                  <DropIn
                    options={{
                      authorization: clientId,
                      paymentOptionPriority: ["card", "paypal", "googlePay"],
                      paypal: { flow: "vault" },
                      googlePay: { flow: "vault" },
                      googlePay: {
                        environment: "PRODUCTION",
                        googlePayVersion: 2,
                        merchantId: this.state.gpayMerchantId,

                        transactionInfo: {
                          totalPriceStatus: "FINAL",
                          totalPrice: "21",
                          currencyCode: "USD",
                        },
                      },
                    }}
                    onInstance={(instance) => (this.instance = instance)}
                  />
                  {/* <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm />
                </Elements> */}
                </>
              ) : (
                ""
              )}
              <div className="checkbox">
                <input
                  id="terms"
                  type="checkbox"
                  name="terms"
                  value="terms"
                  onChange={this.onCheckboxChange}
                  checked={this.state.terms}
                />
                <label htmlFor="terms">
                  I accept the
                  <a href="/terms-of-services" target="_blank">
                    {" "}
                    Terms and Conditions
                  </a>
                  <span className="required">&#160;*</span>
                </label>
                {this.validator.message("terms", this.state.terms, "required")}
              </div>

              <div className="checkbox">
                <input
                  id="newslatter"
                  type="checkbox"
                  name="newslatter"
                  value="newslatter"
                  onChange={this.onCheckboxChange}
                  checked={this.state.newslatter}
                />
                <label htmlFor="newslatter">
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
              <div className="control-group">
                <div className="security-check">
                  <div className="input-group-prepend user-reg-security">
                    <ReCAPTCHA
                      ref={this.recaptchaRef}
                      sitekey="6LeO0r0ZAAAAAN2hNPGgn_eHl3Ki_Oxn0JaPtujV"
                      onChange={this.onResolved}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="input-field text-right">
              <button type="submit" className="btn btn-lg">
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
