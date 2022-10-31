import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from 'react-responsive';
import Slider from "react-slick";

 const TestimonialSlider = (props) => {
    var settings2 = {
      arrows:true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      }
      console.log(props.testData);
    return (
        <section>
          <div class="sec-12">
            <div class="myContainer">
              <h2 class="wow fadeInUp revamp-heading">What The Community Is Saying</h2>
              <Slider {...settings2}>
                  {props.testData[0] && props.testData.map((item,index)=>{
                      return(
                        <div>
                          <div class="community">
                            <p class="wow fadeInUp revamp-para"><i>{item.quote}</i></p>
                            <h5 class="wow fadeInUp quote-writer-text black-text">{item.authorName} - <span>{item.authorAddress}</span></h5>
                          </div>
                        </div>
                      )}
                    )} 
              </Slider>
              <div class="join wow fadeInUp"><h4>Join Us on:</h4>
                <a href='https://www.facebook.com/sattvaconnect/' target='_blank'><i class="fa fa-facebook"></i></a>
                <a href='https://www.instagram.com/sattvaconnect/' target='_blank'><i class="fa fa-instagram"></i></a>
                <a href='https://www.pinterest.com/sattvaconnect/' target='_blank'><i class="fab fa-pinterest"></i></a>
                <a href='https://twitter.com/SattvaConnect' target='_blank'><i class="fab fa-twitter"></i></a>
              </div>
            </div>
          </div>
        </section>
    )
}

export default TestimonialSlider;