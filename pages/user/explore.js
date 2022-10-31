import React, { Component } from 'react';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});
import Link from 'next/link';
import {
  apiRoute,
  getApiHeader,
  getUserId,
  getLocalStorageAuth,
} from '../../utils/helpers';

import VideoDetails from '../../components/user/VideoDetails';
import CourseOverView from '../../components/user/course/CourseOverView';
import VideoDetailsMobile from '../../components/user/VideoDetailsMobile';
import CourseOverViewMobile from '../../components/user/course/CourseOverViewMobile';
import Layout from '../../components/user/Layout';
import { SearchContext } from '../../components/user/ContextSearch';
import router from 'next/router';

export default class Explore extends Component {
  static contextType = SearchContext;

  constructor(props) {
    super(props);
    this.state = {
      asanaLab: [],
      pranayamaLab: [],
      kriyaLab: [],
      mantraLab: [],
      newlyAdded: [],
      allStyles: [],
      myCourses: [],
      availableCourse: [],
      loading: true,
      accessDetails: []
    };
  }

  componentDidMount() {
    const userId = getUserId(this.props.history);
    const getId = getLocalStorageAuth();
    if (!getId.userDetails) {
      const ForUrl = router.pathname
      router.push(`/login/?goto=${ForUrl}`);
      return 0;
    }
    const auth = getLocalStorageAuth();
    if (auth) {
      var hasSubscription = auth.userDetails.has_subscription;
    } else {
      var hasSubscription = '0';
    }

    const requestOptions = {
      headers: getApiHeader(true),
    };


    axios
      .get(apiRoute('get-teacher-access/' + btoa(userId)), requestOptions)
      .then((res) => {
        this.setState({ accessDetails: res.data });
      });

    axios
      .get(
        apiRoute('user-dashboard/get-style-videos/' + 4 + '/' + 0 + '/' + 4),
        requestOptions
      )
      .then((res) => {
        if (res.data) {
          this.setState({ asanaLab: res.data.videos });
        }
        this.setState({ loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });

    axios
      .get(
        apiRoute('user-dashboard/get-style-videos/' + 5 + '/' + 0 + '/' + 4),
        requestOptions
      )
      .then((res) => {
        if (res.data) {
          this.setState({ pranayamaLab: res.data.videos });
        }
      });

    axios
      .get(
        apiRoute('user-dashboard/get-style-videos/' + 7 + '/' + 0 + '/' + 4),
        requestOptions
      )
      .then((res) => {
        if (res.data) {
          this.setState({ kriyaLab: res.data.videos });
        }
      });

    axios
      .get(
        apiRoute('user-dashboard/get-style-videos/' + 11 + '/' + 0 + '/' + 4),
        requestOptions
      )
      .then((res) => {
        if (res.data) {
          this.setState({ mantraLab: res.data.videos });
        }
      });

    axios
      .get(
        apiRoute('user-dashboard/get-all-videos/' + 0 + '/' + 4),
        requestOptions
      )
      .then((res) => {
        if (res.data) {
          this.setState({ newlyAdded: res.data.videos });
        }
      });

    axios
      .get(apiRoute('user-dashboard/get-all-videos-style'), requestOptions)
      .then((res) => {
        if (res.data) {
          this.setState({ allStyles: res.data });
        }
      });
    axios
      .get(apiRoute('my-courses/' + userId + '/' + 0), requestOptions)
      .then((res) => {
        if (hasSubscription == '1') {
          let allCourses = [...res.data.courses, ...res.data.freeCourses];
          var myAllCourses = allCourses.filter(
            (v, i, a) => a.findIndex((t) => t.id === v.id) === i
          );
        } else {
          let allCourses = res.data.courses;
          var myAllCourses = allCourses.filter(
            (v, i, a) => a.findIndex((t) => t.id === v.id) === i
          );
        }
        this.setState({ myCourses: myAllCourses });
      });

    axios
      .get(
        apiRoute('user-available-courses/' + userId + '/' + 0),
        requestOptions
      )
      .then((res) => {
        if (hasSubscription == '1') {
          var myArray = res.data.courses;
          var toRemove = res.data.freeCourses;
          for (var i = myArray.length - 1; i >= 0; i--) {
            for (var j = 0; j < toRemove.length; j++) {
              if (myArray[i] && myArray[i].id === toRemove[j].id) {
                myArray.splice(i, 1);
              }
            }
          }
          console.log(myArray);
          var allAvailableCourse = myArray;
        } else {
          var allAvailableCourse = res.data.courses;
        }
        this.setState({ availableCourse: allAvailableCourse });
      });


    let { si, st } = this.context;
    st('');

    window.scrollTo(0, 0);
  }
  getShortWord = (str) => {
    var matches = str.match(/\b(\w)/g);
    var acronym = matches.join('');
    return acronym;
  };

  render() {
    return (
      <Layout loading={this.state.loading}>
        <main className='admin-content light-purplebg'>
          <section className='sec sec-explore pb-0'>
            <div className='container'>
              <h4 className='h4-style mb-md-5 mb-4'>Browse By Style</h4>
              <div className='row'>
                {this.state.allStyles.map((item, index) => {
                  return (
                    <div className='col-xl-3 col-lg-3 col-md-3 col-sm-6 user-list'>
                      <Link
                        href={{
                          pathname: '/user/search/',
                          query: { style: item.id },
                        }}
                      >
                        <a>
                          <div className='avatar-me-wrapper'>
                            <span className='avatar-me'>
                              {this.getShortWord(item.type)}
                            </span>
                            <strong className='user-name'>{item.type}</strong>
                          </div>
                        </a>
                      </Link>
                    </div>
                  );
                })}
                {this.state.accessDetails && this.state.accessDetails.status == 1 ?
                  <div className='col-xl-3 col-lg-3 col-md-3 col-sm-6 user-list'>
                    <Link
                      href={{
                        pathname: '/user/search/',
                        query: { exclusive: 'true' },
                      }}
                    >
                      <a>
                        <div className='avatar-me-wrapper'>
                          <span className='avatar-me'>
                            {this.getShortWord('Sattva Yoga Academy')}
                          </span>
                          <strong className='user-name'>
                            Sattva Yoga Academy
                          </strong>
                        </div>
                      </a>
                    </Link>
                  </div>
                  : <></>
                }


              </div>
            </div>
          </section>
          <section className='sec sec-style sec-desktop'>
            <div className='container'>
              <div className='class-block mt-0'>
                <h4 className=' revamp-subtitle'>Asana Lab</h4>
                <div className='row'>
                  {this.state.asanaLab.map((item, index) => {
                    return <VideoDetails item={item} key={item.id} />;
                  })}
                </div>
                {this.state.asanaLab.length > 3 ? (
                  <div className='text-right'>
                    <Link href='/user/asana-lab'>
                      <a className='btn btn-sm'>View All</a>
                    </Link>
                  </div>
                ) : null}
                {this.state.asanaLab.length == 0 ? (
                  <div className='card-panel valign-wrapper grey lighten-4'>
                    <div className='row'>
                      <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center'>
                        No data found in this category.
                      </div>
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center'>
                        <Link className='btn btn-sm' href='/user/search'>
                          <a className='btn btn-sm'>Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className='class-block'>
                <h4 className=' revamp-subtitle'>Pranayama Lab</h4>
                <div className='row'>
                  {this.state.pranayamaLab.map((item, index) => {
                    return <VideoDetails item={item} key={item.id} />;
                  })}
                </div>
                {this.state.pranayamaLab.length > 3 ? (
                  <div className='text-right'>
                    <Link className='btn btn-sm' href='/user/prayanama-lab'>
                      <a className='btn btn-sm'>View All</a>
                    </Link>
                  </div>
                ) : null}
                {this.state.pranayamaLab.length == 0 ? (
                  <div className='card-panel valign-wrapper grey lighten-4'>
                    <div className='row'>
                      <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center'>
                        No data found in this category.
                      </div>
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 mt-md-0 mt-3 text-center'>
                        <Link className='btn btn-sm' href='/user/search'>
                          <a className='btn btn-sm'>Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className='class-block'>
                <h4 className=' revamp-subtitle'>Kriya Lab</h4>
                <div className='row'>
                  {this.state.kriyaLab.map((item, index) => {
                    return <VideoDetails item={item} key={item.id} />;
                  })}
                </div>
                {this.state.kriyaLab.length > 3 ? (
                  <div className='text-right'>
                    <Link className='btn btn-sm' href='/user/kriya-lab'>
                      <a className='btn btn-sm'>View All</a>
                    </Link>
                  </div>
                ) : null}
                {this.state.kriyaLab.length == 0 ? (
                  <div className='card-panel valign-wrapper grey lighten-4'>
                    <div className='row'>
                      <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center'>
                        No data found in this category.
                      </div>
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 mt-md-0 mt-3 text-center'>
                        <Link className='btn btn-sm' href='/user/search'>
                          <a className='btn btn-sm'>Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className='class-block'>
                <h4 className=' revamp-subtitle'>Mantra Lab</h4>
                <div className='row'>
                  {this.state.mantraLab.map((item, index) => {
                    return <VideoDetails item={item} key={item.id} />;
                  })}
                </div>
                {this.state.mantraLab.length > 3 ? (
                  <div className='text-right'>
                    <Link className='btn btn-sm' href='/user/mantra-lab'>
                      <a className='btn btn-sm'>View All</a>
                    </Link>
                  </div>
                ) : null}
                {this.state.mantraLab.length == 0 ? (
                  <div className='card-panel valign-wrapper grey lighten-4'>
                    <div className='row'>
                      <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center'>
                        No data found in this category.
                      </div>
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 mt-md-0 mt-3 text-center'>
                        <Link className='btn btn-sm' href='/user/search'>
                          <a className='btn btn-sm'>Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className='class-block'>
                <h4 className=' revamp-subtitle'>Newly Added Videos</h4>
                <div className='row'>
                  {this.state.newlyAdded.map((item, index) => {
                    return <VideoDetails item={item} key={item.id} />;
                  })}
                </div>
                {this.state.newlyAdded.length > 3 ? (
                  <div className='text-right'>
                    <Link className='btn btn-sm' href='/user/new-videos'>
                      <a className='btn btn-sm'>View All</a>
                    </Link>
                  </div>
                ) : null}
                {this.state.newlyAdded.length == 0 ? (
                  <div className='card-panel valign-wrapper grey lighten-4'>
                    <div className='row'>
                      <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center'>
                        No data found in this category.
                      </div>
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 mt-md-0 mt-3 text-center'>
                        <Link className='btn btn-sm' href='/user/search'>
                          <a className='btn btn-sm'>Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className='class-block mb-0'>
                <h4 className='revamp-subtitle'>My courses</h4>
                <div className='row'>
                  {this.state.myCourses.map((item, index) => {
                    return (
                      <CourseOverView
                        item={item}
                        key={item.id}
                        isPurchased='1'
                      />
                    );
                  })}
                </div>
                {this.state.myCourses.length > 3 ? (
                  <div className='text-right'>
                    <Link className='btn btn-sm' href='/user/my-courses'>
                      <a className='btn btn-sm'>View All</a>
                    </Link>
                  </div>
                ) : null}
                {this.state.myCourses.length == 0 ? (
                  <div className='card-panel valign-wrapper grey lighten-4'>
                    <div className='row'>
                      <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center'>
                        No data found in this category.
                      </div>
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center'>
                        <Link className='btn btn-sm' href='/user/my-courses'>
                          <a className='btn btn-sm'>Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className='class-block mb-0'>
                <h4 className='revamp-subtitle'>Other Featured Course Available</h4>
                <div className='row'>
                  {this.state.availableCourse.map((item, index) => {
                    return (
                      <CourseOverView
                        item={item}
                        key={item.id}
                        isPurchased='0'
                      />
                    );
                  })}
                  <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6'>
                    <a
                      href='https://courses.sattvaconnect.com/course_details/MQ=='
                      target='_blank'
                    >
                      <div className='hoverable card'>
                        <img
                          className='img-fluid'
                          src='/images/roadtodharmaImG_oct.jpg'
                        />
                        <div className='card-content'>
                          <span
                            className='card-title'
                            data-html={true}
                            data-for='custom-color-no-arrow'
                            data-tip='The Road To Dharma'
                          >
                            The Road To Dharma
                          </span>
                          <ReactTooltip
                            id='custom-color-no-arrow'
                            className='react-tooltip card-title-tooltip'
                            delayHide={1000}
                            textColor='#FFF'
                            backgroundColor='#5c1b72'
                            effect='solid'
                          />
                          <p className='pop'>
                            Now through the power of The Road to Dharma
                            DocuSeries, combined with an Online Course, we can
                            fully engage in this quest of LIVING A LIFE OF
                            FREEDOM. The ten-episode DocuSeries inspires us like
                            only a story can, with an adventure to four
                            Himalayan sacred sites, that reveal secrets of
                            FREEDOM.
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className='text-right'>
                  <Link className='btn btn-sm' href='/user/my-courses'>
                    <a className='btn btn-sm'>View All</a>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section className='sec sec-mobile'>
            <div className='class-block mt-0'>
              <div className='container class-block-header'>
                <h4 className=' revamp-subtitle'>Asana Lab</h4>
                {this.state.asanaLab.length > 1 ? (
                  <Link className='btn btn-sm' href='/user/asana-lab'>
                    <a className='btn btn-sm'>View All</a>
                  </Link>
                ) : null}
              </div>

              {this.state.asanaLab.length == 0 ? (
                <div className='container'>
                  <div className='card-panel valign-wrapper grey lighten-4'>
                    <div className='row'>
                      <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center'>
                        No data found in this category.
                      </div>
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center'>
                        <Link className='btn btn-sm' href='/user/search'>
                          <a className='btn btn-sm'>Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // <OwlCarousel
                //   className='owl-theme'
                //   margin={10}
                //   nav={false}
                //   items={2}
                //   stagePadding={15}
                //   dots={false}
                // >
                <div
                  id='carousel-example-2'
                  className='carousel videoCarousel slide carousel-fade'
                  data-ride='carousel'
                >
                  <div className='carousel-inner' role='listbox'>
                    {this.state.asanaLab.map((item, index) => {
                      return (
                        <VideoDetailsMobile
                          item={item}
                          key={item.id}
                          index={index}
                        />
                      );
                    })}
                    {/* </OwlCarousel> */}
                  </div>
                </div>
              )}
            </div>
            <div className='class-block'>
              <div className='container class-block-header'>
                <h4 className=' revamp-subtitle'>Pranayama Lab</h4>
                {this.state.pranayamaLab.length > 1 ? (
                  <Link className='btn btn-sm' href='/user/prayanama-lab'>
                    <a className='btn btn-sm'>View All</a>
                  </Link>
                ) : null}
              </div>

              {this.state.pranayamaLab.length == 0 ? (
                <div className='container'>
                  <div className='card-panel valign-wrapper grey lighten-4'>
                    <div className='row'>
                      <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center'>
                        No data found in this category.
                      </div>
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 mt-md-0 mt-3 text-center'>
                        <Link className='btn btn-sm' href='/user/search'>
                          <a className='btn btn-sm'>Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  id='carousel-example-2'
                  className='carousel videoCarousel slide carousel-fade'
                  data-ride='carousel'
                >
                  <div className='carousel-inner' role='listbox'>
                    {this.state.pranayamaLab.map((item, index) => {
                      return (
                        <VideoDetailsMobile
                          item={item}
                          key={item.id}
                          index={index}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className='class-block'>
              <div className='container class-block-header'>
                <h4 className=' revamp-subtitle'>Kriya Lab</h4>
                {this.state.kriyaLab.length > 1 ? (
                  <Link className='btn btn-sm' href='/user/kriya-lab'>
                    <a className='btn btn-sm'>View All</a>
                  </Link>
                ) : null}
              </div>

              {this.state.kriyaLab.length == 0 ? (
                <div className='container'>
                  <div className='card-panel valign-wrapper grey lighten-4'>
                    <div className='row'>
                      <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center'>
                        No data found in this category.
                      </div>
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 mt-md-0 mt-3 text-center'>
                        <Link className='btn btn-sm' href='/user/search'>
                          <a className='btn btn-sm'>Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  id='carousel-example-2'
                  className='carousel videoCarousel slide carousel-fade'
                  data-ride='carousel'
                >
                  <div className='carousel-inner' role='listbox'>
                    {this.state.kriyaLab.map((item, index) => {
                      return (
                        <VideoDetailsMobile
                          item={item}
                          key={item.id}
                          index={index}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className='class-block'>
              <div className='container class-block-header'>
                <h4 className=' revamp-subtitle'>Mantra Lab</h4>
                {this.state.mantraLab.length > 1 ? (
                  <Link className='btn btn-sm' href='/user/mantra-lab'>
                    <a className='btn btn-sm'>View All</a>
                  </Link>
                ) : null}
              </div>
              {this.state.mantraLab.length == 0 ? (
                <div className='container'>
                  <div className='card-panel valign-wrapper grey lighten-4'>
                    <div className='row'>
                      <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center'>
                        No data found in this category.
                      </div>
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 mt-md-0 mt-3 text-center'>
                        <Link className='btn btn-sm' href='/user/search'>
                          <a className='btn btn-sm'>Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  id='carousel-example-2'
                  className='carousel videoCarousel slide carousel-fade'
                  data-ride='carousel'
                >
                  <div className='carousel-inner' role='listbox'>
                    {this.state.mantraLab.map((item, index) => {
                      return (
                        <VideoDetailsMobile
                          item={item}
                          key={item.id}
                          index={index}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className='class-block'>
              <div className='container class-block-header'>
                <h4 className=' revamp-subtitle'>Newly Added Videos</h4>
                {this.state.newlyAdded.length > 1 ? (
                  <Link className='btn btn-sm' href='/user/new-videos'>
                    <a className='btn btn-sm'>View All</a>
                  </Link>
                ) : null}
              </div>

              {this.state.newlyAdded.length == 0 ? (
                <div className='container'>
                  <div className='card-panel valign-wrapper grey lighten-4'>
                    <div className='row'>
                      <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center'>
                        No data found in this category.
                      </div>
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 mt-md-0 mt-3 text-center'>
                        <Link className='btn btn-sm' href='/user/search'>
                          <a className='btn btn-sm'>Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  id='carousel-example-2'
                  className='carousel videoCarousel slide carousel-fade'
                  data-ride='carousel'
                >
                  <div className='carousel-inner' role='listbox'>
                    {this.state.newlyAdded.map((item, index) => {
                      return (
                        <VideoDetailsMobile
                          item={item}
                          key={item.id}
                          index={index}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className='class-block'>
              <div className='container class-block-header'>
                <h4 className='revamp-subtitle'>My courses</h4>
                {this.state.myCourses.length > 3 ? (
                  <div className='text-right'>
                    <Link className='btn btn-sm' href='/user/my-courses'>
                      <a className='btn btn-sm'>View All</a>
                    </Link>
                  </div>
                ) : null}
              </div>
              {this.state.myCourses.length == 0 ? (
                <div className='container'>
                  <div className='card-panel valign-wrapper grey lighten-4'>
                    <div className='row'>
                      <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center'>
                        No data found in this category.
                      </div>
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center'>
                        <Link className='btn btn-sm' href='/user/my-courses'>
                          <a className='btn btn-sm'>Discover Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  id='carousel-example-2'
                  className='carousel videoCarousel slide carousel-fade'
                  data-ride='carousel'
                >
                  <div className='carousel-inner' role='listbox'>
                    {this.state.myCourses.map((item, index) => {
                      return (
                        <CourseOverViewMobile
                          item={item}
                          key={item.id}
                          index={index}
                          isPurchased='1'
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            {this.state.availableCourse.length > 0 ? (
              <div className='class-block'>
                <div className='container class-block-header'>
                  <h4 className='revamp-subtitle'>Other Featured Course Available</h4>
                  <Link className='btn btn-sm' href='/user/my-courses'>
                    <a className='btn btn-sm'>View All</a>
                  </Link>
                </div>

                <div
                  id='carousel-example-2'
                  className='carousel videoCarousel slide carousel-fade'
                  data-ride='carousel'
                >
                  <div className='carousel-inner' role='listbox'>
                    {this.state.availableCourse.map((item, index) => {
                      return (
                        <CourseOverViewMobile
                          item={item}
                          key={item.id}
                          index={index}
                          isPurchased='0'
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        </main>
      </Layout>
    );
  }
}
