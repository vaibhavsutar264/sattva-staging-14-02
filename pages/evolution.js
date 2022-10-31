import React, { Component } from 'react';
import Vimeo from '@u-wave/react-vimeo';
import axios from 'axios';
import Head from 'next/head';
import Layout from '../components/Layout';
import { apiRoute, getApiHeader, imagePath } from '../utils/helpers';

class Evolution extends Component {
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
    window.scrollTo(0, 0);

    const requestOptions = {
      headers: getApiHeader(),
    };
    axios
      .get(apiRoute('classes-video-list'), requestOptions)
      //axios.get('https://sattvastaging.website/backendportal/api/classes-video-list')
      .then((res) => {
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
          <title>Evolution.</title>
        </Head>
        <div className='view intro-2'>
          <section className='inner-banner evolution-bg'>
            <div className='container text-center text-white'>
              <h1>Evolution</h1>
              <h5>
                Self-Realization. Self-Mastery. Radical Aliveness. Freedom.
              </h5>
            </div>
          </section>
        </div>
        <main>
          <section className='sec sec-inclassNamees'>
            <div className='container'>
              <p>
                The teachings and practices at{' '}
                <a
                  href='https://www.sattvaconnect.com'
                  S
                  title='Sattva Connect'
                >
                  Sattva Connect
                </a>{' '}
                are designed to serve your evolutionary path, to take you to a
                higher state of consciousness.{' '}
                <a href='https://www.sattvaconnect.com/about-us' title='Our'>
                  Our
                </a>{' '}
                purpose here is to evolve. It is our nature to grow and expand.
                At any given moment in life, you are either in alignment with
                the creative intelligence and evolutionary impulse of the
                Universe or you are resisting it. When you are resisting the
                impulse of the creative intelligence, you suffer. When you are
                in alignment with it, you are thriving.
              </p>
              <p>
                One of the significant aspects of a great life is to be able to
                have progressively adaptive change in our lives. The{' '}
                <a
                  href='https://www.sattvaconnect.com/courses'
                  title='yogic teachings'
                >
                  yogic teachings
                </a>{' '}
                at Sattva Connect will give you tools, practices, and wisdom
                that you can apply to have that progressive shift and change in
                your life. The teachings are meant to guide you along the way.{' '}
                <a
                  href='https://www.sattvaconnect.com/about-sattva'
                  title='Sattva Connect'
                >
                  Sattva Connect
                </a>{' '}
                is a valuable resource for accessing a higher state of
                consciousness through teachings that will quicken your pathway
                to evolution.
              </p>
              <div className='class-block'>
                <h4 className='h4-style'>Relevant Videos</h4>
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
      </Layout>
    );
  }
}

export default Evolution;
