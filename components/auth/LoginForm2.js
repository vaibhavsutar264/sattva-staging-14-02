import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Constants from '../../constants';
import AuthService from '../../services/authServices';
import SimpleReactValidator from 'simple-react-validator';
import { setLocalStorageAuth, sitePath, apiRoute } from '../../utils/helpers';
import dynamic from 'next/dynamic';
import FacebookLogin from 'react-facebook-login'
import FbLogin from './FbLog';
import { set } from 'nprogress';
import { useRouter } from 'next/router'


const LoginForm2 = (props) => {
    const router = useRouter();

  const validator = new SimpleReactValidator();

    const [username,setUsername]= useState();
    const [password,setPassword]= useState();
    const [error,setError]= useState(false);
    const [errorMessage,setErrorMessage]= useState(false);
    const [loading,setLoading]= useState(false);
    const [email,setEmail]= useState();
    const [isloggedin,setIsloggedin]= useState(false);
    const [isloading,setIsloading]= useState(false);
    const[name,setName]=useState();

    useEffect(()=>{
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
              props.clearAllAlerts();
            });
        } else {
          localStorage.removeItem('vimeoId');
        }
    });


   const subscriberLogin = (
        username,
        password,
        vimeoId = null,
        courseDetails = false,
        history
      ) => {
        AuthService.subscriberLogin(username, password, vimeoId)
          .then((data) => {
            setLocalStorageAuth(data.data);
            router.push('/user/me');
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
              
              setErrorMessage(errorData.message);
              setError(true);

            } else {
              
              setErrorMessage('Something Went Wrong, Try Again');
              setError(true);
            }
            setLoading(false);
          });
      };

     const onChange = (e) => {
          setName(e.target.value);
      };
    
    const onSubmit = (e) => {
        e.preventDefault();
        if (!validator.allValid()) {
          validator.showMessages();
          forceupdate();
          setErrorMessage('Invalid Username or Password');
          setError(true);
          return false;
        }
        let vimeoId = '';
        if (localStorage.getItem('vimeoId')) {
          vimeoId = localStorage.getItem('vimeoId');
          console.log('setloading before')
        }
        console.log('setloading before')
        setLoading(true);
        console.log('setloading afetr')
        subscriberLogin( 
          username,
          password,
          vimeoId,
          props.courseDetails,
          props.history
        );
      };

    return (
        <div>
            <div className='row justify-content-center'>
        <div className='col-md-8 col-sm-12'>
          {loading && (
            <div className='preloader-background'>
              <div className='big sattva_loader active'>
                <img src={Constants.SITE_URL + '/images/loader.png'} />
              </div>
            </div>
          )}
          {error && (
            <div className='alert alert-danger' role='alert'>
              {errorMessage}
            </div>
          )}
          <div className='card subscription-card customer-support'>
            <form
              autocomplete='off'
              className='form form-horizontal'
              onSubmit={onSubmit}
            >
              <h4>Member Login</h4>
              <div className=''>
                <div className='input-field'>
                  <label id='username-lbl' htmlFor='username'>
                    Username or Email<span className='required'>&#160;*</span>
                  </label>
                  <input
                    type='text'
                    name='username'
                    id='username'
                    value={username}
                    onChange={onChange}
                  />
                  {validator.message(
                    'username',
                    username,
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
                    value={password}
                    onChange={onChange}
                  />
                  {validator.message(
                    'password',
                    password,
                    'required'
                  )}
                </div>
              </div>
              <div className='login-links'>
                <div className='input-field'>
                  <Link href='forgot-password'>
                    <a>Forgot your password?</a>
                  </Link>
                </div>
              </div>
              <div className=''>
                <div className='input-field s12'>
                  <button type='submit' className='btn btn-lg'>
                    LOGIN
                  </button>
                </div>
              </div>
              <div className='mt-2'>
                <FbLogin/>
                {isloading && (
                  <div className='preloader-background'>
                    <div className='big sattva_loader active'>
                      <img src={Constants.SITE_URL + '/images/loader.png'} />
                    </div>
                  </div>
                )}
              </div>{' '}
            </form>
          </div>
          <div class='card subscription-card customer-support mt-20'>
            <h4>Not A Member?</h4>
            <div class='sattva_login_inner_note'>
              If you don't have an account please click on button give below.
            </div>
            <div class=''>
              <div class='input-field'>
                <ul>
                  <li>
                    <Link href='/plans'>
                      <a class='btn btn-lg'>BECOME A MEMBER</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
};

export default LoginForm2;