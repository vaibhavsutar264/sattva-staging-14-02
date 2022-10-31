import React, { Component, useEffect, useState } from 'react';
import { apiRoute, getApiHeader, imagePath } from '../utils/helpers';
import axios from 'axios';
import moment from 'moment';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import BlogCoursesSlider from './BlogCoursesSlider';
import BlogUpcomingSlider from './BlogUpcomingSlider'
import {FacebookShareButton,EmailShareButton,TwitterShareButton,WhatsappShareButton, FacebookIcon,  WhatsappIcon,EmailIcon,  TwitterIcon,} from "react-share";
import Constants from '../constants';
import Link from 'next/link';


const Show = ({ post }) => {

    const [courses, setCourses] = useState({});
    const [upcomingStream, setUpcomingStream] = useState({});
    const[previousBlog,setPreviousBlog]=useState([]);

    useEffect(()=>{
        const requestOptions = {
            headers: getApiHeader(),
        };
       
            axios.get(apiRoute('get-courses-data/0'), requestOptions).then((res) => {
                setCourses(res.data);
              });  

              axios.get(apiRoute('get-latest-upcomming-streams'), requestOptions).then((res) => {
                setUpcomingStream(res.data);
              });

              axios.get(apiRoute('get-previous-blog'), requestOptions).then((res) => {
                setPreviousBlog(res.data);
                console.log(res.data);
              });
    },[])


    return (
        <div>
            <section className='inner-banner about-banner blog-inner-bg' style={{ backgroundImage: `url(${post.inner_image})`, }}>
                <div className='container text-center text-white'>
                    <h1>{post.title}</h1>
                    <h2 className='sp-posttitle animated-two fadeInUp sp-animation-2'></h2>
                </div>
            </section>
            <section className='sec sec-blog blog-outer-post blog_innerPg'>
            <div class="right_member_plan_bg">
                <div className='blog_outer login_blog'>  
                    <div  className="row">
                        <div className="col-lg-9">
                            <div className="card card-course">
                                <div className="card-course-img">
                                    <img className="img-fluid" src={post.image} />
                                </div>
                                <div className="card-course-content">
                                    <div className="blog-headings">
                                        <h6 className="react-reveal courseHeading">{post.title}</h6>
                                    </div>
                                    <div class="course-paragraph"
                                    dangerouslySetInnerHTML={{
                                    __html: post.description,
                                    }}
                                    
                                ></div>

                            <div className="card-ft">
                                <h5>{`By - ${post.author}`}</h5>
                                <h5>{`Published Date - ${moment(post.schdedule_date).format("DD-MM-YYYY")}`}</h5>
                            </div>

                                <div className="card-ft-icon mt-3">  
                                            <FacebookShareButton 
                                                url={Constants.SITE_URL + `/show/${post.id}`}
                                                quote={post.title}
                                                hashtag="#sattvayogiclifestyle"
                                                >

                                                <i class="fa fa-facebook" aria-hidden="true"></i>
                                            </FacebookShareButton>

                                            <TwitterShareButton 
                                                url={Constants.SITE_URL + `/show/${post.id}`}
                                                quote={post.title}
                                                hashtag="#sattvayogiclifestyle"
                                                >

                                                <i class="fab fa-twitter"></i>
                                            </TwitterShareButton>

                                            <WhatsappShareButton 
                                                url={Constants.SITE_URL + `/show/${post.id}`}
                                                quote={post.title}
                                                hashtag="#sattvayogiclifestyle"
                                                >
                                                
                                                <i class="fab fa-whatsapp"></i>
                                            </WhatsappShareButton>

                                            <EmailShareButton 
                                                url={Constants.SITE_URL + `/show/${post.id}`}
                                                quote={post.title}
                                                hashtag="#sattvayogiclifestyle"
                                                >

                                                <i class="far fa-envelope"></i>
                                            </EmailShareButton>
                                            </div>   
                                
                                </div>                                                             
                            </div>
                        </div>
                        <div className="col-lg-3 blog-right">                          

                        <div class="months-accordian">
                            <h3 class="wow fadeInUp">Previous Posts</h3>
                        <Accordion
                            allowZeroExpanded={true}
                        >
                    { previousBlog.map((item,index)=>{

                        return (
                            item[0] && item[0].created_at ? 
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        <div className="recent-view-blog">{item[0].created_at}</div>
                                        <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                x='0'
                                                y='0'
                                                fill='#5c1b72'
                                                enableBackground='new 0 0 100 100'
                                                viewBox='0 0 100 125'
                                            >
                                                {' '}
                                                <switch>
                                                {' '}
                                                <g>
                                                    {' '}
                                                    <path d='M71.394 49.187L29.771 19.311a1 1 0 00-1.436 1.333L46.23 50 28.335 79.355a1 1 0 001.436 1.333l41.623-29.876a1 1 0 000-1.625z'></path>{' '}
                                                </g>{' '}
                                                </switch>{' '}
                                            </svg>
                                
                                    </AccordionItemButton>
                                    
                                </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        { item.map((data,key)=>{
                                            return (
                                                <div className="blogs-detailsList">
                                        <Link href={`/show/${data.id}`}>
                                            <a className="blog-details">
                                            <div className='blog-thumb-img'>
                                                <img src={data && data.image} alt='' />
                                            </div>
                                            <div className='blog-title'>
                                                <h2>{data && data.title }</h2>
                                                <strong className="blog-date">{data && data.created_at}</strong>
                                            </div>
                                            </a>
                                            </Link>
                                        </div>
                                            )
                                        })
                                            
                                        }
                                    

                                </AccordionItemPanel>
                        
                            </AccordionItem>
                            :<></>
                        )
                    })
                }
        </Accordion>
             
        </div>

                            <BlogCoursesSlider coursesData={courses.courses} />
                            <BlogUpcomingSlider streamData={upcomingStream}/>

                            <div className='t3-wrapper membership_plan'>
                                <main>
                                    <section className='sec sec-7 sec-inabout'>
                                    <div className=''>
                                        <h3 class="wow fadeInUp">Membership Plans</h3>
                                        <div className='row'>
                                        <div className='col-md-12'>
                                            <div className='plans-container'>
                                            <div className='card center-align'>
                                                <div className=''>
                                                <div className='card-image grey darken-4 '>
                                                    Monthly Plan
                                                </div>
                                                </div>
                                                <div className='osm-item-description clearfix'>
                                                <p className='planP'>
                                                    $21 (70 cents a day for a new you)
                                                </p>
                                                <div className='osm-item-description-text text-center'>
                                                    <p>
                                                    Gain unlimited access to a great variety of
                                                    wisdom, yoga and meditation classes, daily live
                                                    streams from experienced international teachers
                                                    and Enlivening the Spirit, a 5-day retreat from
                                                    the foothills of the Himalayas.
                                                    </p>
                                                </div>
                                                <div className='span12'>
                                                    <p className='purpleText mb-3  text-center'>
                                                    <i>14 days free trial, cancel anytime</i>
                                                    </p>
                                                </div>
                                                <div className='card-action text-center'>
                                                    <a href='/user-registration/2' className='btn btn-lg'>
                                                        Start your free trial now
                                                    </a>
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className='col-md-12 mt-20'>
                                            <div className='plans-container'>
                                            <div className='card center-align'>
                                                <div className=''>
                                                <div className='card-image grey darken-4 '>
                                                    Yearly Plan
                                                </div>
                                                </div>
                                                <div className='osm-item-description clearfix'>
                                                <p className='planP'>
                                                    $210 (50 cents a day for a new you)
                                                </p>
                                                <div className='osm-item-description-text text-center'>
                                                    <p>
                                                    Commit to yourself for a year and get an
                                                    additional 2 months free. Gain unlimited access to
                                                    a great variety of wisdom, yoga and meditation
                                                    classes, daily live streams from experienced
                                                    international teachers and Enlivening the Spirit,
                                                    a 5-day retreat from the foothills of the
                                                    Himalayas.
                                                    </p>
                                                </div>
                                                <div className='span12'>
                                                    <p className='purpleText mb-3  text-center'>
                                                    <i>14 days free trial, cancel anytime</i>
                                                    </p>
                                                </div>
                                                <div className='card-action text-center'>
                                                    <a href='/user-registration/5' className='btn btn-lg'>
                                                        Start your free trial now
                                                    </a>
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </section>
                                </main>
                            </div>

                        </div>
                    </div>
                </div>
                </div>
            </section>
        </div>
    );
}

export default Show;