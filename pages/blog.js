import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { apiRoute, getApiHeader, imagePath } from '../utils/helpers';
// import Blog from '../components/Blog';
import Layout from '../components/Layout'
import FacebookLogin from 'react-facebook-login';
import BlogCoursesSlider from '../components/BlogCoursesSlider';
import BlogUpcomingSlider from '../components/BlogUpcomingSlider';
import Link from 'next/link';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import dynamic from 'next/dynamic'

const Blog = dynamic(
    () => import('../components/Blog'),
    { ssr: false }
  )

const blog = () => {
    
    const[posts,setPosts]=useState([]);
    const [courses, setCourses] = useState({});
    const [upcomingStream, setUpcomingStream] = useState({});
    const[previousBlog,setPreviousBlog]=useState([]);
    const[search,setSearch] = useState([]);
    console.log(posts);
    const getPostdata = () => {
        const requestOptions = {
            headers: getApiHeader(),
        };
        axios
            .get(apiRoute('get-blog-data'), requestOptions)
            .then((res) => {
                setPosts(res.data);

            });
    }
   
    useEffect(()=>{
        const requestOptions = {
            headers: getApiHeader(),
        };

        getPostdata();

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

        const searchBlog = (e) => {
            setSearch(e.target.value);
            const requestOptions = {
                headers: getApiHeader(),
            };
            axios
                .get(apiRoute(`blog-search/${e.target.value}`), requestOptions)
                .then((res) => {
                    setPosts(res.data);
                });     

            }

            const searchBlogButton = () => {
                const requestOptions = {
                    headers: getApiHeader(),
                };
                axios
                    .get(apiRoute(`blog-search/${search}`), requestOptions)
                    .then((res) => {
                        setPosts(res.data);
                    });     
    
                }

            const clearSearch = () => {
                setSearch("");
                getPostdata();
            }

        return (
            <div>
                      <div className="indexLogo">
                <Layout isHome={true}>
                    <section className='inner-banner about-banner blogBanner ' style={{ backgroundImage: `url('/images/banner/blogBanner.jpg' )`, }}>
                   
                        <div className='myContainer text-center text-white blog_bannersNew logo_Image'>
                        {/* <img src='https://wordpress.betadelivery.com/sattvaconnect/img/ban-logo.png' alt='' /> */}
                        <h2 className='sp-posttitle animated-two fadeInUp sp-animation-2 revamp-signature-heading text-center mb-0'>Yogic Lifestyle Blog</h2>
                        <p className='sp-posttitle animated-two fadeInUp sp-animation-2 revamp-banner-para w-60p'>
                            All about Living Enlightenment, Embodying Yoga.
                        </p>
                        </div>
                    </section>

                    {/* <section>
                        <div class="container">
                        <div class="sec-seaches blogSearch">
                            <div class="searchbar-bar d-flex">
                                <div class="searchbar-form">
                                    <input type="text" onChange={searchBlog} placeholder="Search here.." value={search}  name="searchInput" />
                                        <button onClick={searchBlogButton} class="btn btn-sm" type="submit">Search here</button>
                                        </div>
                                        </div>
                                        <div class="btn-searchs btn-series">
                                            <button onClick={clearSearch} class="btn-series-clear btn-floating btn-sm btn-filter" type="button" data-html="true" data-for="custom-color-no-arrow" data-tip="Clear all filters" currentitem="false"><i class="fas fa-times"></i></button>
                                        </div>
                                        <div class="btn-searchs">
                                            <div class="__react_component_tooltip t48125bf2-1a51-4230-a8f6-a468f60e7259 place-top type-dark" id="custom-color-no-arrow" data-id="tooltip">
                                            </div>
                                        </div>
                                </div>
                                
                        </div>
                    </section> */}
                    
                    <section className="sec sec-blog blog-outer-post light-purplebg">
                        <div class="right_member_plan_bg">
                            <div className="blog_outer">
                            <div className="row">

    <div className="col-lg-9">
        <div class="sec-seaches blogSearch mb-4 d-mobile">
        <div class="searchbar-bar d-flex">
            <div class="searchbar-form">
                <input type="text" onChange={searchBlog} placeholder="Search here.." value={search}  name="searchInput" />
                    <button onClick={searchBlogButton} class="btn btn-sm mt-3" type="submit">Search here</button>
                    </div>
                    </div>
                    <div class="btn-searchs btn-series">
                        <button onClick={clearSearch} class="btn-series-clear btn-floating btn-sm btn-filter" type="button" data-html="true" data-for="custom-color-no-arrow" data-tip="Clear all filters" currentitem="false"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="btn-searchs">
                        <div class="__react_component_tooltip t48125bf2-1a51-4230-a8f6-a468f60e7259 place-top type-dark" id="custom-color-no-arrow" data-id="tooltip">
                        </div>
                    </div>
            </div>
        {posts.map((post, index) => (
            <Blog posts={post} />
        ))}
            </div>
            <div className="col-lg-3 blog-right">
            <div class="sec-seaches blogSearch mb-4 d-desktop">
                            <div class="searchbar-bar d-flex">
                                <div class="searchbar-form">
                                    <input type="text" onChange={searchBlog} placeholder="Search here.." value={search}  name="searchInput" />
                                        <button onClick={searchBlogButton} class="btn btn-sm mt-3" type="submit">Search here</button>
                                        </div>
                                        </div>
                                        <div class="btn-searchs btn-series">
                                            <button onClick={clearSearch} class="btn-series-clear btn-floating btn-sm btn-filter" type="button" data-html="true" data-for="custom-color-no-arrow" data-tip="Clear all filters" currentitem="false"><i class="fas fa-times"></i></button>
                                        </div>
                                        <div class="btn-searchs">
                                            <div class="__react_component_tooltip t48125bf2-1a51-4230-a8f6-a468f60e7259 place-top type-dark" id="custom-color-no-arrow" data-id="tooltip">
                                            </div>
                                        </div>
                                </div>
            {previousBlog[0] != 0 || previousBlog[1] != 0 || previousBlog[2] != 0  ?

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
                            <div className="recent-view-blog">{item[0] && item[0].created_at}</div>
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
            : <></>
}

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
                </Layout>
                </div>
            </div>
                        
        );
    }

export default blog;