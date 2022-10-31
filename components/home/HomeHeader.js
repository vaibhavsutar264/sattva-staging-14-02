import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Constants from '../../constants';
import { getLocalStorageAuth } from '../../utils/helpers';

class HomeHeader extends Component {
  componentDidMount() {
    const userData = getLocalStorageAuth();
    if (userData.access_token) {
      Router.push('/user/me');
    }
    console.log(this.props.about);
  }
  render() {
    return (
      <>
        <header className='home-header'>
          <div className="myContainer">
            <div className='row'>
              <nav className='navbar fixed-top navbar-expand-lg scrolling-navbar w-100'>
                <div className='navbar-brand'></div>
                  <div className='logo-image'>
                    <Link href='/'>
                       {/* <div className='animated fadeInUp img_logo display-none'>
                          <img src={'/images/ban-logo.png'} className='img-fluid'/>
                        </div> */}
                      <a className='lg-w'>
                        {/* <img src={'../images/logo-sattva-white.png'} alt='' /> */}
                        <img src={'/images/ban-logo.png'} className='img-fluid logo-width'/>
                      </a>
                    </Link> 
                    <Link href='/'>
                      <a className='lg-c'>
                        {/* <img className='logo-img' src={'../images/logo-sattva.png'} alt='Sattva Connect'/> */}
                        <img src={'/images/ban-logo.png'} className='img-fluid logo-width' alt='Sattva Connect'/>
                      </a>
                    </Link>
                  </div>
                <button
                  className='navbar-toggler collapsed'
                  type='button'
                  data-toggle='collapse'
                  data-target='#navbar'
                  aria-controls='navbar'
                  aria-expanded='false'
                  aria-label='Toggle navigation'
              >
                <span className='navbar-toggler-icon'></span>
              </button>
              <div className='collapse navbar-collapse' id='navbar'>
                <ul className='navbar-nav ml-auto'>
                  { this.props.about == true ? 
                  <li className='nav-item'>
                  <Link href='/'>
                    <a className='nav-link'>Home</a>
                  </Link>
                </li>
                :
                <li className='nav-item'>
                <Link href='/about-us'>
                  <a className='nav-link'>About Us</a>
                </Link>
              </li>
                  }
                   <li className='nav-item'>
                  <Link href='/courses'>
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
                  <li className='nav-item'>
                    {/* <Link > */}
                      <a href='/login' className='nav-link'>Login</a>
                    {/* </Link> */}
                  </li>
                  <li className='nav-item'>
                    <Link href='/plans'>
                      <a className='nav-link btn signup-btn'>Sign Up</a>
                    </Link>
                  </li>
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

export default HomeHeader;
