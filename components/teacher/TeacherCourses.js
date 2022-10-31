import React,{useEffect,useState} from 'react';
import  Link from 'next/link';
import { courseImagePath, getLocalStorageAuth} from '../../utils/helpers';
import Constants from '../../constants/index';
import { encode } from 'js-base64';


function TeacherCourses({course}){
const[auth,setAuth]= useState();
const[isPurchased,setIsPurchased]=useState(false);
const[purchasedCoursesId,setPurchasedCoursesId]=useState(false);


  useEffect(()=>{
    let authdata = getLocalStorageAuth();
    setAuth(authdata);

  
  if(auth){
     purchasedCoursesId = auth.purchased_courses;
     setPurchasedCoursesId(purchasedCoursesId);
     isPurchased = purchasedCoursesId.includes(JSON.stringify(course.id));
     setIsPurchased(isPurchased);
  }
  });

	return(
		<div className="videos-intabs d-flex">
          <div className="card-course-img">
            <img src={courseImagePath(course.image)} className="img-fluid"/>
          </div>
          <div className="card-course-content">
            <div className="course-heading"><h6>{course.title}</h6></div>
            <div className="course-rating">
              <span className="course-price">${course.price}<small>USD</small></span>
              {/*<i className="fas fa-star"></i> <i className="fas fa-star"></i> <i className="fas fa-star"></i> <i className="fas fa-star"></i> <i className="far fa-star"></i>*/}
              <span className="course-duration"><img src="../../../images/calendar.svg" /> { course.duration}   {course.duration_type}</span>
            </div>
            <p>{course.description}</p>
            <strong>Course Benefits</strong>
            <ul className="course-benfits">
              {course.benefits && course.benefits.map((benefit,index) => {
                  return(
                      <li key={index}>{benefit}</li>
                      );
              })}
            </ul>
            <strong>Course Offerings</strong>
            <ul className="course-offer">
             {course.offering && course.offering.map((offer,index) => {
                  return(
                      <li key={index}><i className={offer.class}></i> {offer.name}</li>
                      );
              })}
            </ul>
            {auth == false &&
               <div className="card-course-btns">
                <Link href={Constants.SITE_URL+'/buy_course/'+encode((course.id.toString()))} className="btn btn-sm" id={course.id}>
                 <a> Buy Now</a>
                  </Link>
                <Link href={Constants.SITE_URL+'/gift_course/'+encode((course.id.toString()))} className="btn btn-sm">
                 <a> Gift To Friend</a> 
                  </Link>
                <Link href={Constants.SITE_URL+'/contact-us'} className="btn btn-sm">
                  <a>Contact Us</a>
                  </Link>
              </div>
              }
              {auth !== false &&
               <div className="card-course-btns">
                {isPurchased == true ? 
                <Link href={Constants.SITE_URL+'/user/course-details/'+(course.id)}> 
               <a> className="btn btn-sm" id={course.id}Start Course</a>
               </Link>
                : 
                <Link href={Constants.SITE_URL+'/user/buy_course/'+encode((course.id.toString()))} className="btn btn-sm" id={course.id}>
                  <a>Buy Now</a>
                </Link>
               }
                
                <Link href={Constants.SITE_URL+'/user/gift_course/'+encode((course.id.toString()))} className="btn btn-sm">
                  <a>Gift To Friend </a>
                  </Link>
                <Link href={Constants.SITE_URL+'/user/contact-us'} className="btn btn-sm">
                  <a>Contact Us</a>
                  </Link>
              </div>
              }
          </div>
        </div>
		);
}

export default TeacherCourses;