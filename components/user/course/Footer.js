import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className='courseFooter'>
        <div className='container text-center'>
          <div className='footerLogo'>
            <img src='/images/footer_logo.png' className='img-fluid' />
          </div>
          <p className='mb-0'>
            Your purpose here is to evolve, to transform, to experience your
            radical aliveness, to awaken to your true nature. You are the path.
            The path is you. The time is now. Questions? Reach out:{' '}
            <a href='mailto:info@sattvaconnect.com' className='textTheme'>
              info@sattvaconnect.com
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
