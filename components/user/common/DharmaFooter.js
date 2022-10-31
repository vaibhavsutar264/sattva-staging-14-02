import React from 'react';

function DharmaFooter() {
  return (
    <>
      <section className='sec-quantum'>
        <div className='container'>
          <div className='row'>
            <div
              className='col-md-12'
              data-aos='zoom-in'
              data-aos-duration='1000'
            >
              <p>
                The moment the inspiration comes, the mind starts to interfere,
                because the story of the mind wants to continue. But we must pop
                out of our bubble!
              </p>
              <span className='quantom-text'>MAKE THE QUANTUM LEAP!</span>
            </div>
          </div>
        </div>
      </section>
      <section className='sec-footer'>
        <div className=''>
          <div className='footimg'>
            <img
              className='logo-img'
              src='/images/footer_logo.png'
              alt='Footerlog'
            />
          </div>
          <div className='foot-text'>
            <p>
              Your purpose here is to evolve, to transform, to experience your
              radical aliveness, to awaken to your true nature. You are the
              path. The path is you. The time is now Questions? Reach out:{' '}
              <a href='mailto:info@sattvaconnect.com'>info@sattvaconnect.com</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default DharmaFooter;
