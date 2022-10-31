import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import moment from 'moment';


var settings ={};

 const UpcomingStreamSlider = (props) => {
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
   
    if(isDesktopOrLaptop){
        settings = {
         dots: false,
         infinite: true,
         speed: 500,
         slidesToShow: 3,
         slidesToScroll: 3,
         autoplay:true

       }
     }else{
        settings = {
         dots: false,
         infinite: true,
         speed: 500,
         slidesToShow: 1,
         slidesToScroll: 1,
         autoplay:true

       }
    }
    console.log(props.streamData);


    return (
        <div>
             <section>
        <div className="sec-7">
        <h1 class="wow fadeInUp">Practice Live Together</h1>
                  <p class="wow fadeInUp">Meet us for live satsang, kirtan, guided meditations and other yogic practices. Master teachers broadcasting daily from all <br/>over the world. As we practice together, we elevate our energy and rise higher. Be inspired. Live inspired.</p>
              <div class="online-courses_sliders2 wow fadeInUp">
                <Slider {...settings}>
                    {props.streamData[0] && props.streamData.map((item,index)=>{
                        return (
                            <div className="courses-slider">
                    <img src={item.image}/>
                    <div className="courses-txt">
                    <h5>{item.event}</h5>
                    <p>{moment(item.schedule[0]).format("MMMM Do YYYY")}{" "}</p>
                    </div>
                     </div>
                        )
                    }
                    )}
                
                </Slider>
            </div>
            <Link href="/upcoming-stream">
              <button class="courses-btn live wow fadeInUp">
                  <a>View Live Stream Calendar</a>
              </button>
              </Link>
              <Link href="/upcoming-stream">
              <button class="courses-btn live wow fadeInUp">
                  <a>Join Live Stream</a>
              </button>
              </Link>
          </div>
        </section>
            
      
        </div>
    )
}
export default UpcomingStreamSlider;