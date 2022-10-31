import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { apiRoute, getApiHeader, getLocalStorageAuth, imagePath } from '../../utils/helpers';
// import Blog from '../components/Blog';
import Layout from '../../components/user/Layout';
import FacebookLogin from 'react-facebook-login';
import BlogCoursesSlider from '../../components/BlogCoursesSlider';
import BlogUpcomingSlider from '../../components/BlogUpcomingSlider';
import Link from 'next/link';
import router from 'next/router';

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
    () => import('../../components/user/Blog'),
    { ssr: false }
  )

const blog = () => {
    
    const[posts,setPosts]=useState([]);
    const [courses, setCourses] = useState({});
    const [upcomingStream, setUpcomingStream] = useState({});
    const[previousBlog,setPreviousBlog]=useState([]);
    const[search,setSearch] = useState([]);

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

        const getId = getLocalStorageAuth();
        if(!getId.userDetails){
        const ForUrl = router.pathname
        router.push(`/login/?goto=${ForUrl}`);
        return 0;
        }

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
                    {/* <section className='inner-banner about-banner blogBanner login_banner' style={{ backgroundImage: `url('/images/banner/blogBanner.jpg' )`, }}>
                   
                        <div className='myContainer text-center text-white blog_bannersNew logo_Image'>
                        <img src='https://wordpress.betadelivery.com/sattvaconnect/img/ban-logo.png' alt='' />
                        <h2 className='sp-posttitle animated-two fadeInUp sp-animation-2 banner-heading'>Yogic Lifestyle Blog</h2>
                        </div>
                    </section> */}
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
                            <div className="blog_outer login_blog">
                            <div className="row">
                    <div className='col-md-6 col pl-50'>
                      <h4 className='revamp-subtitle'>Yogic Lifestyle Blog</h4>
                    </div>
    <div className="col-lg-9">
    <div class="sec-seaches blogSearch  mb-4 d-mobile">
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
        {posts.map((post, index) => (
            <Blog posts={post} />
        ))}
            </div>
            <div className="col-lg-3 blog-right">
            <div class="sec-seaches blogSearch  mb-4 d-desktop">
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
            {/* {previousBlog[0] != 0 || previousBlog[1] != 0 || previousBlog[2] != 0  ?

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
                            <Link href={`/user/show/${data.slug}`}>
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
} */}

            {/* <BlogCoursesSlider coursesData={courses.courses} />

            <BlogUpcomingSlider streamData={upcomingStream}/> */}



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