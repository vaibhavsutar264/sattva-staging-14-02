import React, { useState, useEffect, Fragment } from 'react';

import axios from 'axios';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { apiRoute, getApiHeader } from '../../utils/helpers';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialVideo, setTestimonialVideo] = useState('');
  useEffect(() => {
    const requestOptions = {
      headers: getApiHeader(),
    };
    axios.get(apiRoute('cms-all-testimonials'), requestOptions).then((res) => {
      setTestimonials(res.data);
    });
  }, []);
  return (
    <Fragment>
      {testimonials && testimonials.length !== 0 ? (
        <section className='sec sec-testimonial text-center'>
          <div className='container'>
            <h2>What The Community Is Saying</h2>
            <OwlCarousel id='sattvatestimonial' className='owl-carousel owl-theme testimonial-block' nav={true} items={1} dots={false} >
              {testimonials.map((item, index) => { 
                return (
                  <div className='row item align-items-center justify-content-center' key={index} >
                    <div className='col-lg-5 col-md-5 col-sm-12'>
                      <a className='modal-trigger img-fluid' data-toggle='modal' data-target='#testimonial' data-backdrop='static' data-keyboard='false' onClick={() => setTestimonialVideo(item.videoLink)} >
                        <img src={item.image} alt='' />
                      </a>
                    </div>
                    <div className='col-lg-5 col-md-5 col-sm-12 text-left'>
                      <p>{item.quote}</p>
                      <h4> {item.authorName}, {item.authorAddress}</h4>
                      <span></span>
                    </div>
                  </div>
                );
              })}
            </OwlCarousel>
          </div>
        </section>
      ) : (
        ''
      )}
      <div className='modal fade iframe-modal' id='testimonial' tabindex='-1' role='dialog' aria-labelledby='testimonial2Title' aria-hidden='true' >
        <div className='modal-dialog modal-lg modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>
                &times;
              </button>
            </div>
            <div className='modal-body'>
              <iframe className='ifmplayer' src={testimonialVideo} frameborder='0' width='100%'
                height='480' ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Testimonials;
