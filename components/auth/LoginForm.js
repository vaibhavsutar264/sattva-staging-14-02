import React, { Component } from 'react';
import Link from 'next/link';
import router from 'next/router';
import axios from 'axios';
import Constants from '../../constants';
import AuthService from '../../services/authServices';
import SimpleReactValidator from 'simple-react-validator';
import { setLocalStorageAuth, sitePath, apiRoute } from '../../utils/helpers';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router'
// import FbLogin from './FbLog';
// const FbLogin = dynamic(
//   () => import('./FacebookLogin'),
//   {
//     ssr: false,
//   }
// );
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    this.state = {
      username: '',
      password: '',
      error: false,
      errorMessage: false,
      loading: false,
      email: '',
      isloggedin: false,
      isloading: false,
    };
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    const script = document.createElement('script');

    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;

    document.body.appendChild(script);

    let vimeo = localStorage.getItem('videoUrl');
    if (vimeo) {
      axios
        .get('https://vimeo.com/api/oembed.json?url=' + vimeo)
        .then((res) => {
          localStorage.removeItem('videoUrl');
          localStorage.setItem('vimeoId', res.data.video_id);
        })
        .catch((error) => {
          localStorage.removeItem('videoUrl');
          this.props.clearAllAlerts();
        });
    } else {
      localStorage.removeItem('vimeoId');
    }

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
  onLogout = () => {
    window.FB.login(
      (response) => {
        console.log(response);
        FB.api('/me', { fields: 'last_name,first_name,email' }, (response) => {
          console.log(response);
          if (response.id != null) {
            this.setState({ loading: true });
            axios
              .post(apiRoute('subscriber-fb-login'), {
                id: response.id,
              })
              .then((response) => {
                console.log(response.status);
                this.setState({ isloggedin: true });
                localStorage.setItem('auth', JSON.stringify(response.data));
                router.push('/user/me');
              })
              .catch((error) => {
                this.setState({ loading: false });
                this.setState({
                  errorMessage:
                    'Dear User,we cannot find you on our Database, the email or the username on your facebook account is different we recommend you to sign up using facebook,so that from next time you can login directly using facebook,please wait while we redirect you to signup page.',
                });
                this.setState({ error: true });
                setTimeout(() => {
                  router.push('/plans');
                }, 8000);
              });
          } else {
            this.setState({ isloggedin: false });
            localStorage.removeItem('auth');
          }
        });
      },
      { scope: 'public_profile,email' }
    );
  };

  subscriberLogin = (
    username,
    password,
    vimeoId = null,
    courseDetails = false,
    history
  ) => {
    AuthService.subscriberLogin(username, password, vimeoId)
      .then((data) => {
        setLocalStorageAuth(data.data);
        // window.location.reload();
        if(router.query.live){
          router.push('/user/join-live');
        }else if(router.query.dharma){
          router.push('/user/dharma-free-trail');
        }else if(router.query.goto){
          router.push(router.query.goto);
        }
        else {
          router.push('/user/me');
        }
        // if (courseDetails) {
        //   Router.push(
        //     sitePath(
        //       '/buy-course/' +
        //         courseDetails.pageId +
        //         '/' +
        //         courseDetails.courseId
        //     )
        //   );
        // } else {
        //   if (data.data.userDetails.vimeoVideoId) {
        //     Router.push(
        //       sitePath('/video-details/' + data.data.userDetails.vimeoVideoId)
        //     );
        //   } else {
        //     Router.push(sitePath('/user/me'));
        //   }
        // }
        //this.setState({ loading: false });
      })
      .catch((error) => {
        if (error.response && error.response.status) {
          let errorData = error.response.data;
          this.setState({
            errorMessage: errorData.message,
            error: true,
          });
        } else {
          this.setState({
            errorMessage: 'Something Went Wrong, Try Again',
            error: true,
          });
        }
        this.setState({ loading: false });
      });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      this.forceUpdate();
      return false;
    }
    let vimeoId = '';
    if (localStorage.getItem('vimeoId')) {
      vimeoId = localStorage.getItem('vimeoId');
    }
    this.setState({ loading: true });
    this.subscriberLogin(
      this.state.username,
      this.state.password,
      vimeoId,
      this.props.courseDetails,
      this.props.history
    );
  };
  renderProps() {
    console.log('hello');
  }
  render() {
    return (
      <>
        {this.state.loading && (
          <div className='preloader-background'>
            <div className='big sattva_loader active'>
              <img src={Constants.SITE_URL + '/images/loader.png'} />
            </div>
          </div>
        )}
        {this.state.error && (
          <div className='alert alert-danger' role='alert'>
            {this.state.errorMessage}
          </div>
        )}
        <div className='card subscription-card customer-support'>
          <form
            autocomplete='off'
            className='form form-horizontal'
            onSubmit={this.onSubmit}
          >
            <h4 className='revamp-subheading'>Member Login</h4>
            <div className=''>
              <div className='input-field'>
                <label id='username-lbl' htmlFor='username'>
                  Username or Email<span className='required'>&#160;*</span>
                </label>
                <input
                  type='text'
                  name='username'
                  id='username'
                  value={this.state.username}
                  onChange={this.onChange}
                />
                {this.validator.message(
                  'username',
                  this.state.username,
                  'required'
                )}
              </div>
            </div>
            <div className=''>
              <div className='input-field'>
                <label id='password-lbl' htmlFor='password'>
                  Password<span className='required'>&#160;*</span>
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  aria-required='true'
                  value={this.state.password}
                  onChange={this.onChange}
                />
                {this.validator.message(
                  'password',
                  this.state.password,
                  'required'
                )}
              </div>
            </div>
            <div className='login-links'>
              <div className='input-field'>
                <Link href='forgot-password'>
                  <a className='revamp-para-small'>Forgot your password?</a>
                </Link>
              </div>
            </div>
            <div className=''>
              <div className='input-field s12 loginForm-submit-div'>
                <button type='submit' className='btn btn-lg'>
                  Login
                </button>
                <p className='or-text revamp-para-small'>or</p>
                <p>
                  <a
                    onClick={this.onLogout}
                    className='fb-button revamp-para-small'
                    style={{ fontWeight: '500' }}
                  >
                    <img
                      height='45px'
                      width='45px'
                      className='facebook-image mr-3'
                      src={Constants.SITE_URL + '/images/facebook2.png'}
                    />
                    Login with facebook
                  </a>
                </p>
              </div>
            </div>
            <div className='mt-2'>
              {/* <FbLogin/> */}
              {this.state.isloading && (
                <div className='preloader-background'>
                  <div className='big sattva_loader active'>
                    <img src={Constants.SITE_URL + '/images/loader.png'} />
                  </div>
                </div>
              )}
            </div>{' '}
          </form>
        </div>
      </>
    );
  }
}

export default LoginForm;
