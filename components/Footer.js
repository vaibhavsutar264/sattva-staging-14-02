import React, { Component, useState } from 'react';
import Link from 'next/link';
import Constants from '../constants';
import { apiRoute } from '../utils/helpers';
import axios from 'axios';
const Footer = () => {

  const [ErrorMsg, SetErrorMsg] = useState(false);
  const[subscribeMsg,SetSubscribeMsg] = useState(false);
 
  const onSubscribe = (e) => {
    e.preventDefault();
    console.log(e.target.email.value);

    axios.get(apiRoute(`mailchimp-subscribe/${e.target.email.value}`))
    .then(function (response) {
      if(response.data.id){
        SetSubscribeMsg("Thanks For subscribing");
        SetErrorMsg(true);
        setTimeout(function(){
          SetErrorMsg(false);
         }, 4000);
      }
      else {
        SetSubscribeMsg("You are already subscribed thank you !");
        SetErrorMsg(true);
        setTimeout(function(){
          SetErrorMsg(false);
         }, 4000);      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }
    return (
      <>
        <footer className='footer_area'>
          <div className='myContainer'>
          
            <div className='mailchaimp-block center-align color-white'>
              <h4>Stay Connected</h4>
              <p>
                Receive weekly inspirations, news, and updates on upcoming Live
                Streams, Sattva events, and new classes and courses added.
              </p>
              <div id='mc_embed_signup'>
                <form
                 onSubmit={onSubscribe}
                >
                  <div id='mc_embed_signup_scroll' className='input-field row'>
                    <div className='mc-field-group input-field col col-md-9 col-12'>
                      <label htmlFor='mce-EMAIL'>Email Address </label>
                      <input
                        type="email"
                        name='email'
                        className='email text-white'
                        id='mce-EMAIL'
                        required
                      />
                    </div>
                    <div className='col col-md-3 col-12 input-field'>
                      <input
                        type='submit'
                        value='Subscribe'
                        name='subscribe'
                        id='mc-embedded-subscribe'
                        className=' btn btn-lg'
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            { ErrorMsg &&
                  <div className="col-5">
                  <div className="alert alert-danger" role="alert">
                      {subscribeMsg}
                    </div>
                    </div>
                }
            <div className='footer-info-block text-white text-lg-left text-center'>
              <div className='row'>
                <div className='col-lg-4 col-md-12 col-sm-12'>
                <div className='footerMobile'>
                  <h4>Mobile App</h4>
                  {/*<a href='javascript:void(0)'>*/}
                    {/* <img src={Constants.SITE_URL + '/images/appstoreNew.png'} /> */}
                  {/*</a>*/}
                  <div className="app-box align-center ">
                  {/* <div className="app-button w-ios btn-bg">
                    <i class="fab fa-apple"></i>
                    <div className="app-text">
                      <span>Download on the</span>
                      <p>App Store</p>
                    </div>
                  </div> */}
                  <a href='https://play.google.com/store/apps/details?id=com.app.sattvaconnect'
                    target='_blank'>
                    <div className="app-button w-and btn-bg">
                      <i class="fab fa-google-play"></i>
                      <div className="app-text">
                        <span>GET IT ON</span>
                        <p>Google Play</p>
                      </div>
                    </div>
                    </a>
                </div>
                  {/* <a href='https://play.google.com/store/apps/details?id=com.app.sattvaconnect'
                    target='_blank'>
                    <img src={Constants.SITE_URL + '/images/playstore.png'} />
                  </a> */}
                </div>
              </div>
                <div className='col-lg-2 col-md-12 col-sm-12 text-center'>
                  <h4>Follow Us</h4>
                  <ul className='socillink-block'>
                    <li>
                      <a target='_blank' href='https://www.facebook.com/sattvaconnect/'>
                        <i className='fa fa-facebook' aria-hidden='true'></i>
                      </a>
                    </li>
                    
                    <li>
                      <a target='_blank' href='https://www.instagram.com/sattvaconnect/' >
                        <i className='fab fa-instagram' aria-hidden='true'></i>
                      </a>
                    </li>
                    {/* <li>
                      <a target='_blank' href='https://in.linkedin.com/in/sattvaconnect' >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li> */}
                    <li>
                      <a target='_blank' href='https://www.pinterest.com/sattvaconnect/' >
                        {/* <i className='fab fa-instagram' aria-hidden='true'></i> */}
                        <i className="fab fa-pinterest"></i>
                      </a>
                    </li>
                    <li>
                      <a target='_blank' href='https://twitter.com/SattvaConnect' >
                        {/* <i className='fab fa-instagram' aria-hidden='true'></i> */}
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='col-lg-3 col-md-12 col-12 emails'>
                  <h4>Contact Us</h4>
                  <a href='mailto:info@sattvaconnect.com'><p>info@sattvaconnect.com</p></a>
                  <a href='mailto:marketing@sattvaconnect.com'><p>marketing@sattvaconnect.com</p></a>
                </div>
                <div className='col-lg-2 offset-lg-1 col-md-12 col-12 adreess'>
                  <h4>Visit Us</h4>
                  <p> Sattva Retreat, Mohan Chatti, Rishikesh, Himalayas - India. </p>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-12 col-md-12 col-sm-12'>
              <div class="text-lg-left text-center line-top">
                    <ul class="foot-links wow fadeInUp footer_linkss">
                        <li>
                          <Link href='/about-us'>
                            <a>About Us</a>
                          </Link>
                        </li>
                        <li>
                          <Link href='/customer-support'>
                            <a>Support</a>
                          </Link>
                        </li>
                        <li>
                          <Link href='/faq'>
                            <a>FAQ</a>
                          </Link>
                        </li>
                        <li>
                          <Link href='/terms-of-services'>
                            <a>Terms of Service</a>
                          </Link>
                        </li>
                        <li>
                          <Link href='/privacy-policy'>
                            <a>Privacy Policy</a>
                          </Link>
                        </li>
                    </ul>
                </div>
            </div>
          </div>
          </div>
        </footer>
        <section className='bottom-footer'>
          <div className='container'>
            <div className='daily-block text-center'>
              <h5></h5>
              <p>
                Your purpose here is to evolve, to transform, to experience your
                radical aliveness, to awaken to your true nature. You are the
                path. The path is you. The time is now.
              </p>
              <span></span>
              <img
                className='logo-img'
                src={Constants.SITE_URL + '/images/footer_logo.png'}
                alt='Footerlog'
              />
              <p className='footer-copyright'>
                Copyright © 2021 Sattva Connect, LLC
              </p>
            </div>
          </div>
        </section>
        <div className='bottom_copyright'>
            <p>Copyright © 2021 Sattva Connect, LLC</p>
        </div>
      </>
    );
  }

export default Footer;
