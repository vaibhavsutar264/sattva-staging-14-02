import React, { Component } from 'react';
import Link from 'next/link';
import NewToSattvaExplore from '../NewToSattvaExplore';

class Footer extends Component {
  render() {
    return (
      <>
        {/* <Recaptcha
			ref={ ref => this.recaptcha = ref }
			sitekey='6LcXXb0ZAAAAAPKkrgEa8LPjOazq4InauFR3azbD'
			onResolved={ () => console.log( 'Human detected.' ) } /> */}
        <footer className='user-footer'>
          <Link href='/user/me'>
            <a className='active'>
              <img src='/images/home.svg' />
              <img src='/images/homeactive.svg' className='active' />
              <span>Home</span>
            </a>
          </Link>
          <Link href='/user/search'>
            <a className='active'>
              <img src='/images/search.svg' />
              <img src='/images/searchactive.svg' className='active' />
              <span>Search</span>
            </a>
          </Link>
          <Link href='/user/explore'>
            <a className='active'>
              <img src='/images/send.svg' />
              <img src='/images/sendactive.svg' className='active' />
              <span>Explore</span>
            </a>
          </Link>
          <Link href='/user/live-stream'>
            <a className='active'>
              <img src='/images/youtube.svg' />
              <img src='/images/youtubeactive.svg' className='active' />
              <span>Live</span>
            </a>
          </Link>
          <Link href='/user/settings'>
            <a className='active'>
              <img src='/images/users.svg' />
              <img src='/images/usersactive.svg' className='active' />
              <span>Profile</span>
            </a>
          </Link>
        </footer>
        <div class="modal fade" id="exploreSattva" tabindex="-1" role="dialog" aria-labelledby="exploreSattva" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <NewToSattvaExplore />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Footer;
