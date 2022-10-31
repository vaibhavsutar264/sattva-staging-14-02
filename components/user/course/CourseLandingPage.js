import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Constants from '../../../constants';
import { apiRoute, getApiHeader, imagePath } from '../../../utils/helpers';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Fade from 'react-reveal/Fade';
import ReactTooltip from 'react-tooltip';

class CourseLandingPage extends Component {
  constructor(props) {
    super(props);
    this.reviewDiv = React.createRef();

    this.state = {
      pageId: props.pageId,
      courseId: props.courseId,
      courseDetails: null,
      courseContent: null,
      slider: null,
      bannerImage: null,
      courseRating: [],
      ratingAvg: 0,
      isLoading: true,
    };
  }

  scrollToReview = () => {
    this.reviewDiv.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  componentDidMount() {
    const requestOptions = {
      headers: getApiHeader(),
    };
    axios
      .get(
        apiRoute('cms-course-landing-page/' + this.state.pageId),
        requestOptions
      )
      .then((res) => {
        console.log('checking');
        console.log(res.data.data.pageData);
        this.setState({
          courseDetails: res.data.data.pageData,
          slider: res.data.data.slider,
          isLoading: false,
        });
      });
    axios
      .get(apiRoute('cms-page-banner/' + this.state.pageId), requestOptions)
      .then((res) => {
        this.setState({ bannerImage: res.data });
      });

    axios
      .get(apiRoute('course-detail/' + this.state.courseId), requestOptions)
      .then((res) => {
        this.setState({
          courseContent: res.data,
        });
      });
    axios
      .get(apiRoute('get-course-rating/' + this.state.courseId), requestOptions)
      .then((res) => {
        this.setState({
          courseRating: res.data.courseRating,
          ratingAvg: res.data.ratingAvg,
        });
        if (
          this.props.scroll !== undefined &&
          res.data.courseRating.length > 0
        ) {
          setTimeout(function () {
            document.getElementById('ratingDiv').scrollIntoView(true);
          }, 500);
        }
      });
  }

  render() {
    var avgStars = '';
    console.log(this.state.ratingAvg);
    for (var i = 0; i < this.state.ratingAvg; i++) {
      avgStars += '<i class="fa fa-star" aria-hidden="true"></i>';
    }
    return (
      <>
        {this.state.isLoading && (
          <div className='preloader-background'>
            <div className='big sattva_loader active'>
              <img src={Constants.SITE_URL + '/images/loader.png'} />
            </div>
          </div>
        )}
        <div className='main coursePage'>
          {this.state.bannerImage ? (
            <div>
              <div
                className='secCourseBanner'
                style={{
                  backgroundImage: `url(${this.state.bannerImage.image})`,
                }}
              >
                <div className='container'>
                  <Fade bottom>
                    <div className='row'>
                      <div className='col-xl-6 col-lg-7 col-md-8 col-10 pr-0'>
                        <h1
                          className='textTheme'
                          dangerouslySetInnerHTML={{
                            __html: this.state.bannerImage.title,
                          }}
                        ></h1>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: this.state.bannerImage.description,
                          }}
                        ></p>
                        <div
                          className='courseRating'
                          data-html={true}
                          data-for='custom-color-no-arrow'
                          data-tip={
                            this.state.courseContent &&
                            this.state.courseContent.is_in_english == '2'
                              ? 'Atsiliepimai'
                              : 'Testimonials'
                          }
                          dangerouslySetInnerHTML={{ __html: avgStars }}
                          onClick={this.scrollToReview}
                        ></div>
                        <ReactTooltip
                          id='custom-color-no-arrow'
                          className='react-tooltip card-title-tooltip'
                          delayHide={1000}
                          textColor='#FFF'
                          backgroundColor='#5c1b72'
                          effect='solid'
                        />
                      </div>
                    </div>
                  </Fade>
                </div>
              </div>
              <div className='CourseBannerContent'>
                <div className='container'>
                  <h1
                    className='textTheme'
                    dangerouslySetInnerHTML={{
                      __html: this.state.bannerImage.title,
                    }}
                  ></h1>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: this.state.bannerImage.description,
                    }}
                  ></p>
                  <div
                    className='courseRating'
                    data-html={true}
                    data-for='custom-color-no-arrow'
                    data-tip='Testimonials'
                    dangerouslySetInnerHTML={{ __html: avgStars }}
                    onClick={this.scrollToReview}
                  ></div>
                  <ReactTooltip
                    id='custom-color-no-arrow'
                    className='react-tooltip card-title-tooltip'
                    delayHide={1000}
                    textColor='#FFF'
                    backgroundColor='#5c1b72'
                    effect='solid'
                  />
                </div>
              </div>
            </div>
          ) : (
            ''
          )}

          {this.state.courseDetails && this.state.courseDetails[0] ? (
            <div className='secCourse secChanting'>
              <div className='container text-center'>
                <div className='row justify-content-center'>
                  <Fade bottom>
                    <div class='col-md-11'>
                      {/* <h2 class="courseHeading text-white mb-2">Enlivening the Spirit</h2> */}
                      <h2
                        class='courseHeading text-white mb-sm-5 mb-4'
                        dangerouslySetInnerHTML={{
                          __html: this.state.courseDetails[0].title,
                        }}
                      ></h2>
                    </div>
                  </Fade>
                  <div className='col-lg-10 col-md-12'>
                    <Fade bottom>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: this.state.courseDetails[0].description,
                        }}
                      ></div>
                    </Fade>
                    <div className='videoBox mt-sm-5 mt-3'>
                      <img
                        src={imagePath(
                          'cms/' + this.state.courseDetails[0].image
                        )}
                        className='img-fluid'
                      />
                      <div class='playIcon'>
                        <a
                          data-src={this.state.courseDetails[0].link}
                          data-toggle='modal'
                          id='viewVideo'
                          data-target='#video-screen'
                        >
                          <i class='fa fa-play' aria-hidden='true'></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* </>} */}
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          <div
            id='video-screen'
            className='modal fade videoModal'
            role='dialog'
          >
            <div className='modal-dialog modal-lg'>
              <div className='modal-content'>
                <button type='button' className='closeBtn' data-dismiss='modal'>
                  <img src={Constants.SITE_URL + '/images/cancel.svg'} />
                </button>
                <div className='media-content'>
                  <iframe
                    id='videoIframe'
                    src=''
                    width='100%'
                    height='510'
                    frameborder='0'
                    allow='autoplay; fullscreen'
                    webkitallowfullscreen='true'
                    mozallowfullscreen='true'
                    allowfullscreen='true'
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          {this.state.courseDetails && this.state.courseDetails[1] ? (
            <div className='secCourse secBhakti'>
              <div className='container text-center'>
                <div className='row justify-content-center'>
                  <div className='col-lg-10 col-md-12'>
                    <Fade bottom>
                      <h2
                        className='courseHeading mb-sm-5 mb-3'
                        dangerouslySetInnerHTML={{
                          __html: this.state.courseDetails[1].title,
                        }}
                      ></h2>
                      <p
                        className='mb-0'
                        dangerouslySetInnerHTML={{
                          __html: this.state.courseDetails[1].description,
                        }}
                      ></p>
                      {this.state.courseDetails[1].link ? (
                        <Link
                          href={
                            Constants.SITE_URL +
                            '/user/buy-course/' +
                            this.state.pageId +
                            '/' +
                            this.state.courseId
                          }
                        >
                          <a
                            className='btn btnContribution mt-4'
                            dangerouslySetInnerHTML={{
                              __html: this.state.courseDetails[1].link,
                            }}
                          ></a>
                        </Link>
                      ) : (
                        ''
                      )}
                    </Fade>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          {this.state.courseDetails && this.state.courseDetails[2] ? (
            <div
              className='secCourse secWorks'
              style={{
                backgroundImage: `url(${imagePath(
                  'cms/' + this.state.courseDetails[2].image
                )})`,
              }}
            >
              <div className='overlay'></div>
              <div className='container'>
                <Fade bottom>
                  <div className='row justify-content-center text-center mb-4'>
                    <div className='col-md-10'>
                      <h2 className='courseHeading text-white mb-4'>
                        {this.state.courseDetails[2].title}
                      </h2>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: this.state.courseDetails[2].description,
                        }}
                      ></p>
                      {this.state.courseDetails[2].link ? (
                        <Link
                          href={
                            Constants.SITE_URL +
                            '/user/buy-course/' +
                            this.state.pageId +
                            '/' +
                            this.state.courseId
                          }
                        >
                          <a
                            className='btn btnContribution my-4'
                            dangerouslySetInnerHTML={{
                              __html: this.state.courseDetails[2].link,
                            }}
                          ></a>
                        </Link>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </Fade>
                <div className='row'>
                  {this.state.courseDetails && this.state.courseDetails[3] ? (
                    <div className='col-lg-5 col-md-12'>
                      <Fade bottom>
                        <div className='secWorksLeft text-left'>
                          <h3
                            className='textTheme text-center d-block'
                            dangerouslySetInnerHTML={{
                              __html: this.state.courseDetails[3].title,
                            }}
                          ></h3>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: this.state.courseDetails[3].description,
                            }}
                          ></div>
                          {this.state.courseDetails[3].link ? (
                            <Link
                              href={
                                Constants.SITE_URL +
                                '/user/buy-course/' +
                                this.state.pageId +
                                '/' +
                                this.state.courseId
                              }
                            >
                              <a
                                className='btn btn-block btnContribution text-white mt-5'
                                dangerouslySetInnerHTML={{
                                  __html: this.state.courseDetails[3].link,
                                }}
                              ></a>
                            </Link>
                          ) : (
                            ''
                          )}
                        </div>
                      </Fade>
                    </div>
                  ) : (
                    ''
                  )}
                  {this.state.courseDetails && this.state.courseDetails[4] ? (
                    <div className='col-lg-7 col-md-12 mt-5 pl-sm-5'>
                      <Fade bottom>
                        <h2
                          className='courseHeading text-white mb-sm-5 mb-3'
                          dangerouslySetInnerHTML={{
                            __html: this.state.courseDetails[4].title,
                          }}
                        ></h2>
                        <ul
                          className='list-unstyled listNumbers'
                          dangerouslySetInnerHTML={{
                            __html: this.state.courseDetails[4].description,
                          }}
                        ></ul>
                      </Fade>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          {this.state.courseDetails && this.state.courseDetails[5] ? (
            <div
              className='secCourse secBenefits'
              style={{
                backgroundImage: `url(${imagePath(
                  'cms/' + this.state.courseDetails[5].image
                )})`,
              }}
            >
              <div className='container'>
                <Fade bottom>
                  <h2
                    className='courseHeading mb-sm-5 mb-3'
                    dangerouslySetInnerHTML={{
                      __html: this.state.courseDetails[5].title,
                    }}
                  ></h2>
                  <ul
                    className='list-unstyled listBullet'
                    dangerouslySetInnerHTML={{
                      __html: this.state.courseDetails[5].description,
                    }}
                  ></ul>
                </Fade>
              </div>
            </div>
          ) : (
            ''
          )}
          {this.state.courseDetails && this.state.courseDetails[6] ? (
            <div
              className='secImage'
              style={{
                backgroundImage: `url(${imagePath(
                  'cms/' + this.state.courseDetails[6].image
                )})`,
              }}
            >
              <img
                src={imagePath('cms/' + this.state.courseDetails[6].image)}
                className='img-fluid'
              />
            </div>
          ) : (
            ''
          )}
          {this.state.courseDetails && this.state.courseDetails[7] ? (
            this.state.courseDetails[7].title ? (
              <div className='secCourse secCurriculum'>
                <div className='container'>
                  <div className='row justify-content-center'>
                    <div className='col-lg-10 col-md-12'>
                      <h2
                        className='courseHeading mb-4 text-center'
                        dangerouslySetInnerHTML={{
                          __html: this.state.courseDetails[7].title,
                        }}
                      ></h2>
                      <h5 class='text-center'>Watch at your own pace. </h5>
                      <h5 class='text-center mb-4'>
                        Return to view again and again.
                      </h5>
                      <Fade bottom>
                        <div className='scheduleBox'>
                          <div className='scheduleHeading'>
                            <h4>Day 1 :</h4>
                          </div>
                          <table className='table scheduleTable'>
                            <tbody>
                              <tr>
                                <th scope='row'>7:30 pm</th>
                                <td>Opening Wisdom Meeting</td>
                              </tr>
                              <tr>
                                <th scope='row'>8:45 pm</th>
                                <td>
                                  Fire Ceremony, Havan for Intention Setting
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Fade>
                      <Fade bottom>
                        <div className='scheduleBox'>
                          <div className='scheduleHeading'>
                            <h4>Day 2 , Day 3 , Day 4 :</h4>
                          </div>
                          <table className='table scheduleTable'>
                            <tbody>
                              <tr>
                                <th scope='row'>5:30 am</th>
                                <td>Puja</td>
                              </tr>
                              <tr>
                                <th scope='row'>6:00 am</th>
                                <td>Meditation</td>
                              </tr>
                              <tr>
                                <th scope='row'>7:30 am</th>
                                <td>Journey</td>
                              </tr>
                              <tr>
                                <th scope='row'>11:00 am</th>
                                <td>Wisdom Meeting</td>
                              </tr>
                              <tr>
                                <th scope='row'>5:30 pm</th>
                                <td>Kriya Set</td>
                              </tr>
                              <tr>
                                <th scope='row'>7:30 pm</th>
                                <td>
                                  Wisdom Meeting / Evening Meditation / Kirtan
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Fade>
                      <Fade bottom>
                        <div className='scheduleBox'>
                          <div className='scheduleHeading'>
                            <h4>Day 5 :</h4>
                          </div>
                          <table className='table scheduleTable'>
                            <tbody>
                              <tr>
                                <th scope='row'>5:30 am</th>
                                <td>Puja</td>
                              </tr>
                              <tr>
                                <th scope='row'>6:00 am</th>
                                <td>Meditation</td>
                              </tr>
                              <tr>
                                <th scope='row'>8:00 am</th>
                                <td>
                                  Closing Ceremony, Havan for Intention Setting
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Fade>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )
          ) : (
            ''
          )}
          {this.state.courseDetails &&
          this.state.courseDetails[16] &&
          this.state.courseDetails[16].title ? (
            <div className='secCourse secCurriculum'>
              <div className='container'>
                <div className='row justify-content-center'>
                  <div className='col-lg-10 col-md-12'>
                    <h2
                      className='courseHeading mb-4 text-center'
                      dangerouslySetInnerHTML={{
                        __html: this.state.courseDetails[16].title,
                      }}
                    ></h2>

                    <h5
                      class='text-center mb-4'
                      dangerouslySetInnerHTML={{
                        __html: this.state.courseDetails[16].description,
                      }}
                    ></h5>
                    {this.state.courseContent &&
                    this.state.courseContent.modules ? (
                      <Accordion
                        className='chapterAccordion'
                        allowZeroExpanded={true}
                      >
                        {this.state.courseContent.modules.map((item, index) => {
                          var title =
                            index == 4 && this.state.courseDetails[17]
                              ? this.state.courseDetails[17].title
                              : '';
                          var divDescription =
                            index == 4 && this.state.courseDetails[17]
                              ? this.state.courseDetails[17].description
                              : '';
                          return (
                            <>
                              <AccordionItem key={index}>
                                <AccordionItemHeading>
                                  <AccordionItemButton>
                                    <div>
                                      <span>
                                        {item.title}{' '}
                                        {/* {this.state.courseContent.id != '10' && this.state.courseContent.id != '31' && this.state.courseContent.id != '53' && this.state.courseContent.id != '54'  && this.state.courseContent.id != '58'
                                          ? item.description
                                          : ''} */}
                                      </span>
                                    </div>{' '}
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
                                  {this.state.courseContent.id == '10' &&
                                  item.description ? (
                                    <b>
                                      <>{item.description}</>{' '}
                                    </b>
                                  ) : (
                                    ''
                                  )}
                                  {this.state.courseContent.id == '58' &&
                                  item.description ? (
                                    <b>
                                      <>{item.description}</>{' '}
                                    </b>
                                  ) : (
                                    ''
                                  )}
                                  <ul className='list-unstyled listBullet mt-2'>
                                    {this.state.courseContent.id == '9' &&
                                      item.videos.map((video, index) => {
                                        return <li>{video.title}</li>;
                                      })}
                                    {this.state.courseContent.id !== 9 &&
                                    this.state.courseContent.id !== 10 &&
                                    this.state.courseContent.id !== 58 &&
                                    item.description ? (
                                      <i><b>{item.description}</b></i>
                                    ) : (
                                      ''
                                    )}
                                    {this.state.courseContent.id !== 9 &&
                                    item.videos.length == 1 ? (
                                      <li>{item.videos.length} Video</li>
                                    ) : (
                                      ''
                                    )}
                                    {this.state.courseContent.id !== 9 &&
                                    item.videos.length > 1 ? (
                                      <li>{item.videos.length} Videos</li>
                                    ) : (
                                      ''
                                    )}
                                    {this.state.courseContent.id !== 9 &&
                                    item.audios.length > 0 ? (
                                      <li>{item.audios.length} Aideos</li>
                                    ) : (
                                      ''
                                    )}
                                    {this.state.courseContent.id !== 9 &&
                                    this.state.courseContent.id !== 31 &&
                                    item.handoutPdfs.length > 0 ? (
                                      <li>
                                        {item.handoutPdfs.length} PDF Handouts
                                      </li>
                                    ) : (
                                      ''
                                    )}
                                    {this.state.courseContent.id == 31 &&
                                    item.handoutPdfs.length > 0 ? (
                                      <li>
                                      1 PDF Handouts
                                      </li>
                                    ) : (
                                      ''
                                    )}
                                    { this.state.courseContent.id == 31 && item.id==69 ?
                                    (
                                      <li>
                                        Artwork from artist Emma Abel
                                      </li>
                                    )
                                    :
                                    (
                                      <></>
                                    )
                                    }
                                    {this.state.courseContent.id !== 9 &&
                                    item.transcripts &&
                                    item.transcripts.length > 0 ? (
                                      <li>
                                        {item.transcripts.length} Transcript
                                      </li>
                                    ) : (
                                      ''
                                    )}
                                  </ul>
                                </AccordionItemPanel>
                              </AccordionItem>
                              {/* {title ? (
                                <div class='chapterMiddle'>
                                  <div class='row justify-content-center'>
                                    <div class='col-md-11'>
                                      <h4
                                        class='mb-3'
                                        dangerouslySetInnerHTML={{
                                          __html: title,
                                        }}
                                      ></h4>
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: divDescription,
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                ''
                              )} */}
                            </>
                          );
                        })}
                      </Accordion>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          {this.state.courseDetails && this.state.courseDetails[15] ? (
            <div>
              {this.state.courseDetails[15].title ? (
                <div className='secCourse secCurriculum text-center willReceiveSec'>
                  <div className='container'>
                    {this.state.courseDetails[15].title ? (
                      <h2
                        className='courseHeading mb-5 '
                        dangerouslySetInnerHTML={{
                          __html: this.state.courseDetails[15].title,
                        }}
                      ></h2>
                    ) : (
                      ''
                    )}

                    <div className='row'>
                      {this.state.courseDetails[15].icon1 ? (
                        <div className='col-md-3'>
                          <div className='receivebox'>
                            <div className='receiveIcon'>
                              <img
                                src={imagePath(
                                  'cms/' + this.state.courseDetails[15].icon1
                                )}
                                className='img-fluid'
                              />
                            </div>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: this.state.courseDetails[15]
                                  .description1,
                              }}
                            ></p>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                      {this.state.courseDetails[15].icon2 ? (
                        <div className='col-md-3'>
                          <div className='receivebox'>
                            <div className='receiveIcon'>
                              <img
                                src={imagePath(
                                  'cms/' + this.state.courseDetails[15].icon2
                                )}
                                className='img-fluid'
                              />
                            </div>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: this.state.courseDetails[15]
                                  .description2,
                              }}
                            ></p>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                      {this.state.courseDetails[15].icon3 ? (
                        <div className='col-md-3'>
                          <div className='receivebox'>
                            <div className='receiveIcon'>
                              <img
                                src={imagePath(
                                  'cms/' + this.state.courseDetails[15].icon3
                                )}
                                className='img-fluid'
                              />
                            </div>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: this.state.courseDetails[15]
                                  .description3,
                              }}
                            ></p>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                      {this.state.courseDetails[15].icon4 ? (
                        <div className='col-md-3'>
                          <div className='receivebox'>
                            <div className='receiveIcon'>
                              <img
                                src={imagePath(
                                  'cms/' + this.state.courseDetails[15].icon4
                                )}
                                className='img-fluid'
                              />
                            </div>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: this.state.courseDetails[15]
                                  .description4,
                              }}
                            ></p>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}
          {this.state.courseDetails && this.state.courseDetails[8] ? (
            <div className='secCourse secTeachers'>
              <div className='overlay'></div>
              <div className='container'>
                <h2
                  className='mb-sm-5 mb-3 text-center'
                  dangerouslySetInnerHTML={{
                    __html: this.state.courseDetails[8].title,
                  }}
                ></h2>
                <div className='row align-items-center'>
                  <div className='col-lg-6 col-md-12 mt-lg-4'>
                    {this.state.courseDetails[8].image ? (
                      <img
                        src={imagePath(
                          'cms/' + this.state.courseDetails[8].image
                        )}
                        className='img-fluid'
                      />
                    ) : (
                      ''
                    )}
                  </div>
                  <div className='col-lg-6 col-md-12 mt-4 pl-lg-5'>
                    <Fade bottom>
                      {this.state.courseDetails[8].description ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: this.state.courseDetails[8].description,
                          }}
                        ></div>
                      ) : (
                        ''
                      )}
                      {this.state.courseDetails[8].link ? (
                        <Link
                          href={
                            Constants.SITE_URL +
                            '/user/buy-course/' +
                            this.state.pageId +
                            '/' +
                            this.state.courseId
                          }
                        >
                          <a
                            className='btn btnContribution btnWhite mt-4'
                            dangerouslySetInnerHTML={{
                              __html: this.state.courseDetails[11].link,
                            }}
                          ></a>
                        </Link>
                      ) : (
                        ''
                      )}
                    </Fade>
                  </div>
                </div>
              </div>
              <OwlCarousel
                className='owl-theme teachersCarousel'
                loop
                margin={0}
                items={1}
                dots={false}
                autoplay={true}
                autoplayTimeout={15000}
                smartSpeed={2000}
                nav
              >
                {this.state.slider.map((item, index) => {
                  return (
                    <div class='item teacherItem'>
                      <div className='container'>
                        <div className='row align-items-center'>
                          <div className='col-lg-5 col-md-12'>
                            <div className='teacherImage'>
                              <img
                                src={imagePath('course_intents/' + item.image)}
                                className='img-fluid'
                              />
                            </div>
                          </div>
                          <div className='col-lg-7 col-md-12'>
                            <h4
                              dangerouslySetInnerHTML={{ __html: item.title }}
                            ></h4>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            ></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </OwlCarousel>
            </div>
          ) : (
            ''
          )}
          {this.state.courseDetails && this.state.courseDetails[9].image != null ? (
            <div
              className='secCourse secCourseRegister'
              style={{
                backgroundImage: `url(${imagePath(
                  'cms/' + this.state.courseDetails[9].image
                )})`,
              }}
            >
              <div className='overlay'></div>
              <div className='container h-100'>
                <div className='row h-100 justify-content-center align-items-center text-center'>
                  <div className='col-md-10'>
                    <Fade bottom>
                      <h2
                        className='text-white'
                        dangerouslySetInnerHTML={{
                          __html: this.state.courseDetails[9].title,
                        }}
                      ></h2>
                      <p
                        className='text-white mt-sm-5 mt-3'
                        dangerouslySetInnerHTML={{
                          __html: this.state.courseDetails[9].description,
                        }}
                      ></p>
                      {this.state.courseDetails[9].link ? (
                        <Link
                          href={
                            Constants.SITE_URL +
                            '/user/buy-course/' +
                            this.state.pageId +
                            '/' +
                            this.state.courseId
                          }
                        >
                          <a
                            className='btn btnContribution mt-sm-5 mt-3'
                            dangerouslySetInnerHTML={{
                              __html: this.state.courseDetails[9].link,
                            }}
                          ></a>
                        </Link>
                      ) : (
                        ''
                      )}
                    </Fade>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}

          {this.state.courseRating.length > 0 ? (
            <>
              <div ref={this.reviewDiv} id='ratingDiv'>
                <div className='secCourse secReceive secCommunity text-center'>
                  <div className='container'>
                    {this.state.courseContent &&
                    this.state.courseContent.is_in_english == '2' ? (
                      <h2 class='mb-sm-5 mb-3 text-center'>
                        Ką sako bendruomenė
                      </h2>
                    ) : (
                      <h2 class='mb-sm-5 mb-3 text-center'>
                        What The Community Is Saying
                      </h2>
                    )}

                    {this.state.courseDetails &&
                    this.state.courseDetails[10].image ? (
                      <img
                        src={imagePath(
                          'cms/' + this.state.courseDetails[10].image
                        )}
                        class='img-fluid quoteImage  text-center'
                      />
                    ) : (
                      ''
                    )}
                    <OwlCarousel
                      className='owl-theme communityCarousel'
                      loop={true}
                      margin={0}
                      items={1}
                      dots={false}
                      nav={true}
                      autoplay={true}
                    >
                      {this.state.courseRating.map((item, index) => {
                        var stars = '';
                        for (var i = 0; i < item.rating; i++) {
                          stars +=
                            '<i class="fa fa-star" aria-hidden="true"></i>';
                        }
                        if (item.comment) {
                          return (
                            <div class='item' key={index}>
                              <Fade bottom>
                                <div
                                  className='courseRating'
                                  data-html={true}
                                  data-for='custom-color-no-arrow'
                                  data-tip='Testimonials'
                                  dangerouslySetInnerHTML={{ __html: stars }}
                                ></div>
                                <ReactTooltip
                                  id='custom-color-no-arrow'
                                  className='react-tooltip card-title-tooltip'
                                  delayHide={1000}
                                  textColor='#FFF'
                                  backgroundColor='#5c1b72'
                                  effect='solid'
                                />
                                <h4 class='mt-4'>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: item.comment,
                                    }}
                                  ></p>
                                  <p>
                                    <b>
                                      {item.user.first_name}{' '}
                                      {item.user.last_name}
                                    </b>{' '}
                                    -{' '}
                                    <small className='cityName'>
                                      {' '}
                                      {item.user.country}
                                    </small>
                                  </p>
                                </h4>
                              </Fade>
                            </div>
                          );
                        }
                      })}
                    </OwlCarousel>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ''
          )}
          {this.state.courseDetails &&
          this.state.courseDetails[11].title!=null &&
          this.state.courseContent &&
          this.state.courseContent.id == '10' ? (
            <div
              className='secCourse secOutcomes outcomesBhagvat'
              style={{
                backgroundImage: `url(${imagePath(
                  'cms/' + this.state.courseDetails[11].image
                )})`,
              }}
            >
              <div className='overlay'></div>
              <div className='container'>
                <h2
                  className='mb-sm-5 mb-3 text-center'
                  dangerouslySetInnerHTML={{
                    __html: this.state.courseDetails[11].title,
                  }}
                ></h2>
                <div className='row align-items-center'>
                  <div className='col-lg-5 col-md-12 mt-lg-4'>
                    <img
                      src={imagePath(
                        'cms/' + this.state.courseDetails[11].image
                      )}
                      className='img-fluid'
                    />
                  </div>
                  <div className='col-lg-7 col-md-12 mt-4 pl-lg-5 '>
                    <Fade bottom>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: this.state.courseDetails[11].description,
                        }}
                      ></div>
                      {this.state.courseDetails[11].link ? (
                        <Link
                          href={
                            Constants.SITE_URL +
                            '/user/buy-course/' +
                            this.state.pageId +
                            '/' +
                            this.state.courseId
                          }
                        >
                          <a
                            className='btn btnContribution btnWhite mt-4'
                            dangerouslySetInnerHTML={{
                              __html: this.state.courseDetails[11].link,
                            }}
                          ></a>
                        </Link>
                      ) : (
                        ''
                      )}
                    </Fade>
                  </div>
                  <p class='mt-5 geetaQuote'>
                    "
                    <em>
                      As we elevate our own consciousness state, we help elevate
                      the consciousness state of the collective, something which
                      is more important now than ever. As you begin to lift
                      yourself up, the whole world starts to be lifted.
                    </em>
                    "
                  </p>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}

          {this.state.courseDetails &&
          this.state.courseDetails[11].title!=null &&
          this.state.courseContent &&
          this.state.courseContent.id != '10' ? (
            <div
              className='secCourse secOutcomes'
              style={{
                backgroundImage: `url(${imagePath(
                  'cms/' + this.state.courseDetails[11].image
                )})`,
              }}
            >
              <div className='overlay'></div>
              <div className='container'>
                <h2
                  className='mb-sm-5 mb-3 text-center'
                  dangerouslySetInnerHTML={{
                    __html: this.state.courseDetails[11].title,
                  }}
                ></h2>
                <div className='row align-items-center'>
                  <div className='col-lg-6 col-md-12 mt-lg-4'>
                    <img
                      src={imagePath(
                        'cms/' + this.state.courseDetails[11].image
                      )}
                      className='img-fluid'
                    />
                  </div>
                  <div className='col-lg-6 col-md-12 mt-4 pl-lg-5'>
                    <Fade bottom>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: this.state.courseDetails[11].description,
                        }}
                      ></div>
                      {this.state.courseDetails[11].link ? (
                        <Link
                          href={
                            Constants.SITE_URL +
                            '/user/buy-course/' +
                            this.state.pageId +
                            '/' +
                            this.state.courseId
                          }
                        >
                          <a
                            className='btn btnContribution btnWhite mt-4'
                            dangerouslySetInnerHTML={{
                              __html: this.state.courseDetails[11].link,
                            }}
                          ></a>
                        </Link>
                      ) : (
                        ''
                      )}
                    </Fade>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          {this.state.courseDetails && this.state.courseDetails[12].title != null ? (
            <div className='secCourse secCourseSign'>
              <div className='container h-100'>
                <div className='row h-100 justify-content-center align-items-center text-center'>
                  <div className='col-lg-10 col-md-12'>
                    <Fade bottom>
                      <h2
                        className='courseHeading textTheme mb-4'
                        dangerouslySetInnerHTML={{
                          __html: this.state.courseDetails[12].title,
                        }}
                      ></h2>
                      <div
                        className='innerCourseSign'
                        dangerouslySetInnerHTML={{
                          __html: this.state.courseDetails[12].description,
                        }}
                      ></div>
                      {this.state.courseDetails[12].link ? (
                        <Link
                          href={
                            Constants.SITE_URL +
                            '/user/buy-course/' +
                            this.state.pageId +
                            '/' +
                            this.state.courseId
                          }
                        >
                          <a
                            className='btn btnContribution mt-sm-5 mt-3'
                            dangerouslySetInnerHTML={{
                              __html: this.state.courseDetails[12].link,
                            }}
                          ></a>
                        </Link>
                      ) : (
                        ''
                      )}
                    </Fade>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          {this.state.courseDetails && this.state.courseDetails[13] ? (
            <div
              className='secImage'
              style={{
                backgroundImage: `url(${imagePath(
                  'cms/' + this.state.courseDetails[13].image
                )})`,
              }}
            >
              <img
                src={imagePath('cms/' + this.state.courseDetails[13].image)}
                className='img-fluid'
              />
            </div>
          ) : (
            ''
          )}
          {this.state.courseDetails && this.state.courseDetails[14].title !=null ? (
            <div className='secCoursePrice'>
              <div className='container h-100'>
                <div className='row h-100 justify-content-center align-items-center text-center'>
                  <div className='col-md-8 h-100 bgTheme'>
                    <Fade bottom>
                      <div className='py-5'>
                        <h2
                          className='mb-5'
                          dangerouslySetInnerHTML={{
                            __html: this.state.courseDetails[14].title,
                          }}
                        ></h2>
                        {this.state.courseDetails[14].description ? (
                          <p
                            class='mb-sm-5 mb-3'
                            dangerouslySetInnerHTML={{
                              __html: this.state.courseDetails[14].description,
                            }}
                          ></p>
                        ) : (
                          ''
                        )}
                        {this.state.courseDetails[14].link ? (
                          <Link
                            href={
                              Constants.SITE_URL +
                              '/user/buy-course/' +
                              this.state.pageId +
                              '/' +
                              this.state.courseId
                            }
                          >
                            <a
                              className='btn btnWhite btnContribution mt-4'
                              dangerouslySetInnerHTML={{
                                __html: this.state.courseDetails[14].link,
                              }}
                            ></a>
                          </Link>
                        ) : (
                          ''
                        )}
                      </div>
                    </Fade>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </>
    );
  }
}

export default CourseLandingPage;
