import React, { Component } from 'react';
import Vimeo from '@u-wave/react-vimeo';
import axios from 'axios';
import Layout from '../components/Layout';
import Head from 'next/head';
import { apiRoute, getApiHeader, imagePath } from '../utils/helpers';

class Clarity extends Component {
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
      .then((res) => {
        this.setState({ videos: res.data.videos });
      })
      .catch((error) => {});
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
          {' '}
          <meta charSet='utf-8' />
          <title>Clarity.</title>
        </Head>
        <div className='view intro-2'>
          <section className='inner-banner clarity-bg'>
            <div className='container text-center text-white'>
              <h1>Clarity</h1>
              <h5>Sharp Intellect. Intuition. Presence. Inner Resolve.</h5>
            </div>
          </section>
        </div>
        <main>
          <section className='sec sec-inclassNamees'>
            <div className='container'>
              <p>
                The teachings and practices are designed specifically to refine
                and expand your consciousness, to refine your senses and
                increase your perception, to heighten your awareness, to
                stabilize your nervous system, and to correct your intellect so
                that you can gain a greater access to your higher mind, your
                innate wisdom, and supreme knowledge. The{' '}
                <a
                  href='https://www.sattvaconnect.com/courses'
                  title='practices'
                >
                  practices
                </a>{' '}
                are designed to elevate your energy and consciousness so that
                you may experience clarity on all levels of being, that is, the
                physical, mental, emotional, energetic, and spiritual levels. As
                you evolve within your journey, you will experience greater and
                greater clarity in all aspects of your life – clear thinking, a
                clear mind, clear nervous system, clear body, and clear heart.
              </p>
              <p>
                The yogic teachings and practices help you stay centered,
                focused, clear, and in equanimity. You see more, you understand
                more. There is clarity of thought and energy. Your presence
                increases. Your access to your intuition, your deep inner
                knowing, increases.
              </p>
              <p>
                You increase your capacity to be with life as it is presented to
                you at any moment in time. Whether an event seems favorable or
                unfavorable, your clarity remains. You flow in the direction of
                growth along your evolutionary journey and invite the support of
                universal natural intelligence. The teachings and practices
                increase your capacity to remain clear. An evolved being is
                clear. Nature supports clear living.{' '}
                <a href='ttps://www.sattvaconnect.com/' title='We'>
                  We
                </a>{' '}
                thrive in clarity. Clarity breeds purposefulness. Without
                clarity, there is no purposefulness. We cannot live purposefully
                without clarity.
              </p>
              <div className='class-block'>
                <h4 className='h4-style'>Relevant Videos</h4>
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

export default Clarity;
