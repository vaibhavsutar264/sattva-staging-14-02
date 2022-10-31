import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';


var settings ={};

const BlogCoursesSlider = ({coursesData}) => {
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
   console.log(coursesData);
    if(isDesktopOrLaptop){
        settings = {
         dots: false,
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

    return (
        <>
            <section>
                <div className="sec-7">
                    <h3 className="wow fadeInUp">Featured Courses</h3>
                    {/* <p className="wow fadeInUp">Deepen your knowledge of the yogic teachings and practices. Study at your own<br/>
                    convenience, any time, any place. Lifetime access.</p> */}
                    <div className="featured-course-slider">
                        <div className=" wow fadeInUp">
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
                    </div>
                    <Link href="/courses">
                    <button className="courses-btn   OnlineCoursesBtn wow fadeInUp">
                        <a className='puprleHover_Golden'>View All Courses</a>
                    </button>
                    </Link>
                </div>
            </section>
        </>
    )
}
export default BlogCoursesSlider;