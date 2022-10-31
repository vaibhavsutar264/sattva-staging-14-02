import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import moment from 'moment';


var settings ={};

 const BlogUpcomingSlider = (props) => {
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
   
    if(isDesktopOrLaptop){
        settings = {
         dots: false,
         prevArrow: false,
         nextArrow: false,
         infinite: true,
         speed: 500,
         slidesToShow: 3,
         slidesToScroll: 1,
         autoplay:true,
         fade:true
         
        
       }
     }else{
        settings = {
         dots: false,
         infinite: true,
         speed: 500,
         slidesToShow: 1,
         slidesToScroll: 1,
         autoplay:true,
         fade:true
        
         
       }
    }
    console.log(props.streamData);

    useEffect(()=>{
        console.log(Date());
        // console.log(props.streamData[0].schedule[0]);
        if(props.streamData[0]){
            console.log(props.streamData[0].schedule[0]);
        }
    },[])

    return (
        <>
        <section>
            <div className="sec-7 practice_liveTogther">
                <h3 class="wow fadeInUp">Practice Live Together</h3>
                {/* <p class="wow fadeInUp">Meet us for live satsang, kirtan, guided meditations and other yogic practices. Master teachers broadcasting daily from all over the world. As we practice together, we elevate our energy and rise higher. Be inspired. Live inspired.</p> */}
                <div className="">
                    <div class="online-courses_sliders2 wow fadeInUp">
                        <Slider {...settings}>
                            {props.streamData[0] && props.streamData.map((item,index)=>{
                                return (
                                    item.image != null ?
                                    <div className="courses-slider">
                                        <img src={item.image}/>
                                        <div className="courses-txt">
                                            <h5>{item.event} with {item.name}</h5>
                                        <p>{item.schedule[0]}{" "}</p>
                                        </div>
                                    </div>
                                    : null
                                )}
                            )}
                        </Slider>
                    </div>
                </div>
                <Link href="/upcoming-stream">
                <button class="courses-btn live wow fadeInUp">
                    <a class='puprleHover_Golden'>View Live Stream Calendar</a>
                </button>
                </Link>
                <Link href={{
                    pathname:'/login',
                    query:{live : true},
                }}>               
                 <button class="courses-btn live wow fadeInUp">
                    <a class='puprleHover_Golden'>Join Live Stream</a>
                </button>
                </Link>
            </div>
        </section>
            
      
        </>
    )
}
export default BlogUpcomingSlider;