import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { apiRoute, getApiHeader, getLocalStorageAuth, setLocalStorageAuth } from '../../utils/helpers';
import axios from 'axios';
import AuthService from '../../services/authServices';
import Link from 'next/link';

class Security extends Component {
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
            btnActive: false,
            btnActive2: false
        };
        this.onChange = this.onChange.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.handleUsernameForm = this.handleUsernameForm.bind(this);
        // this.handleUserEmailForm = this.handleUserEmailForm.bind(this);
        // this.handleChangePasswordForm = this.handleChangePasswordForm.bind(this);
        // this.handleUserDetailsForm = this.handleUserDetailsForm.bind(this);
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
        if (this.state.password !== '') {
            this.setState({ btnActive: true })
        } else {
            this.setState({ btnActive2: false })
        }
        console.log(this.state.password)
    }

    onUsernameChange(e) {
        const userName = e.target.value;
        this.setState({ username: userName });
        AuthService.checkUsernameAvailability(
            userName,
            this.state.oldUsername
        ).then((res) => {
            if (res.data.status !== true) {
                this.setState({ usernameAvailability: false, btnActive: false });

            } else {
                this.setState({ usernameAvailability: true, btnActive: true });
            }
        });
    }

    userDetailsSupply = (dp) => {

        let data = new FormData();
        data.append('image', dp);
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

    handleUsernameForm(e) {
        e.preventDefault();
        if (!this.usernameValidate.allValid()) {
            this.usernameValidate.showMessages();
            this.forceUpdate();
            return false;
        }
        // this.props.setLoading(true);
        // const userUsername = {
        //     id: this.state.userId,
        //     username: this.state.username,
        // };
        // if (!this.changePasswordValidate.allValid()) {
        //     this.changePasswordValidate.showMessages();
        //     this.forceUpdate();
        //     return false;
        // }
        if (this.state.password !== this.state.confirmPassword) {
            window.scrollTo(0, 0);
            this.setState({ passwordStatus: false, btnActive2: false });
            return false;
        } else {
            this.setState({ passwordStatus: true, btnActive2: true });
        }
        this.props.setLoading(true);
        const userUsername = {
            id: this.state.userId,
            username: this.state.username,
            password: this.state.password,
        };
        AuthService.updateUserUsername(userUsername)
            .then((res) => {
                window.scrollTo(0, 0);
                const auth = getLocalStorageAuth();
                auth.userDetails.username = this.state.username;
                setLocalStorageAuth(auth);
                this.setState({
                    alert: true,
                    alertType: 'success',
                    alertMsg: res.data.message,
                    confirmPassword: '',
                    password: '',
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
    }



    // handleUserEmailForm(e) {
    //     e.preventDefault();
    //     if (!this.emailValidate.allValid()) {
    //         this.emailValidate.showMessages();
    //         this.forceUpdate();
    //         return false;
    //     }
    //     this.props.setLoading(true);
    //     const userEmail = {
    //         id: this.state.userId,
    //         email: this.state.email,
    //     };
    //     AuthService.updateUserEmail(userEmail)
    //         .then((res) => {
    //             window.scrollTo(0, 0);
    //             const auth = getLocalStorageAuth();
    //             auth.userDetails.email = this.state.email;
    //             setLocalStorageAuth(auth);
    //             this.setState({
    //                 alert: true,
    //                 alertType: 'success',
    //                 alertMsg: res.data.message,
    //             });
    //             this.props.setLoading(false);
    //         })
    //         .catch((error) => {
    //             window.scrollTo(0, 0);
    //             this.setState({
    //                 alert: true,
    //                 alertType: 'error',
    //                 alertMsg: 'Something went wrong please try again.',
    //             });
    //             this.props.setLoading(false);
    //         });
    // }

    // handleChangePasswordForm(e) {
    //     e.preventDefault();
    //     if (!this.changePasswordValidate.allValid()) {
    //         this.changePasswordValidate.showMessages();
    //         this.forceUpdate();
    //         return false;
    //     }
    //     if (this.state.password !== this.state.confirmPassword) {
    //         window.scrollTo(0, 0);
    //         this.setState({ passwordStatus: false });
    //         return false;
    //     } else {
    //         this.setState({ passwordStatus: true });
    //     }
    //     this.props.setLoading(true);
    //     const userDetails = {
    //         id: this.state.userId,
    //         password: this.state.password,
    //     };
    //     AuthService.changePassword(userDetails)
    //         .then((res) => {
    //             window.scrollTo(0, 0);
    //             this.setState({
    //                 alert: true,
    //                 alertType: 'success',
    //                 alertMsg: res.data.message,
    //                 confirmPassword: '',
    //                 password: '',
    //             });
    //             this.props.setLoading(false);
    //         })
    //         .catch((error) => {
    //             window.scrollTo(0, 0);
    //             this.setState({
    //                 alert: true,
    //                 alertType: 'error',
    //                 alertMsg: 'Something went wrong please try again.',
    //             });
    //             this.props.setLoading(false);
    //         });
    // }
    // handleUserDetailsForm(e) {
    //     e.preventDefault();
    //     if (!this.userDetailsValidate.allValid()) {
    //         this.userDetailsValidate.showMessages();
    //         this.forceUpdate();
    //         return false;
    //     }

    //     this.userDetailsSupply(this.state.image);
    // }

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
        const { alert } = this.state;
        return (
            <>
                <main className=''>
                    <div className=''>
                        <div className="mt-3">
                            <h3 className='revamp-blog-title'>Login details</h3>
                        </div>
                        <div className='row justify-content-center mt-3'>
                            {/* <div className='support-heading'>
                                <h4 className='revamp-blog-title mb-0'>Login details</h4>
                            </div> */}

                            <div className='col-md-8'>
                                {alert.message && alert.type == 'error' && (
                                    <div
                                        className='alert alert-danger alert-dismissible fade show'
                                        role='alert'
                                    >
                                        {alert.message}
                                    </div>
                                )}
                                {alert.message && alert.type == 'success' && (
                                    <div
                                        className='alert alert-success alert-dismissible fade show'
                                        role='alert'
                                    >
                                        {alert.message}
                                    </div>
                                )}
                                {alert && this.state.alertType === 'error' && (
                                    <div className='alert alert-danger alert-dismissible fade show' role='alert'>
                                        {this.state.alertMsg}
                                    </div>
                                )}
                                {alert && this.state.alertType === 'success' && (
                                    <div className='alert alert-success alert-dismissible fade show' role='alert'>
                                        {this.state.alertMsg}
                                    </div>
                                )}
                            </div>
                            <div className='col-md-12 mt-md-0 mt-4'>
                                {/* <h6 className='card-title'>Change login details</h6> */}
                                {/* <div className='tooltipster plantype tooltipstered'>
                                    Login Details
                                </div> */}
                                <form id='usernameForm' onSubmit={this.handleUsernameForm}>
                                    {this.state.usernameAvailability === false && (
                                        <div className='col-sm-8'>
                                            <div
                                                className='alert alert-danger alert-dismissible fade show'
                                                role='alert'
                                            >
                                                <p>Username is already in used.</p>
                                            </div>
                                        </div>
                                    )}
                                    {this.state.passwordStatus === false && (
                                        <div className='alert alert-danger' role='alert'>
                                            <p>Password does not match</p>
                                        </div>
                                    )}
                                    <table className='table table-striped profile-table detail-table border-0'>
                                        <tbody>
                                            <tr>
                                                <th scope='row'>Username:</th>
                                                <td className='py-0'>
                                                    <div className='input-field mt-1'>
                                                        <div className='row'>
                                                            <div className='col-sm-6'>
                                                                <input
                                                                    id='username'
                                                                    autoComplete='new-username'
                                                                    name='username'
                                                                    value={this.state.username}
                                                                    className='pinf m-0 no-border-btm'
                                                                    onChange={this.onUsernameChange}
                                                                    placeholder='Username'
                                                                />
                                                                {this.usernameValidate.message(
                                                                    'username',
                                                                    this.state.username,
                                                                    'required'
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope='row'>Password:</th>
                                                <td className='py-0'>
                                                    <div className='input-field mt-1'>
                                                        <div className='row'>
                                                            <div className='col-sm-6'>
                                                                <input
                                                                    autoComplete='new-password'
                                                                    name='password'
                                                                    value={this.state.password}
                                                                    id='password'
                                                                    type='password'
                                                                    className='pinf m-0 no-border-btm'
                                                                    onChange={this.onChange}
                                                                    placeholder='Password'
                                                                />
                                                                {this.changePasswordValidate.message(
                                                                    'password',
                                                                    this.state.password,
                                                                    'required'
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope='row'>Confirm Password:</th>
                                                <td className='py-0'>
                                                    <div className='input-field mt-1'>
                                                        <div className='row'>
                                                            <div className='col-sm-6'>
                                                                <input
                                                                    id='password1'
                                                                    type='password'
                                                                    name='confirmPassword'
                                                                    className='pinf m-0 no-border-btm'
                                                                    value={this.state.confirmPassword}
                                                                    onChange={this.onChange}
                                                                    placeholder='Confirm password'
                                                                />
                                                                {this.changePasswordValidate.message(
                                                                    'confirmPassword',
                                                                    this.state.confirmPassword,
                                                                    'required'
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {/* {(this.state.btnActive === true || this.state.btnActive2 === true) ? ( */}
                                    <div className='text-right'>
                                        <button className='btn  btn-sm' type='submit'>
                                            Save
                                        </button>
                                    </div>
                                    {/* ) : ''} */}
                                </form>
                                <p className='revamp-para-xs mt-3'>
                                    Please familiarise yourself with our
                                    <Link href='/user/privacy-policy' rel='alternate'>
                                        <a> Privacy Policy</a>
                                    </Link>{' '}
                                    and{' '}
                                    <Link href='/user/terms-of-services' rel='alternate'>
                                        <a>Terms of Services. </a>
                                    </Link>
                                </p>
                            </div >
                        </div >
                    </div >
                </main >
            </>
        );
    }
}
export default Security;
