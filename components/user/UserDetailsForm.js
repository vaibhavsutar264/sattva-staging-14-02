import React, { Component } from 'react';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import AuthService from '../../services/authServices';
import {
  getLocalStorageAuth,
  setLocalStorageAuth,
  apiRoute,
  getApiHeader,
  userProfilePath,
} from '../../utils/helpers';

class UserDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.usernameValidate = new SimpleReactValidator();
    this.emailValidate = new SimpleReactValidator();
    this.changePasswordValidate = new SimpleReactValidator();
    this.userDetailsValidate = new SimpleReactValidator();
    this.state = {
      username: '',
      email: '',
      secondaryEmail: '',
      oldEmail: '',
      oldUsername: '',
      userId: '',
      first_name: '',
      last_name: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      zip: '',
      country: '',
      alert: false,
      alertType: '',
      alertMsg: '',
      password: '',
      profilePic: '',
      image: '',
      countryFlag: '',
      countries: [],
      timezones: [],
      timezone: '',
      dob: '',
      gender: '',
      confirmPassword: '',
      emailAvailability: true,
      usernameAvailability: true,
      passwordStatus: true,
      updatebtn: false
    };
    this.onChange = this.onChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    // this.handleUsernameForm = this.handleUsernameForm.bind(this);
    // this.handleUserEmailForm = this.handleUserEmailForm.bind(this);
    // this.handleChangePasswordForm = this.handleChangePasswordForm.bind(this);
    this.handleUserDetailsForm = this.handleUserDetailsForm.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const authData = getLocalStorageAuth();
    if (authData) {
      const userDetails = authData.userDetails;

      this.setState({
        userId: userDetails.id,
        email: userDetails.email,
        secondaryEmail: userDetails.secondary_email,
        oldEmail: userDetails.email,
        username: userDetails.username,
        oldUsername: userDetails.username,
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
        phone: userDetails.phone,
        city: userDetails.city,
        address1: userDetails.address1,
        address2: userDetails.address2,
        zip: userDetails.zip_code,
        countryCode: userDetails.country_code,
        country: userDetails.country,
        profilePic: userDetails.profile_pic,
        timezone: userDetails.timezone_id,
        gender: userDetails.gender,
        dob: userDetails.dob,
      });
      const requestOptions = {
        headers: getApiHeader(),
      };

      axios.get(apiRoute('get-all-countries'), requestOptions).then((res) => {
        this.setState({ countries: res.data.countries });
        const result = res.data.countries.filter(
          (item) => item.country == userDetails.country
        );
        if (result[0].CountryCode) {
          const flag = result[0].CountryCode.toLowerCase();
          this.setState({ countryFlag: flag });
        }
      });

      axios.get(apiRoute('get-all-timezone'), requestOptions).then((res) => {
        this.setState({ timezones: res.data });
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ updatebtn: true });
  }

  onUsernameChange(e) {
    const userName = e.target.value;
    this.setState({ username: userName });
    AuthService.checkUsernameAvailability(
      userName,
      this.state.oldUsername
    ).then((res) => {
      if (res.data.status !== true) {
        this.setState({ usernameAvailability: false });
      } else {
        this.setState({ usernameAvailability: true });
      }
    });
  }

  onEmailChange(e) {
    const email = e.target.value;
    this.setState({ email: email });
    this.setState({ updatebtn: true });
    AuthService.checkEmailAvailability(email, this.state.oldEmail).then(
      (res) => {
        console.log(res.data.status.status);
        if (res.data.status.status !== true) {
          this.setState({ emailAvailability: false });
          console.log('true');
        } else {
          this.setState({ emailAvailability: true });
          console.log('false');
        }
      }
    );
  }


  userDetailsSupply = (dp) => {

    let data = new FormData();
    data.append('image', dp);
    data.append('email', this.state.email);
    data.append('secondary_email', this.state.secondaryEmail);
    data.append('id', this.state.userId);
    data.append('first_name', this.state.first_name);
    data.append('last_name', this.state.last_name);
    data.append('phone', this.state.phone);
    data.append('city', this.state.city);
    data.append('address1', this.state.address1);
    data.append('address2', this.state.address2);
    data.append('zip_code', this.state.zip);
    data.append('country_code', this.state.countryCode);
    data.append('country', this.state.country);
    data.append('timezone', this.state.timezone);
    data.append('gender', this.state.gender);
    data.append('dob', this.state.dob);
    this.props.setLoading(true);

    AuthService.updateUserDetails(data)
      .then((res) => {
        const auth = getLocalStorageAuth();
        auth.userDetails = res.data.user;
        setLocalStorageAuth(auth);
        this.setState({
          alert: true,
          alertType: 'success',
          alertMsg: res.data.message,
          profilePic: res.data.user.profile_pic,
        });
        const result = this.state.countries.filter(
          (item) => item.country == this.state.country
        );
        if (result[0].CountryCode) {
          const flag = result[0].CountryCode.toLowerCase();
          this.setState({ countryFlag: flag });
        }
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

  }

  handleImageChange = (e) => {

    this.userDetailsSupply(e.target.files[0]);
    // this.setState({
    //   image: e.target.files[0],
    // });
  };
  handleUserDetailsForm(e) {
    e.preventDefault();
    if (!this.userDetailsValidate.allValid()) {
      this.userDetailsValidate.showMessages();
      this.forceUpdate();
      return false;
    }
    if (!this.emailValidate.allValid()) {
      this.emailValidate.showMessages();
      this.forceUpdate();
      return false;
    }
    this.userDetailsSupply(this.state.image);
  }

  onCountryChange = (e) => {
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    const phoneCode = optionElement.getAttribute('phoneCode');
    this.setState({ country: e.target.value });
    this.setState({ countryCode: phoneCode });
  };

  enablePush = () => {
    const getId = getLocalStorageAuth();
    let id = getId.userDetails.id;
    let id1 = id.toString();
    console.log(id1);
    //stagging
    // appId: "40192d8c-9efa-4b26-ae5f-ebf0de7602b9",

    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function () {

      OneSignal.init({
        appId: "530f8c19-d32a-48e7-8487-7dbf523f3a0a",
        notifyButton: {
          enable: true,
        },
        allowLocalhostAsSecureOrigin: true,
      });
      OneSignal.showNativePrompt();

      OneSignal.isPushNotificationsEnabled(function (isEnabled) {
        if (isEnabled) {
          console.log("Push notifications are enabled!");
          OneSignal.setExternalUserId(id1);
        }
        else {
          console.log("Push notifications are not enabled yet.");
        }
      });
    });
  }

  render() {
    const { alert, alertType, alertMsg } = this.state;
    return (
      <>
        {/* <div className='tooltipster plantype tooltipstered'>
          Profile Information
        </div> */}
        <div className="mt-3">
          <h3 className='revamp-blog-title'>Profile Information</h3>
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
        {this.state.passwordStatus === false && (
          <div className='alert alert-danger' role='alert'>
            <p>Password does not match</p>
          </div>
        )}
        {/* <div className='support-heading'>
          <h4 className='revamp-blog-title mb-0'>Profile Information</h4>
        </div> */}
        <div className='row justify-content-center'>
          <div className='col-md-12'>
            {this.state.emailAvailability === false && (
              <div className=''>
                <div
                  className='alert alert-danger alert-dismissible fade show'
                  role='alert'
                >
                  <p>Email is already in used.</p>
                </div>
              </div>
            )}
            <form onSubmit={this.handleUserDetailsForm}>
              <div className='profile-flex'>
                <div className='upload-file'>
                  <div className='upload-img'>
                    <img
                      className='responsive-img'
                      src={userProfilePath(this.state.profilePic)}
                    />
                  </div>
                  <div className='upload-btn'>
                    <input type='file' onChange={this.handleImageChange} />
                    <i className='fas fa-camera'></i>
                  </div>
                </div>
              </div>
              <table className='table table-striped profile-table detail-table border-0'>
                <tbody>
                  {/* <tr>
              <th scope='row'>Name:</th>
              <td>
                {this.state.user.first_name} {this.state.user.last_name}
              </td>
            </tr> */}
                  <tr>
                    <th scope='row'>First Name:</th>
                    <td className='py-0'>
                      <div className='input-field col-md-6 mt-1'>
                        {/* <i className='fas fa-user-circle'></i> */}
                        <input
                          id='first_name'
                          value={this.state.first_name}
                          name='first_name'
                          type='text'
                          className='pinf m-0 no-border-btm'
                          onChange={this.onChange}
                          placeholder='First name'
                        />
                        {this.userDetailsValidate.message(
                          'first_name',
                          this.state.first_name,
                          'required'
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'>Last Name:</th>
                    <td className='py-0'>
                      <div className='input-field col-md-6 mt-1'>
                        <input
                          id='last_name'
                          value={this.state.last_name}
                          name='last_name'
                          type='text'
                          className='pinf m-0 no-border-btm'
                          onChange={this.onChange}
                          placeholder='Last name'
                        />
                        {this.userDetailsValidate.message(
                          'last_name',
                          this.state.last_name,
                          'required'
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'>Email:</th>
                    <td className='py-0'>
                      <div className='input-field  col-md-6 mt-1'>
                        <input
                          id='uemail'
                          name='uemail'
                          value={this.state.email}
                          className='pinf m-0 no-border-btm'
                          onChange={this.onEmailChange}
                          placeholder='Email'
                        />
                        {this.emailValidate.message(
                          'username',
                          this.state.email,
                          'required'
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'>Address:</th>
                    <td className='py-0'>
                      <div className='input-field col-md-6 mt-1'>
                        <input
                          id='address'
                          name='address1'
                          className='materialize-textarea pinf m-0 no-border-btm'
                          value={this.state.address1}
                          onChange={this.onChange}
                          placeholder='Address'
                        />
                        {this.userDetailsValidate.message(
                          'address1',
                          this.state.address1,
                          'required'
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'>City:</th>
                    <td className='py-0'>

                      <div className='input-field col-md-6 mt-1'>
                        {/* <i className='fas fa-building'></i> */}
                        <input
                          id='city'
                          value={this.state.city}
                          name='city'
                          type='text'
                          className='pinf m-0 no-border-btm'
                          onChange={this.onChange}
                          placeholder='City'
                        />
                        {this.userDetailsValidate.message(
                          'city',
                          this.state.city,
                          'required'
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'> Zip:</th>
                    <td className='py-0'>
                      <div className='input-field col-md-6 mt-1'>
                        <input
                          id='zip'
                          name='zip'
                          type='text'
                          value={this.state.zip}
                          className='pinf m-0 no-border-btm'
                          onChange={this.onChange}
                          placeholder='Zip code'
                        />
                        {this.userDetailsValidate.message(
                          'zip',
                          this.state.zip,
                          'required|max:7'
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'> Country:</th>
                    <td className='py-0'>
                      <div className='input-field select-field col-md-6 mt-1 '>
                        <select
                          id='country'
                          name='country'
                          className='m-0 w-100 no-border-btm'
                          onChange={this.onCountryChange}
                          placeholder='Country'
                        >
                          <option>Country *</option>
                          {this.state.countries.map((item, index) => {
                            const selected =
                              this.state.country === item.country ? true : false;
                            return (
                              <option
                                phonecode={item.phonecode}
                                key={index}
                                value={item.country}
                                selected={selected}
                              >
                                {item.country}
                              </option>
                            );
                          })}
                        </select>
                        {this.userDetailsValidate.message(
                          'country',
                          this.state.country,
                          'required'
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'> Country Code(+):</th>
                    <td className='py-0'>
                      <div class='input-field col-md-6 mt-1'>
                        <input
                          id='custom_osm_dial_code'
                          name='countryCode'
                          type='text'
                          value={this.state.countryCode}
                          className='pinfsm m-0 no-border-btm'
                          onChange={this.onChange}
                          placeholder='Country code'
                        />
                        {this.userDetailsValidate.message(
                          'countryCode',
                          this.state.countryCode,
                          'required|integer'
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'> Phone(+):</th>
                    <td className='py-0'>
                      <div className='input-field col-md-6 mt-1'>
                        <input
                          id='phone'
                          name='phone'
                          type='text'
                          value={this.state.phone}
                          className='pinf m-0 no-border-btm'
                          onChange={this.onChange}
                          placeholder='Phone'
                        />
                        {this.userDetailsValidate.message(
                          'phone',
                          this.state.phone,
                          'required|max:17'
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'> DOB:</th>
                    <td className='py-0'>
                      <div className='input-field select-field col-md-6 mt-1'>
                        <input
                          id='dob'
                          name='dob'
                          type='date'
                          value={this.state.dob}
                          className='pinf m-0 no-border-btm'
                          onChange={this.onChange}
                        />
                        {this.userDetailsValidate.message(
                          'dob',
                          this.state.dob,
                          'required'
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope='row'>Gender:</th>
                    <td className='py-0'>
                      <div className='input-field select-field col-md-6 mt-1'>
                        {/* <i className='fas fa-user-circle'></i> */}
                        <select id='gender' name='gender' className='m-0 w-100 no-border-btm' onChange={this.onChange}>
                          <option value=''>Gender</option>
                          <option
                            value='Male'
                            selected={this.state.gender == 'Male' ? true : false}
                          >
                            Male
                          </option>
                          <option
                            value='Female'
                            selected={this.state.gender == 'Female' ? true : false}
                          >
                            Female
                          </option>
                          <option
                            value='Transgender'
                            selected={this.state.gender == 'Transgender' ? true : false}
                          >
                            Transgender
                          </option>
                          <option
                            value='Not-to-say'
                            selected={this.state.gender == 'Not-to-say' ? true : false}
                          >
                            I prefer not to say
                          </option>
                        </select>

                        {this.userDetailsValidate.message(
                          'gender',
                          this.state.gender,
                          'required'
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className='text-right'>
                <button title='Update Profile' className='btn btn-sm'>
                  Save{' '}
                  {/* <i class='fa fa-paper-plane' aria-hidden='true'></i> */}
                </button>
              </div>
            </form>
            {/* <h6 className='card-title'>Profile Information</h6> */}
          </div>
        </div>
      </>
    );
  }
}
export default UserDetailsForm;
