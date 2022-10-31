import React, { Component } from 'react';
import Head from 'next/head';
import Vimeo from '@u-wave/react-vimeo';
import axios from 'axios';
import Layout from '../components/Layout';
import { apiRoute, getApiHeader, imagePath } from '../utils/helpers';

class AboutClasses extends Component {
  constructor(props) {
    super(props);
    this.hariomModal = React.createRef();
    this.state = {
      showVideo: true,
      videos: [],
      currentVideo: '',
      currentTitle: '',
    };
  }
  componentDidMount() {
    const requestOptions = {
      headers: getApiHeader(),
    };
    axios.get(apiRoute('classes-video-list'), requestOptions).then((res) => {
      this.setState({ videos: res.data.videos });
    });
  }

  currentTime = (e) => {
    const seconds = e.seconds;
    if (seconds > 300) {
      this.setState({ showVideo: false });
    }
  };

  setAccessTrue = () => {
    this.setState({ showVideo: true });
  };

  setVideoUrl = (url, title) => {
    this.setState({ currentVideo: url, currentTitle: title });
  };

  setRedirect = () => {
    localStorage.setItem('videoUrl', this.state.currentVideo);
  };

  render() {
    return (
      <Layout>
        <Head>
          <meta charSet='utf-8' />
          <title>
            Online Yoga - Kundalini, Hatha, Prenatal & Meditation Classes For
            Beginners | Sattva Connect
          </title>
          <meta
            name='description'
            content='Sattva Connect provide Online Kundalini, Hatha, Prenatal Yoga & Meditation Classes For Beginners. Learn from Master Teachers, Join Our Community Now!'
          />
          <meta
            name='keywords'
            content='Online yoga classes, kundalini yoga online classes, online yoga classes for beginners, Hatha yoga online class, Prenatal yoga classes online, online meditation classes'
          />
          <link
            rel='canonical'
            href='https://www.sattvaconnect.com/about-classes/'
          />
        </Head>
        <div className='t3-wrapper'>
          <main>
            <section className='sec sec-inclasses'>
              <div className='container'>
                <div className='class-block mt-0'>
                  <h4 className='h4-style'>Evolution</h4>
                  <div className='row'>
                    {this.state.videos.evolution &&
                      this.state.videos.evolution.map((item, index) => {
                        return (
                          <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12'>
                            <div
                              className='hoverable card'
                              modalTitle={item.title}
                              modalVideo={item.video_url}
                              id='modalEvo'
                            >
                              <a
                                className='modal-trigger'
                                data-backdrop='static'
                                data-toggle='modal'
                                data-target='#vitality3'
                                onClick={() =>
                                  this.setVideoUrl(item.video_url, item.title)
                                }
                              >
                                {item.image_url ? (
                                  <img
                                    className='img-fluid'
                                    src={imagePath(
                                      'frontendVideo/' + item.image_url
                                    )}
                                  />
                                ) : (
                                  <img
                                    className='img-fluid'
                                    src={item.defaultThumb}
                                  />
                                )}
                              </a>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className='class-block'>
                  <h4 className='h4-style'>Clarity</h4>
                  <div className='row'>
                    {this.state.videos.clarity &&
                      this.state.videos.clarity.map((item, index) => {
                        return (
                          <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12'>
                            <div
                              className='hoverable card'
                              modalTitle={item.title}
                              modalVideo={item.video_url}
                              id='modalEvo'
                            >
                              <a
                                className='modal-trigger'
                                data-backdrop='static'
                                data-toggle='modal'
                                data-target='#vitality3'
                                onClick={() =>
                                  this.setVideoUrl(item.video_url, item.title)
                                }
                              >
                                {item.image_url ? (
                                  <img
                                    className='img-fluid'
                                    src={imagePath(
                                      'frontendVideo/' + item.image_url
                                    )}
                                  />
                                ) : (
                                  <img
                                    className='img-fluid'
                                    src={item.defaultThumb}
                                  />
                                )}
                              </a>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className='class-block'>
                  <h4 className='h4-style'>Vitality</h4>
                  <div className='row'>
                    {this.state.videos.vitality &&
                      this.state.videos.vitality.map((item, index) => {
                        return (
                          <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12'>
                            <div
                              className='hoverable card'
                              modalTitle={item.title}
                              modalVideo={item.video_url}
                              id='modalEvo'
                            >
                              <a
                                className='modal-trigger'
                                data-backdrop='static'
                                data-toggle='modal'
                                data-target='#vitality3'
                                onClick={() =>
                                  this.setVideoUrl(item.video_url, item.title)
                                }
                              >
                                {item.image_url ? (
                                  <img
                                    className='img-fluid'
                                    src={imagePath(
                                      'frontendVideo/' + item.image_url
                                    )}
                                  />
                                ) : (
                                  <img
                                    className='img-fluid'
                                    src={item.defaultThumb}
                                  />
                                )}
                              </a>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div
                  className='modal fade iframe-modal'
                  id='vitality3'
                  tabindex='-1'
                  role='dialog'
                  aria-labelledby='vitality3Title'
                  aria-hidden='true'
                >
                  <div
                    className='modal-dialog modal-lg modal-dialog-centered'
                    role='document'
                  >
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <h6 className='mb-3'>{this.state.currentTitle}</h6>
                        <button
                          type='button'
                          className='close closeModal'
                          data-dismiss='modal'
                        >
                          &times;
                        </button>
                      </div>
                      <div className='modal-body'>
                        <div className='video-container'>
                          {/* <iframe className="ifmplayer" src="https://player.vimeo.com/video/279921630?color=ffffff&amp;title=0&amp;byline=0&amp;portrait=0" data-ready="true" frameborder="0"></iframe> */}
                          {this.state.currentVideo && this.state.showVideo ? (
                            <Vimeo
                              video={this.state.currentVideo}
                              onTimeUpdate={this.currentTime}
                            />
                          ) : (
                            <div className='accessErrorMsg'>
                              <h3>Login/Sign up to continue further.</h3>
                              <div
                                className='goToButtonsDiv'
                                onClick={this.setRedirect}
                              >
                                <a href='/login' className='btn btn-sm '>
                                  LOGIN
                                </a>
                                <a href='/plans' className='btn btn-sm '>
                                  SIGN UP
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </Layout>
    );
  }
}

export default AboutClasses;
