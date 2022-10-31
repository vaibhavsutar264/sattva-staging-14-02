import React, { Component } from 'react';
import Link from 'next/link';
import Constants from '../constants';
import Router from 'next/router';
import { getLocalStorageAuth } from '../utils/helpers';

class Header extends Component {
  componentDidMount() {
    const userData = getLocalStorageAuth();
    if (userData.access_token) {
      Router.push('/user/me');
    }
  }

  render() {
    return (
      <>
        <header className=''>
          <div className="myContainer">
            <div className="row">
            <nav className='navbar fixed-top navbar-expand-lg scrolling-navbar w-100'>
            <div className='navbar-brand'>
              <div className='logo-img'>
                <Link href='/'>
                  <a className='lg-w'>
                    <img
                      className='img-fluid logo-width'
                      src={Constants.SITE_URL + '/images/ban-logo.png'}
                      alt=''
                    />
                  </a>
                </Link>
                <Link href='/'>
                  <a className=''>
                    <img
                      className='img-fluid logo-width'
                      src={Constants.SITE_URL + '/images/ban-logo.png'}
                      alt='Sattva Connect'
                    />
                  </a>
                </Link>
              </div>
            </div>
            <button className='navbar-toggler collapsed' type='button' data-toggle='collapse' data-target='#navbar' aria-controls='navbar'  aria-expanded='false' aria-label='Toggle navigation'>
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbar'>
              <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                  <Link href={'/about-us'}>
                    <a className='nav-link'>About Us</a>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link href={'/courses'}>
                    <a className='nav-link'>Courses</a>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link href='/upcoming-stream'>
                    <a className='nav-link'>Live</a>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link href='/blog'>
                    <a className='nav-link'>Blog</a>
                  </Link>
                </li>
                {/* <li className='nav-item'>
                  <Link href={'/upcoming-stream'}>
                    <a className='nav-link'>Live Stream</a>
                  </Link>
                </li> */}
                {/* <li className='nav-item'>
                  <Link href={'/courses'}>
                    <a className='nav-link'>Courses</a>
                  </Link>
                </li> */}
                <li className='nav-item'>
                  {/* <Link > */}
                    <a href={'/login'} className='nav-link'>Login</a>
                  {/* </Link> */}
                </li>
                <li className='nav-item'>
                  {/* <Link href={'/plans'}> */}
                    <a href={'/plans'} className='nav-link btn signup-btn'>Sign Up</a>
                  {/* </Link> */}
                </li>
                {/* <li className='nav-item playstoreLink'>
                  <a
                    href='https://play.google.com/store/apps/details?id=com.app.sattvaconnect'
                    target='_blank'
                    className='nav-link pl-0'
                  >
                    <img src={Constants.SITE_URL + '/images/playstore.png'} />
                  </a>
                </li> */}
              </ul>
            </div>
          </nav>
            </div>
          </div>
        
        </header>
      </>
    );
  }
}

export default Header;
