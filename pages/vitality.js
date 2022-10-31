import React, { Component } from 'react';
import Vimeo from '@u-wave/react-vimeo';
import axios from 'axios';
import Head from 'next/head';
import Layout from '../components/Layout';
import { apiRoute, getApiHeader, imagePath } from '../utils/helpers';

class Vitality extends Component {
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

  setVideoUrl = (url, title) => {
    this.setState({ currentVideo: url, currentTitle: title });
  };

  currentTime = (e) => {
    const seconds = e.seconds;
    if (seconds > 300) {
      this.setState({ showVideo: false });
    }
  };
  setAccessTrue = () => {
    this.setState({ showVideo: true });
  };

  setRedirect = () => {
    localStorage.setItem('videoUrl', this.state.currentVideo);
  };

  render() {
    return (
      <Layout>
        <Head>
          <meta charSet='utf-8' />
          <title>Vitality.</title>
        </Head>
        <div className='view intro-2'>
          <section className='inner-banner vitality-bg'>
            <div className='container text-center text-white'>
              <h1>Vitality</h1>
              <h5>
                Optimal levels of Energy. Experience of Health. Equanimity.
                Ease.
              </h5>
            </div>
          </section>
        </div>
        <main>
          <section className='sec sec-inclassNamees'>
            <div className='container'>
              <p>
                You will have access to teachings and practices that are
                designed to elevate your energy so that you can live an
                energy-rich life. A yogi is energy-rich and lives in energy-rich
                environments.
              </p>
              <p>
                We live in an environment where the majority of people are
                experiencing an energy crisis mentally, emotionally, physically,
                and energetically. What we need is an environment which uplifts.
                One that is energy-rich, not energy-depleting, for the law of
                nature is that wherever there is stronger energy, that stronger
                energy will prevail.
              </p>
              <p>
                Access dynamic and powerful practices of the Himalayan Tantric
                tradition to access pranamaya kosha, your energetic field, and
                increase your experience of vitality. Learn to create, shift,
                and lift your energy – your entire energetic system. Learn how
                to uplift your consciousness to experience an energy-rich
                environment.
              </p>
              <p>
                Strengthen your physiology. Get a strong body, a flexible body,
                a clean body that supports your evolutionary path. A yogi
                experiences optimal health and optimal levels of energy. Nature
                is invested in your evolution. So evolve. Experience increased
                clarity and vitality. Join us at Sattva Connect.
              </p>
              <div className='class-block'>
                <h4 className='h4-style'>Relevant Videos</h4>
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
      </Layout>
    );
  }
}

export default Vitality;
