import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';


var settings ={};

const CoursesSlider = ({coursesData, title} ) => {
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
   
    if(isDesktopOrLaptop){
        settings = {
         dots: false,
         infinite: true,
         speed: 500,
         slidesToShow: 3,
         slidesToScroll: 1,
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
        <>
            <section class="online-course-sec">
                <div className="sec-7  coursesSlider">
                    <div className="myContainer">
                    <h1 className="wow fadeInUp revamp-heading">{ title ? title : 'Online Courses'}</h1>
                    <p className="wow fadeInUp revamp-para">Deepen your knowledge of Yoga through a variety of courses. Lifetime Access. Study at your own pace.<br /> Be inspired. Live inspired. Sattva Connect – because you are interested in living an Inspired Life!</p>
                    {/* <div className="myContainer"> */}
                        <div className="online-courses_sliders2 wow fadeInUp">
                            <Slider {...settings}>
                                {coursesData && coursesData.map((item,index)=>{
                                        return (
                                            <Link href={'course_details/'+ btoa(item.id)}>
                                            <a>
                                <div className="courses-slider">
                                    <img src={item.overview_image}/>
                                    <div className="courses-txt">
                                        <h5>{item.title}</h5>
                                    </div>
                                </div>
                                </a>
                                </Link>
                                )}
                            )}
                            </Slider>
                        </div>
                    {/* </div> */}
                    <Link href="/courses">
                    <button className="courses-btn   OnlineCoursesBtn wow fadeInUp">
                        <a className='puprleHover_Golden'>View All Courses</a>
                    </button>
                    </Link>
                    </div>
                    
                </div>
            </section>
        </>
    )
}
export default CoursesSlider;