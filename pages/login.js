import React, { Fragment, useEffect, useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import Layout from '../components/Layout';
import Head from 'next/head';
import dynamic from 'next/dynamic';
// import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { apiRoute, getApiHeader } from '../utils/helpers';
import { setLocalStorageAuth } from '../utils/helpers';
import { useRouter } from 'next/router';
import Constants from '../constants/index';
import Link from 'next/link';
import constants from '../constants/index';
const FacebookLogin = dynamic(() => import('react-facebook-login'), {
  ssr: false,
});

const Login = () => {
  const [email, setEmail] = useState(0);
  const [isloggedin, setIsloggedin] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [fb, setFb] = useState(true);
  useEffect(() => {
   
  });

  const router = useRouter();

  

  const fbEvent = () => {
    setFb(false);
  };

 

  return (
    <Fragment>
      <Head>
        <meta charSet='utf-8' />
        <title>
          Login | Unlimited access to hundreds of yoga classes online
        </title>
        <meta
          name='description'
          content='Practice with Sattva Connect today! Find ease and peace, greater joy and love. Sattva Connect is Your Support to an Awakened Life.'
        />
        <meta
          name='keywords'
          content='yoga videos online, yoga for beginners online, online yoga subscription, yoga for beginners, Live yoga classes online'
        />
        <link rel='canonical' href='https://www.sattvaconnect.com/login/' />
      </Head>
      <Layout>
        <div className='t3-wrapper'>
          <main>
            <div className='sec sec-cinfo light-purplebg'>
              <div className='container'>
                <div className='mt-2'>
                  {error && (
                    <div className='alert alert-danger' role='alert'>
                      {errorMessage}
                    </div>
                  )}

                  {isloading && (
                    <div className='preloader-background'>
                      <div className='big sattva_loader active'>
                        <img src={Constants.SITE_URL + '/images/loader.png'} />
                      </div>
                    </div>
                  )}
                </div>
                <div className='row justify-content-center'>
                  <div className='col-md-8 col-sm-12 p-0'>
                    <LoginForm />
                    {/* <button className="btn btn-primary btn-lg" onClick={onLogout} type='button' >Login With Facebook</button> */}

                    <div class='card subscription-card customer-support mt-20'>
                      <h4 className='revamp-subheading'>Not A Member?</h4>
                      <div class='sattva_login_inner_note revamp-para-small'>
                        If you don't have an account please click on the button
                        below.
                      </div>
                      <div class=''>
                        <div class='input-field'>
                          <ul>
                            <li>
                              <Link href='/plans'>
                                <a class='btn btn-lg tt-normal'>Become a Member</a>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section className="email-sec">
          <div className="sec-10 h-auto bg-white">
              <div className="myContainer">
                
                <div className="mail">
                  <div>
                  <h3 className="wow fadeInUp flex-1 mb-1"><span className='quote-writer-text black-text mr-2 tilt'>Download</span> our mobile app!</h3>
                    <p className='revamp-para'>Experience the benefits of a virtual studio<br /> at home and on-the-go with any device.</p>
                  </div>

                    {/* onChange={(e)=>changeSubscribe(e)} */}
                    <div className="app-box">
                  {/* <div className="app-button w-ios">
                    <i class="fab fa-apple"></i>
                    <div className="app-text">
                      <span>Download on the</span>
                      <p>App Store</p>
                    </div>
                  </div> */}
                   <a href='https://play.google.com/store/apps/details?id=com.app.sattvaconnect'
                    target='_blank'>
                      <div className="app-button w-and">
                  <i class="fab fa-google-play"></i>
                    <div className="app-text">
                      <span>GET IT ON</span>
                      <p>Google Play</p>
                    </div>
                  </div>
                    </a>
                  
                </div>
                </div>
              </div>
          </div>
        </section>   
        <section className=' sec-members text-center'>
          <div className="quote-container">
                <div className="quote-box">
                  <div className="quote-text-box">
                    {/* <img src="/images/right-quote.svg" className="right-quote"/> */}
                    <p className='quote-text'><img className='pr-10' src="/images/quote-left.svg" />The meaning of life can be found <br />in the living of life.<img className='pl-10' src="/images/quote-right.svg" /></p>
                    {/* <img src="/images/left-quote.svg" className="left-quote"/> */}
                  </div>
                  <div className="quote-writer">
                    <h5 className='quote-writer-text'>-Anand Mehrotra</h5>
                  </div>
                </div>
            </div>
          </section>
          </main>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Login;
