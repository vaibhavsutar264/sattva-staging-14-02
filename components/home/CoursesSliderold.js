import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';


var settings ={};

 const CoursesSlider = ({coursesData}) => {
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
    const[courseData,setCourseData] = useState([]);
   
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


    return (
        <div>
             <section>
        <div className="sec-7">
            <h1 className="wow fadeInUp">Online Courses</h1>
                <p className="wow fadeInUp">Deepen your knowledge of the yogic teachings and practices. Study at your <br/>
                own convenience, any time, any place. Lifetime access.</p>
            <div className="online-courses_sliders2 wow fadeInUp">
                <Slider {...settings}>
                    {coursesData && coursesData.map((item,index)=>{
                        return (
                            <div className="courses-slider">
                    <img src={item.image}/>
                    <div className="courses-txt">
                    <h5>{item.title}</h5>
                    </div>
                     </div>
                        )
                    }
                    )}
                
                </Slider>
            </div>
            <Link href="/courses">
            <button className="courses-btn wow fadeInUp">
                <a >Own a Course</a>
            </button>
            </Link>
        </div>
        </section>
            
      
        </div>
    )
}
export default CoursesSlider;