import React, { Component } from 'react';
import DharmaFooter from '../../components/user/common/DharmaFooter';
import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';
import Header from '../../components/user/common/Header';
import Link from 'next/link';

class RoadToDharma extends Component {
  render() {
    return (
      <>
        <Header />
        <section className='inner-banner-new3'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-3 col-lg-3 rtd-logo-div'>
                <img src='../../images/rtd-logo.png'></img>
              </div>
              <div className='col-md-8 col-lg-6 rtd-top-right'>
                <p>
                  THE DOCU-SERIES JOURNEY & ONLINE COURSE FOR LIVING A LIFE OF
                  FREEDOM{' '}
                </p>
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='rtd-text-box col-md-12 col-lg-6'>
              <div className='row'>
                <div className='rtd-text-content'>
                  <h5>FREEDOM, IT IS THE QUEST THAT ALL HUMANKIND SHARES.</h5>
                  <p>
                    Now through the power of The Road to Dharma DocuSeries,
                    combined with an Online Course, we can fully engage in this
                    quest of LIVING A LIFE OF FREEDOM. The ten-episode
                    DocuSeries inspires us like only a story can, with an
                    adventure to four Himalayan sacred sites, that reveal
                    secrets of FREEDOM.{' '}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className='sec-cinfo sec-watchfree'
          data-aos='zoom-out'
          data-aos-duration='1000'
          id='accordionExample'
        >
          <div className='watchfree-title'>
            <b>WELCOME TO THE ROAD TO DHARMA</b>
            <p>YOU’VE UNLOCKED THE WHOLE COURSE – NOW UNLOCK YOUR FREEDOM</p>
          </div>
        </section>
        <section className='sec sec-cinfo sec-watchfree pt-0'>
          <div className='container'>
            <div class='col-md-12'>
              <div class='row'>
                <div className='course-title'>
                  <h5>
                    LESSON 1: <span>FREEDOM TAKES QUANTUM LEAPS </span>
                  </h5>
                </div>
                <div className='card mb-0'>
                  <div className='videos-newtabs'>
                    <div className='row'>
                      <div className='col-md-4 col-lg-4 '>
                        <div className='vid-imgdiv-new-box'>
                          <div className='vid-imgdiv-new'>
                            <img
                              src='../../images/Ep-1-Thumbnail.png'
                              className='img-fluid thumbnailImage'
                            />
                            <a
                              className='showModalVideo'
                              data-src='https://player.vimeo.com/video/392205934'
                              data-toggle='modal'
                              data-target='#myvidModal'
                              data-backdrop='static'
                              data-keyboard='false'
                            >
                              <img
                                src='../../images/play-marun.png'
                                className='img-fluid'
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className='col-md-8 col-lg-8'>
                        <div className=''>
                          <div className='lesson-accord' id='headingOne'>
                            <a
                              className='collapsed'
                              data-toggle='collapse'
                              data-target='#collapseOne'
                              aria-expanded='false'
                              aria-controls='collapseOne'
                            >
                              View Course Content
                            </a>
                          </div>
                          <div
                            id='collapseOne'
                            class='collapse'
                            aria-labelledby='headingOne'
                            data-parent='#accordionExample'
                          >
                            <div className='chapter-title chapter-title-new'>
                              <ul>
                                <li>
                                  <div className='episodeTitleWrapper'>
                                    <a
                                      className='showModalVideo episodeTitle'
                                      data-src='https://player.vimeo.com/video/392205934'
                                      data-toggle='modal'
                                      data-target='#myvidModal'
                                      data-backdrop='static'
                                      data-keyboard='false'
                                    >
                                      <img src='../../images/movie-icon.png' />
                                      EPISODE 1:
                                      <i
                                        className='fa fa-unlock-alt'
                                        aria-hidden='true'
                                        data-toggle='tooltip'
                                        data-placement='top'
                                        title='view'
                                      ></i>
                                    </a>
                                  </div>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392205934'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <span>
                                      UNFORESEEN CHALLENGES IN RISHIKESH
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <div className='episodeTitleWrapper'>
                                    <a
                                      href='/user/dharma-chapter1'
                                      className='episodeTitle'
                                    >
                                      <img src='../../images/book-icon.png' />
                                      CHAPTER 1:
                                      <i
                                        className='fa fa-unlock-alt'
                                        aria-hidden='true'
                                        data-toggle='tooltip'
                                        title='Buy to see'
                                      ></i>
                                    </a>
                                  </div>
                                  <a
                                    href='/user/dharma-chapter1'
                                    className='episodeContent'
                                  >
                                    <span>BURSTING THE BUBBLE</span>
                                  </a>
                                </li>
                                <li>
                                  <div className='episodeTitleWrapper'>
                                    <a
                                      className='episodeTitle showAudioModal'
                                      img-src='Ep-1-Thumbnail.png'
                                      data-src='https://courses.sattvaconnect.com/media/audio/Setting_the_Stage_Intro_to_the_Meditations-The_Road_to_Dharma.mp3'
                                      data-toggle='modal'
                                      data-target='#myAudioModal'
                                      data-backdrop='static'
                                      data-keyboard='false'
                                    >
                                      <img src='../../images/audio-icon.png' />
                                      MEDITATION INTRO:
                                      <i
                                        className='fa fa-unlock-alt'
                                        aria-hidden='true'
                                        data-toggle='tooltip'
                                        title='Buy to see'
                                      ></i>
                                    </a>
                                    <a
                                      href='https://courses.sattvaconnect.com/course-chapter/download.php?file=https://courses.sattvaconnect.com/media/audio/Setting_the_Stage_Intro_to_the_Meditations-The_Road_to_Dharma.mp3'
                                      download
                                    >
                                      <i
                                        class='fa fa-download'
                                        aria-hidden='true'
                                        data-toggle='tooltip'
                                        title='Download'
                                      ></i>
                                    </a>
                                  </div>
                                  <a
                                    className='episodeContent showAudioModal'
                                    img-src='Ep-1-Thumbnail.png'
                                    data-src='https://courses.sattvaconnect.com/media/audio/Setting_the_Stage_Intro_to_the_Meditations-The_Road_to_Dharma.mp3'
                                    data-toggle='modal'
                                    data-target='#myAudioModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <span>AN INTRO TO THESE MEDITATIONS</span>
                                  </a>
                                </li>
                                <li>
                                  <div className='episodeTitleWrapper'>
                                    <a
                                      className='episodeContent showAudioModal'
                                      img-src='Ep-1-Thumbnail.png'
                                      data-src='https://courses.sattvaconnect.com/media/audio/Ch_1_Meditation-The_Road_to_Dharma.mp3'
                                      data-toggle='modal'
                                      data-target='#myAudioModal'
                                      data-backdrop='static'
                                      data-keyboard='false'
                                    >
                                      <img src='../../images/audio-icon.png' />
                                      MEDITATION 1:
                                      <i
                                        className='fa fa-unlock-alt'
                                        aria-hidden='true'
                                        data-toggle='tooltip'
                                        title='Buy to see'
                                      ></i>
                                    </a>
                                    <a
                                      href='https://courses.sattvaconnect.com/course-chapter/download.php?file=https://courses.sattvaconnect.com/media/audio/Ch_1_Meditation-The_Road_to_Dharma.mp3'
                                      download
                                    >
                                      <i
                                        class='fa fa-download'
                                        aria-hidden='true'
                                        data-toggle='tooltip'
                                        title='Download'
                                      ></i>
                                    </a>
                                  </div>
                                  <a
                                    className='episodeContent showAudioModal'
                                    img-src='Ep-1-Thumbnail.png'
                                    data-src='https://courses.sattvaconnect.com/media/audio/Ch_1_Meditation-The_Road_to_Dharma.mp3'
                                    data-toggle='modal'
                                    data-target='#myAudioModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <span>
                                      COSMIC BREATHS 1,2 and EXPANDING OUR
                                      ENERGY
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <div className='episodeTitleWrapper'>
                                    <a
                                      className='showModalVideo episodeContent'
                                      data-src='https://player.vimeo.com/video/392295964'
                                      data-toggle='modal'
                                      data-target='#myvidModal'
                                      data-backdrop='static'
                                      data-keyboard='false'
                                    >
                                      <img src='../../images/movie-icon.png' />
                                      DEEP DHARMA TALKS FROM ANAND :
                                      <i
                                        className='fa fa-unlock-alt'
                                        aria-hidden='true'
                                        data-toggle='tooltip'
                                        title='Buy to see'
                                      ></i>
                                    </a>
                                  </div>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392295964'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <span> MORE LOVE THAN FEAR</span>
                                  </a>
                                </li>
                                <li>
                                  <div className='episodeTitleWrapper'>
                                    <a
                                      className='showModalVideo episodeTitle'
                                      data-src='https://player.vimeo.com/video/392297825'
                                      data-toggle='modal'
                                      data-target='#myvidModal'
                                      data-backdrop='static'
                                      data-keyboard='false'
                                    >
                                      <img src='../../images/movie-icon.png' />
                                      DEEP DHARMA TALKS FROM ANAND :
                                      <i
                                        className='fa fa-unlock-alt'
                                        aria-hidden='true'
                                        data-toggle='tooltip'
                                        title='Buy to see'
                                      ></i>
                                    </a>
                                  </div>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392297825'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <span>MAKING THE QUANTUM LEAP</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='course-title'>
                  <h5>
                    LESSON 2:{' '}
                    <span>FREEDOM FROM THE STORIES THAT BIND US </span>
                  </h5>
                </div>
                <div class='card mb-0'>
                  <div class='videos-newtabs'>
                    <div class='row'>
                      <div class='col-md-4 col-lg-4 '>
                        <div class='vid-imgdiv-new-box'>
                          <div class='vid-imgdiv-new'>
                            <img
                              src='../../images/Ep-2-Thumbnail.png'
                              class='img-fluid thumbnailImage'
                            />
                            <a
                              className='showModalVideo'
                              data-src='https://player.vimeo.com/video/392210243'
                              data-toggle='modal'
                              data-target='#myvidModal'
                              data-backdrop='static'
                              data-keyboard='false'
                            >
                              <img
                                src='../../images/play-marun.png'
                                class='img-fluid'
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class='col-md-8 col-lg-8'>
                        <div class=''>
                          <div className='lesson-accord' id='headingOne'>
                            <a
                              className='collapsed'
                              data-toggle='collapse'
                              data-target='#collapsetwo'
                              aria-expanded='false'
                              aria-controls='collapsetwo'
                            >
                              View Course Content
                            </a>
                          </div>
                          <div
                            id='collapsetwo'
                            class='collapse'
                            aria-labelledby='headingtwo'
                            data-parent='#accordionExample'
                          >
                            <div class='chapter-title chapter-title-new'>
                              <ul>
                                <li>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392210243'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/movie-icon.png' />
                                    EPISODE 2:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      data-placement='top'
                                      title='view'
                                    ></i>
                                    <span>
                                      A TREACHEROUS NIGHT TO END THE STORY
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='episodeContent'
                                    href='/user/dharma-chapter2'
                                  >
                                    <img src='../../images/book-icon.png' />
                                    CHAPTER 2:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>TIME TO LEAVE HOME</span>
                                  </a>
                                </li>
                                <li>
                                  <div className='episodeTitleWrapper'>
                                    <a
                                      className='episodeContent showAudioModal'
                                      img-src='Ep-2-Thumbnail.png'
                                      data-src='https://courses.sattvaconnect.com/media/audio/Ch_2_Meditation-The_Road_to_Dharma.mp3'
                                      data-toggle='modal'
                                      data-target='#myAudioModal'
                                      data-backdrop='static'
                                      data-keyboard='false'
                                    >
                                      <img src='../../images/audio-icon.png' />
                                      MEDITATION 2:
                                      <i
                                        class='fa fa-unlock-alt'
                                        aria-hidden='true'
                                        data-toggle='tooltip'
                                        title='Buy to see'
                                      ></i>
                                    </a>
                                    <a
                                      href='https://courses.sattvaconnect.com/course-chapter/download.php?file=https://courses.sattvaconnect.com/media/audio/Ch_2_Meditation-The_Road_to_Dharma.mp3'
                                      download
                                    >
                                      <i
                                        class='fa fa-download'
                                        aria-hidden='true'
                                        data-toggle='tooltip'
                                        title='Download'
                                      ></i>
                                    </a>
                                  </div>
                                  <a
                                    className='episodeContent showAudioModal'
                                    img-src='Ep-2-Thumbnail.png'
                                    data-src='https://courses.sattvaconnect.com/media/audio/Ch_2_Meditation-The_Road_to_Dharma.mp3'
                                    data-toggle='modal'
                                    data-target='#myAudioModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <span>
                                      BREATH OF LIGHT &amp; BEYOND - BRINGING IN
                                      THE LIGHT
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <div className='episodeTitleWrapper'>
                                    <a
                                      className='showModalVideo episodeContent'
                                      data-src='https://player.vimeo.com/video/392289627'
                                      data-toggle='modal'
                                      data-target='#myvidModal'
                                      data-backdrop='static'
                                      data-keyboard='false'
                                    >
                                      <img src='../../images/movie-icon.png' />
                                      DEEP DHARMA TALKS FROM ANAND:
                                      <i
                                        class='fa fa-unlock-alt'
                                        aria-hidden='true'
                                        data-toggle='tooltip'
                                        title='Buy to see'
                                      ></i>
                                    </a>
                                  </div>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392289627'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <span>
                                      PILGRIMAGE PUJA, SEE IT AS IT HAPPENS
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='course-title'>
                  <h5>
                    LESSON 3: <span>FREEDOM FROM THE EGO</span>
                  </h5>
                </div>
                <div class='card mb-0'>
                  <div class='videos-newtabs'>
                    <div class='row'>
                      <div class='col-md-4 col-lg-4 '>
                        <div class='vid-imgdiv-new-box'>
                          <div class='vid-imgdiv-new'>
                            <img
                              src='../../images/Ep-3-Thumbnail.png'
                              class='img-fluid thumbnailImage'
                            />
                            <a
                              className='showModalVideo'
                              data-src='https://player.vimeo.com/video/392214773'
                              data-toggle='modal'
                              data-target='#myvidModal'
                              data-backdrop='static'
                              data-keyboard='false'
                            >
                              <img
                                src='../../images/play-marun.png'
                                class='img-fluid'
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class='col-md-8 col-lg-8'>
                        <div class=''>
                          <div className='lesson-accord' id='headingOne'>
                            <a
                              className='collapsed'
                              data-toggle='collapse'
                              data-target='#collapsethree'
                              aria-expanded='false'
                              aria-controls='collapsethree'
                            >
                              View Course Content
                            </a>
                          </div>
                          <div
                            id='collapsethree'
                            class='collapse'
                            aria-labelledby='headingthree'
                            data-parent='#accordionExample'
                          >
                            <div class='chapter-title chapter-title-new'>
                              <ul>
                                <li>
                                  <div className='episodeTitleWrapper'>
                                    <a
                                      className='showModalVideo episodeTitle'
                                      data-src='https://player.vimeo.com/video/392214773'
                                      data-toggle='modal'
                                      data-target='#myvidModal'
                                      data-backdrop='static'
                                      data-keyboard='false'
                                    >
                                      <img src='../../images/movie-icon.png' />
                                      EPISODE 3:
                                      <i
                                        class='fa fa-unlock-alt'
                                        aria-hidden='true'
                                        data-toggle='tooltip'
                                        data-placement='top'
                                        title='view'
                                      ></i>
                                    </a>
                                  </div>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392214773'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <span>DEATH OF THE EGO AT KEDARNATH</span>
                                  </a>
                                </li>
                                <li>
                                  <div className='episodeTitleWrapper'>
                                    <a
                                      class='episodeTitle'
                                      href='/user/dharma-chapter3'
                                    >
                                      <img src='../../images/book-icon.png' />
                                      CHAPTER 3:
                                      <i
                                        class='fa fa-unlock-alt'
                                        aria-hidden='true'
                                        data-toggle='tooltip'
                                        data-placement='top'
                                        title='view'
                                      ></i>
                                    </a>
                                  </div>
                                  <a
                                    class='episodeContent'
                                    href='/user/dharma-chapter3'
                                  >
                                    <span>OVERCOMING CRAVING AND AVERSION</span>
                                  </a>
                                </li>
                                <li>
                                  <div className='episodeTitleWrapper'>
                                    <a
                                      className='episodeTitle showAudioModal'
                                      img-src='Ep-3-Thumbnail.png'
                                      data-src='https://courses.sattvaconnect.com/media/audio/Setting_the_Stage_Intro_to_the_Meditations-The_Road_to_Dharma.mp3'
                                      data-toggle='modal'
                                      data-target='#myAudioModal'
                                      data-backdrop='static'
                                      data-keyboard='false'
                                    >
                                      <img src='../../images/audio-icon.png' />
                                      MEDITATION INTRO:
                                      <i
                                        class='fa fa-unlock-alt'
                                        aria-hidden='true'
                                        data-toggle='tooltip'
                                        data-placement='top'
                                        title='view'
                                      ></i>
                                    </a>
                                    <a
                                      href='https://courses.sattvaconnect.com/course-chapter/download.php?file=https://courses.sattvaconnect.com/media/audio/Setting_the_Stage_Intro_to_the_Meditations-The_Road_to_Dharma.mp3'
                                      download
                                    >
                                      <i
                                        class='fa fa-download'
                                        aria-hidden='true'
                                        data-toggle='tooltip'
                                        title='Download'
                                      ></i>
                                    </a>
                                  </div>
                                  <a
                                    className='episodeContent showAudioModal'
                                    img-src='Ep-3-Thumbnail.png'
                                    data-src='https://courses.sattvaconnect.com/media/audio/Setting_the_Stage_Intro_to_the_Meditations-The_Road_to_Dharma.mp3'
                                    data-toggle='modal'
                                    data-target='#myAudioModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <span>
                                      LISTEN TO THIS BEFORE MEDITATION 3
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <div className='episodeTitleWrapper'>
                                    <a
                                      className='episodeTitle showAudioModal'
                                      img-src='Ep-3-Thumbnail.png'
                                      data-src='https://courses.sattvaconnect.com/media/audio/Ch_3_Meditation-The_Road_to_Dharma.mp3'
                                      data-toggle='modal'
                                      data-target='#myAudioModal'
                                      data-backdrop='static'
                                      data-keyboard='false'
                                    >
                                      <img src='../../images/audio-icon.png' />
                                      MEDITATION 3:
                                      <i
                                        class='fa fa-unlock-alt'
                                        aria-hidden='true'
                                        data-toggle='tooltip'
                                        data-placement='top'
                                        title='view'
                                      ></i>
                                    </a>
                                    <a
                                      href='https://courses.sattvaconnect.com/course-chapter/download.php?file=https://courses.sattvaconnect.com/media/audio/Ch_3_Meditation-The_Road_to_Dharma.mp3'
                                      download
                                    >
                                      <i
                                        class='fa fa-download'
                                        aria-hidden='true'
                                        data-toggle='tooltip'
                                        title='Download'
                                      ></i>
                                    </a>
                                  </div>
                                  <a
                                    className='episodeContent showAudioModal'
                                    img-src='Ep-3-Thumbnail.png'
                                    data-src='https://courses.sattvaconnect.com/media/audio/Ch_3_Meditation-The_Road_to_Dharma.mp3'
                                    data-toggle='modal'
                                    data-target='#myAudioModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <span>
                                      BREATHS FOR STRENGTH AMIDST DIFFICULTY –
                                      MANTRA TO TRANSCEND
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392292837'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/movie-icon.png' />
                                    DEEP DHARMA TALKS FROM ANAND :
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>
                                      FULL LENGTH 45 min TALK AT KEDARNATH
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='noteText'>
                  <h6>
                    You can return to this page anytime:
                    https://courses.sattvaconnect.com or
                    http://www.dharmacourses.com and click on Login (Top Right
                    of the Web Page) and enter your username and password.{' '}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className='secSlide secSlideBefore testimonialSlide'>
          <div className='slide-container'>
            <Fade indicators={true} duration={4000}>
              <div className='each-fade'>
                <img src='../../images/roadtodharma/slide3.jpg' />
                <div className='slideBox'>
                  <div className='container pt-5'>
                    <div className='row row justify-content-center'>
                      <div className='col-xl-8 col-lg-9 col-md-9 col-sm-10 col-10'>
                        <div className='slideContent text-center'>
                          <h4>"A REVOLUTIONARY DOCUSERIES</h4>
                          <h4>& Online Course format that takes you on the</h4>
                          <h4>JOURNEY OF A LIFETIME!"</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='each-fade'>
                <img src='../../images/roadtodharma/slide6.jpg' />
                <div className='slideBox'>
                  <div className='container pt-5'>
                    <div className='row row justify-content-center'>
                      <div className='col-xl-9 col-lg-11 col-md-10 col-sm-10 col-10'>
                        <div className='slideContent text-center animated fadeInRight'>
                          <h4>
                            "I BINGE- WATCHED{' '}
                            <span className='textLight'>the episodes.</span>
                          </h4>
                          <h4>
                            <span className='textLight'>
                              The meditations by Adam are
                            </span>{' '}
                            BEAUTIFULLY GUIDED,{' '}
                          </h4>
                          <h4>
                            <span className='textLight'>he is a</span> NATURAL
                            TEACHER."{' '}
                          </h4>
                          <p className='mt-3'>– Brooke Martin</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='each-fade'>
                <img src='../../images/roadtodharma/slide4.jpg' />
                <div className='slideBox'>
                  <div className='container pt-5'>
                    <div className='row row justify-content-center'>
                      <div className='col-xl-7 col-lg-7 col-md-7 col-sm-8 col-10'>
                        <div className='slideContent text-center animated fadeInRight'>
                          <h4>
                            <span className='textLight'>
                              "I've done many courses over the years, and this
                              is
                            </span>{' '}
                            BY FAR THE MOST REMARKABLE."
                          </h4>
                          <p className='mt-3'>– Bonnie Evoy</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </div>

        <section className='testimonialDiv'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 unloc-whole-course-box'>
                <h5 className='unloc-whole-course-title'>
                  WELCOME TO THE FULL COURSE/SERIES
                </h5>
                <h5>LIVE Q&A DATES WILL BE ANNOUNCED IN MARCH</h5>
                <h5>
                  JOIN THE FACEBOOK DISCUSSION GROUP NOW BY CLICKING IN THE
                  BONUS GIFT SECTION
                </h5>
              </div>
            </div>
          </div>
        </section>
        <section className='sec sec-cinfo sec-watchfree'>
          <div className='container'>
            <div class='col-md-12'>
              <div class='row'>
                <div class='course-title'>
                  <h5>
                    LESSON 4: <span>FREEDOM FROM THE VIOLENCE WITHIN </span>
                  </h5>
                </div>
                <div class='card mb-0'>
                  <div class='videos-newtabs'>
                    <div class='row'>
                      <div class='col-md-4 col-lg-4 '>
                        <div class='vid-imgdiv-new-box'>
                          <div class='vid-imgdiv-new'>
                            <img
                              src='../../images/Ep-4-Thumbnail.png'
                              class='img-fluid thumbnailImage'
                            />
                            <a
                              className='showModalVideo'
                              data-src='https://player.vimeo.com/video/392219342'
                              data-toggle='modal'
                              data-target='#myvidModal'
                              data-backdrop='static'
                              data-keyboard='false'
                            >
                              <img
                                src='../../images/play-marun.png'
                                class='img-fluid'
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class='col-md-8 col-lg-8'>
                        <div class=''>
                          <div className='lesson-accord' id='headingOne'>
                            <a
                              className='collapsed'
                              data-toggle='collapse'
                              data-target='#collapsefour'
                              aria-expanded='false'
                              aria-controls='collapsefour'
                            >
                              View Course Content
                            </a>
                          </div>
                          <div
                            id='collapsefour'
                            class='collapse'
                            aria-labelledby='headingfour'
                            data-parent='#accordionExample'
                          >
                            <div class='chapter-title chapter-title-new'>
                              <ul>
                                <li>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392219342'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/movie-icon.png' />
                                    EPISODE 4:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>
                                      TIFFANY’S INNER VIOLENCE WAITING TO HAPPEN{' '}
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='episodeContent'
                                    href='/user/dharma-chapter4'
                                  >
                                    <img src='../../images/book-icon.png' />
                                    CHAPTER 4:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span> THE END OF VIOLENCE WITHIN</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='episodeContent showAudioModal'
                                    img-src='Ep-4-Thumbnail.png'
                                    data-src='https://courses.sattvaconnect.com/media/audio/Ch_4_Meditation-The_Road_to_Dharma.mp3'
                                    data-toggle='modal'
                                    data-target='#myAudioModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/audio-icon.png' />
                                    MEDITATION 4:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>
                                      {' '}
                                      STABILIZING, BALANCING, RELEASING ANXIETY
                                      – I AM LOVE
                                    </span>
                                  </a>
                                  <a
                                    href='https://courses.sattvaconnect.com/course-chapter/download.php?file=https://courses.sattvaconnect.com/media/audio/Ch_4_Meditation-The_Road_to_Dharma.mp3'
                                    class='download-m'
                                    download
                                  >
                                    <i
                                      class='fa fa-download'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Download'
                                    ></i>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392287647'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/movie-icon.png' />
                                    DEEP DHARMA TALKS FROM ANAND :
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>
                                      {' '}
                                      EMBRACING THE UNKOWN, CUNNING MIND
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class='course-title'>
                  <h5>
                    LESSON 5: <span>FREEDOM IN THE GAP</span>
                  </h5>
                </div>
                <div class='card mb-0'>
                  <div class='videos-newtabs'>
                    <div class='row'>
                      <div class='col-md-4 col-lg-4 '>
                        <div class='vid-imgdiv-new-box'>
                          <div class='vid-imgdiv-new'>
                            <img
                              src='../../images/Ep-5-Thumbnail.png'
                              class='img-fluid thumbnailImage'
                            />
                            <a
                              className='showModalVideo'
                              data-src='https://player.vimeo.com/video/392224010'
                              data-toggle='modal'
                              data-target='#myvidModal'
                              data-backdrop='static'
                              data-keyboard='false'
                            >
                              <img
                                src='../../images/play-marun.png'
                                class='img-fluid'
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class='col-md-8 col-lg-8'>
                        <div class=''>
                          <div className='lesson-accord' id='headingOne'>
                            <a
                              className='collapsed'
                              data-toggle='collapse'
                              data-target='#collapsefive'
                              aria-expanded='false'
                              aria-controls='collapsefive'
                            >
                              View Course Content
                            </a>
                          </div>
                          <div
                            id='collapsefive'
                            className='collapse'
                            aria-labelledby='headingfive'
                            data-parent='#accordionExample'
                          >
                            <div class='chapter-title chapter-title-new'>
                              <ul>
                                <li>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392224010'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/movie-icon.png' />
                                    EPISODE 5:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>
                                      TUNGNATH – AN UNEXPLAINABLE EXPERIENCE
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='episodeContent'
                                    href='/user/dharma-chapter5'
                                  >
                                    <img src='../../images/book-icon.png' />
                                    CHAPTER 5:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>
                                      FREEDOM IN THE GAP, PURE POWER AT TUNGNATH
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='episodeContent showAudioModal'
                                    img-src='Ep-5-Thumbnail.png'
                                    data-src='https://courses.sattvaconnect.com/media/audio/Ch_5_Meditation-The_Road_to_Dharma.mp3'
                                    data-toggle='modal'
                                    data-target='#myAudioModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/audio-icon.png' />
                                    MEDITATION 5:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>
                                      THE QUANTUM FIELD, COSMIC 3, &amp;
                                      CREATION AFTER DESTRUCTION
                                    </span>
                                  </a>
                                  <a
                                    href='https://courses.sattvaconnect.com/course-chapter/download.php?file=https://courses.sattvaconnect.com/media/audio/Ch_5_Meditation-The_Road_to_Dharma.mp3'
                                    class='download-m'
                                    download
                                  >
                                    <i
                                      class='fa fa-download'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Download'
                                    ></i>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392283278'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/movie-icon.png' />
                                    DEEP DHARMA TALKS FROM ANAND :
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>
                                      YOU ARE THE PATH, YOU NEVER GO BACK
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class='course-title'>
                  <h5>
                    LESSON 6: <span>FREEDOM IN RELATIONSHIP</span>
                  </h5>
                </div>
                <div class='card mb-0'>
                  <div class='videos-newtabs'>
                    <div class='row'>
                      <div class='col-md-4 col-lg-4 '>
                        <div class='vid-imgdiv-new-box'>
                          <div class='vid-imgdiv-new'>
                            <img
                              src='../../images/Ep-6-Thumbnail.png'
                              class='img-fluid thumbnailImage'
                            />
                            <a
                              className='showModalVideo'
                              data-src='https://player.vimeo.com/video/392231615'
                              data-toggle='modal'
                              data-target='#myvidModal'
                              data-backdrop='static'
                              data-keyboard='false'
                            >
                              <img
                                src='../../images/play-marun.png'
                                class='img-fluid'
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class='col-md-8 col-lg-8'>
                        <div class=''>
                          <div className='lesson-accord' id='headingOne'>
                            <a
                              className='collapsed'
                              data-toggle='collapse'
                              data-target='#collapsesix'
                              aria-expanded='false'
                              aria-controls='collapsesix'
                            >
                              View Course Content
                            </a>
                          </div>
                          <div
                            id='collapsesix'
                            className='collapse'
                            aria-labelledby='headingsix'
                            data-parent='#accordionExample'
                          >
                            <div class='chapter-title chapter-title-new'>
                              <ul>
                                <li>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392231615'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/movie-icon.png' />
                                    EPISODE 6:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>
                                      JEFF AND JEN – TRUE LOVE AT BADRINATH
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='episodeContent'
                                    href='/user/dharma-chapter6'
                                  >
                                    <img src='../../images/book-icon.png' />
                                    CHAPTER 6:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>FREEDOM IN RELATIONSHIP</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='episodeContent showAudioModal'
                                    img-src='Ep-6-Thumbnail.png'
                                    data-src='https://courses.sattvaconnect.com/media/audio/Ch_6_Meditation-The_Road_to_Dharma.mp3'
                                    data-toggle='modal'
                                    data-target='#myAudioModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/audio-icon.png' />
                                    MEDITATION 6:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>
                                      CULTIVATING HUMBLE RECEPTIVITY &amp;
                                      SUSTAINANCE
                                    </span>
                                  </a>
                                  <a
                                    href='https://courses.sattvaconnect.com/course-chapter/download.php?file=https://courses.sattvaconnect.com/media/audio/Ch_6_Meditation-The_Road_to_Dharma.mp3'
                                    class='download-m'
                                    download
                                  >
                                    <i
                                      class='fa fa-download'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Download'
                                    ></i>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392264152'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/movie-icon.png' />
                                    DEEP DHARMA TALKS FROM ANAND :
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>THE TRUTH ABOUT RELATING</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class='course-title'>
                  <h5>
                    LESSON 7: <span>FREEDOM IN PERSONAL POWER</span>
                  </h5>
                </div>
                <div class='card mb-0'>
                  <div class='videos-newtabs'>
                    <div class='row'>
                      <div class='col-md-4 col-lg-4 '>
                        <div class='vid-imgdiv-new-box'>
                          <div class='vid-imgdiv-new'>
                            <img
                              src='../../images/Ep-7-Thumbnail.png'
                              class='img-fluid thumbnailImage'
                            />
                            <a
                              className='showModalVideo'
                              data-src='https://player.vimeo.com/video/392237809'
                              data-toggle='modal'
                              data-target='#myvidModal'
                              data-backdrop='static'
                              data-keyboard='false'
                            >
                              <img
                                src='../../images/play-marun.png'
                                class='img-fluid'
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class='col-md-8 col-lg-8'>
                        <div class=''>
                          <div className='lesson-accord' id='headingOne'>
                            <a
                              className='collapsed'
                              data-toggle='collapse'
                              data-target='#collapseseven'
                              aria-expanded='false'
                              aria-controls='collapseseven'
                            >
                              View Course Content
                            </a>
                          </div>
                          <div
                            id='collapseseven'
                            className='collapse'
                            aria-labelledby='headingseven'
                            data-parent='#accordionExample'
                          >
                            <div class='chapter-title chapter-title-new'>
                              <ul>
                                <li>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392237809'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/movie-icon.png' />
                                    EPISODE 7:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>
                                      TRUE POWER IN THE HIDDEN VALLEY OF THE
                                      FLOWERS
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='episodeContent'
                                    href='/user/dharma-chapter7'
                                  >
                                    <img src='../../images/book-icon.png' />
                                    CHAPTER 7:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>FREEDOM IN PERSONAL POWER</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='episodeContent showAudioModal'
                                    img-src='Ep-7-Thumbnail.png'
                                    data-src='https://courses.sattvaconnect.com/media/audio/Ch_7_Meditation-The_Road_to_Dharma.mp3'
                                    data-toggle='modal'
                                    data-target='#myAudioModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/audio-icon.png' />
                                    MEDITATION 7:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>
                                      CULTIVATING PERSONAL POWER, KRIYAS &amp;
                                      COMPASSION
                                    </span>
                                  </a>
                                  <a
                                    href='https://courses.sattvaconnect.com/course-chapter/download.php?file=https://courses.sattvaconnect.com/media/audio/Ch_7_Meditation-The_Road_to_Dharma.mp3'
                                    class='download-m'
                                    download
                                  >
                                    <i
                                      class='fa fa-download'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Download'
                                    ></i>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392279223'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/movie-icon.png' />
                                    DEEP DHARMA TALKS FROM ANAND :
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>
                                      DHARMA IS OUR DUTY, WE COME TO TRANSCEND
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class='course-title'>
                  <h5>
                    LESSON 8: <span>FREEDOM IN PURPOSE &amp; SERVICE</span>
                  </h5>
                </div>
                <div class='card mb-0'>
                  <div class='videos-newtabs'>
                    <div class='row'>
                      <div class='col-md-4 col-lg-4 '>
                        <div class='vid-imgdiv-new-box'>
                          <div class='vid-imgdiv-new'>
                            <img
                              src='../../images/Ep-8-Thumbnail.png'
                              class='img-fluid thumbnailImage'
                            />
                            <a
                              className='showModalVideo'
                              data-src='https://player.vimeo.com/video/392247276'
                              data-toggle='modal'
                              data-target='#myvidModal'
                              data-backdrop='static'
                              data-keyboard='false'
                            >
                              <img
                                src='../../images/play-marun.png'
                                class='img-fluid'
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class='col-md-8 col-lg-8'>
                        <div class=''>
                          <div className='lesson-accord' id='headingOne'>
                            <a
                              className='collapsed'
                              data-toggle='collapse'
                              data-target='#collapseeight'
                              aria-expanded='false'
                              aria-controls='collapseeight'
                            >
                              View Course Content
                            </a>
                          </div>
                          <div
                            id='collapseeight'
                            className='collapse'
                            aria-labelledby='headingeight'
                            data-parent='#accordionExample'
                          >
                            <div class='chapter-title chapter-title-new'>
                              <ul>
                                <li>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392247276'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/movie-icon.png' />
                                    EPISODE 8:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>UNITY AT HEMKUND SAHIB</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='episodeContent'
                                    href='/user/dharma-chapter8'
                                  >
                                    <img src='../../images/book-icon.png' />
                                    CHAPTER 8:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>
                                      FREEDOM IN PURPOSE &amp; SERVICE
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='episodeContent showAudioModal'
                                    img-src='Ep-8-Thumbnail.png'
                                    data-src='https://courses.sattvaconnect.com/media/audio/Ch_8_Meditation-The_Road_to_Dharma.mp3'
                                    data-toggle='modal'
                                    data-target='#myAudioModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/audio-icon.png' />
                                    MEDITATION 8:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>
                                      FINDING CLARITY &amp; THE TEACHER WITHIN
                                    </span>
                                  </a>
                                  <a
                                    href='https://courses.sattvaconnect.com/course-chapter/download.php?file=https://courses.sattvaconnect.com/media/audio/Ch_8_Meditation-The_Road_to_Dharma.mp3'
                                    class='download-m'
                                    download
                                  >
                                    <i
                                      class='fa fa-download'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Download'
                                    ></i>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392270053'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/movie-icon.png' />
                                    DEEP DHARMA TALKS FROM ANAND :
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>ACCESSING TRUE ABUNDANCE</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class='course-title'>
                  <h5>
                    LESSON 9: <span>FREEDOM IN PRINCIPLES</span>
                  </h5>
                </div>
                <div class='card mb-0'>
                  <div class='videos-newtabs'>
                    <div class='row'>
                      <div class='col-md-4 col-lg-4 '>
                        <div class='vid-imgdiv-new-box'>
                          <div class='vid-imgdiv-new'>
                            <img
                              src='../../images/Ep-9-Thumbnail.png'
                              class='img-fluid thumbnailImage'
                            />
                            <a
                              className='showModalVideo'
                              data-src='https://player.vimeo.com/video/392251822'
                              data-toggle='modal'
                              data-target='#myvidModal'
                              data-backdrop='static'
                              data-keyboard='false'
                            >
                              <img
                                src='../../images/play-marun.png'
                                class='img-fluid'
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class='col-md-8 col-lg-8'>
                        <div class=''>
                          <div className='lesson-accord' id='headingOne'>
                            <a
                              className='collapsed'
                              data-toggle='collapse'
                              data-target='#collapsenine'
                              aria-expanded='false'
                              aria-controls='collapsenine'
                            >
                              View Course Content
                            </a>
                          </div>
                          <div
                            id='collapsenine'
                            className='collapse'
                            aria-labelledby='headingnine'
                            data-parent='#accordionExample'
                          >
                            <div class='chapter-title chapter-title-new'>
                              <ul>
                                <li>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392251822'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/movie-icon.png' />
                                    EPISODE 9:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>A TREACHEROUS RIDE HOME</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='episodeContent'
                                    href='/user/dharma-chapter9'
                                  >
                                    <img src='../../images/book-icon.png' />
                                    CHAPTER 9:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span> FIND FREEDOM IN PRINCIPLES</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='episodeContent showAudioModal'
                                    img-src='Ep-9-Thumbnail.png'
                                    data-src='https://courses.sattvaconnect.com/media/audio/Ch_9_Meditation-The_Road_to_Dharma.mp3'
                                    data-toggle='modal'
                                    data-target='#myAudioModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/audio-icon.png' />
                                    MEDITATION 9:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>
                                      COMPASSION FOR SELF, BREATH OF LIGHT,
                                      SUHKA SHUNYA
                                    </span>
                                  </a>
                                  <a
                                    href='https://courses.sattvaconnect.com/course-chapter/download.php?file=https://courses.sattvaconnect.com/media/audio/Ch_9_Meditation-The_Road_to_Dharma.mp3'
                                    class='download-m'
                                    download
                                  >
                                    <i
                                      class='fa fa-download'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Download'
                                    ></i>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392271498'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/movie-icon.png' />
                                    DEEP DHARMA TALKS FROM ANAND :
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>
                                      THE WORLD INSIDE YOU, LEAPING BEYOND STORY
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class='course-title'>
                  <h5>
                    LESSON 10: <span>FREEDOM IN EXPANSION</span>
                  </h5>
                </div>
                <div class='card mb-0'>
                  <div class='videos-newtabs'>
                    <div class='row'>
                      <div class='col-md-4 col-lg-4 '>
                        <div class='vid-imgdiv-new-box'>
                          <div class='vid-imgdiv-new'>
                            <img
                              src='../../images/Ep-10-Thumbnail.png'
                              class='img-fluid thumbnailImage'
                            />
                            <a
                              className='showModalVideo'
                              data-src='https://player.vimeo.com/video/392257290'
                              data-toggle='modal'
                              data-target='#myvidModal'
                              data-backdrop='static'
                              data-keyboard='false'
                            >
                              <img
                                src='../../images/play-marun.png'
                                class='img-fluid'
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class='col-md-8 col-lg-8'>
                        <div class=''>
                          <div className='lesson-accord' id='headingOne'>
                            <a
                              className='collapsed'
                              data-toggle='collapse'
                              data-target='#collapseten'
                              aria-expanded='false'
                              aria-controls='collapseten'
                            >
                              View Course Content
                            </a>
                          </div>
                          <div
                            id='collapseten'
                            className='collapse'
                            aria-labelledby='headingten'
                            data-parent='#accordionExample'
                          >
                            <div class='chapter-title chapter-title-new'>
                              <ul>
                                <li>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392257290'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/movie-icon.png' />
                                    EPISODE 10:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>WE ARE GREATER THAN WE KNOW</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='episodeContent'
                                    href='/user/dharma-chapter10'
                                  >
                                    <img src='../../images/book-icon.png' />
                                    CHAPTER 10:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>FREEDOM IN EXPANSION</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='episodeContent showAudioModal'
                                    img-src='Ep-10-Thumbnail.png'
                                    data-src='https://courses.sattvaconnect.com/media/audio/Ch_10_Meditation-The_Road_to_Dharma.mp3'
                                    data-toggle='modal'
                                    data-target='#myAudioModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/audio-icon.png' />
                                    MEDITATION 10:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>
                                      IGNITING GREATER SELF AND RESPONSIBILITY
                                    </span>
                                  </a>
                                  <a
                                    href='https://courses.sattvaconnect.com/course-chapter/download.php?file=https://courses.sattvaconnect.com/media/audio/Ch_10_Meditation-The_Road_to_Dharma.mp3'
                                    class='download-m'
                                    download
                                  >
                                    <i
                                      class='fa fa-download'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Download'
                                    ></i>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392276084'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/movie-icon.png' />
                                    DEEP DHARMA TALKS FROM ANAND:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>RESPONSIBILITY</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392275426'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/movie-icon.png' />
                                    DEEP DHARMA TALKS FROM ANAND:
                                    <i
                                      class='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>ARCHETYPES</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='course-title'>
                  <h5>BONUS GIFTS WITH PURCHASE</h5>
                </div>
                <div className='card mb-0'>
                  <div className='videos-newtabs'>
                    <div className='row'>
                      <div className='col-md-4 col-lg-4 '>
                        <div className='vid-imgdiv-new-box'>
                          <div className='vid-imgdiv-new'>
                            <img
                              src='../../images/anandji1.jpg'
                              className='img-fluid'
                            />
                            <a
                              className='showModalVideo episodeContent'
                              data-src='https://player.vimeo.com/video/392256539'
                              data-toggle='modal'
                              data-target='#myvidModal'
                              data-backdrop='static'
                              data-keyboard='false'
                            >
                              <img
                                src='../../images/play-marun.png'
                                className='img-fluid'
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className='col-md-8 col-lg-8'>
                        <div className=''>
                          <div className='lesson-accord' id='headingOne'>
                            <a
                              className='collapsed'
                              data-toggle='collapse'
                              data-target='#collapseeleven'
                              aria-expanded='false'
                              aria-controls='collapseeleven'
                            >
                              View Course Content
                            </a>
                          </div>
                          <div
                            id='collapseeleven'
                            className='collapse'
                            aria-labelledby='headingeleven'
                            data-parent='#accordionExample'
                          >
                            <div className='chapter-title chapter-title-new'>
                              <ul>
                                <li>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/392256539'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/movie-icon.png' />
                                    SPECIAL INTERVIEW WITH ANAND:
                                    <i
                                      className='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>
                                      HIS GURU & GROWING UP IN RISHIKESH
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='showModalVideo episodeContent'
                                    data-src='https://player.vimeo.com/video/501116804'
                                    data-toggle='modal'
                                    data-target='#myvidModal'
                                    data-backdrop='static'
                                    data-keyboard='false'
                                  >
                                    <img src='../../images/movie-icon.png' />
                                    LIVE Q&A :
                                    <i
                                      className='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>
                                      Q & A with ANAND MEHROTRA and ADAM SCHOMER
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='episodeContent'
                                    href='../../file/Eight-Fold-Path.pdf'
                                    target='_blank'
                                  >
                                    <img src='../../images/book-icon.png' />
                                    BONUS CHAPTER:
                                    <i
                                      className='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>
                                      BUDDHA’S EIGHTFOLD PATH & THE ROAD TO
                                      DHARMA
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className='episodeContent'
                                    href='https://www.facebook.com/groups/121243785870154'
                                    target='_blank'
                                  >
                                    <img src='../../images/movie-icon.png' />
                                    GROUP DISCUSSION:
                                    <i
                                      className='fa fa-unlock-alt'
                                      aria-hidden='true'
                                      data-toggle='tooltip'
                                      title='Buy to see'
                                    ></i>
                                    <span>
                                      ACCESS COMMUNITY IN OUR FACEBOOK
                                      DISCUSSION GROUP
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className='secSlide secSlideAfter'>
          <div className='slide-container'>
            <Fade indicators={true} duration={4000}>
              <div className='each-fade'>
                <img src='../../images/roadtodharma/slide1.jpg' />
                <div className='slideBox forthSlide'>
                  <div className='container pt-5'>
                    <div className='row row justify-content-center mb-5'>
                      <div className='col-xl-6 col-lg-7 col-md-8 col-sm-10 col-10'>
                        <div className='slideContent text-center'>
                          <h4 className='px-4'>
                            <span className='textLight'>"This series will</span>{' '}
                            MAKE YOU BELIEVE IN THE POWER OF THE HUMAN SPIRIT.{' '}
                            <span className='textLight'>
                              What else can you ask for in a TV Show."
                            </span>
                          </h4>
                          <p className='mt-2'>– San Francisco Yoga Magazine</p>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-6'>
                        <div className='slideContent slideContentSmall noLeftBorder text-center'>
                          <h4>"INCREDIBLY CAPTIVATING... </h4>
                          <p className='textBold textNormal'>
                            TOP 6 GRIPPING DOCS TO WATCH NOW
                          </p>
                          <p className='textLight textNormal'>
                            For Cultural Change."
                          </p>
                          <h3>- GOOP </h3>
                        </div>
                      </div>
                      <div className='col-6'>
                        <div className='slideContent slideContentSmall sliderContentRight text-center px-5'>
                          <h4>
                            "POWERFUL, ENLIGHTENING{' '}
                            <span className='textLight'>and </span>ENTERTAINING{' '}
                            <span className='textLight'>
                              series with spiritual themes and
                            </span>{' '}
                            MESMERIZING{' '}
                            <span className='textLight'>
                              talent and storytelling!"
                            </span>
                          </h4>
                          <p>– Esalen Film Fest Director, Corinne Bourdeaux</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='each-fade'>
                <img src='../../images/roadtodharma/slide2.jpg' />
                <div className='slideBox'>
                  <div className='container pt-5'>
                    <div className='row justify-content-center'>
                      <div className='col-xl-6 col-lg-7 col-md-7 col-sm-8 col-10'>
                        <div className='slideContent text-center px-5'>
                          <h4>
                            "A THRILLING SERIES{' '}
                            <span className='textLight'>coupled with the</span>{' '}
                            WISDOM & LESSONS TO ATTAIN FREEDOM."{' '}
                          </h4>
                          <p className='mt-2'>– Open Mind Body Soul</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='each-fade'>
                <img src='../../images/roadtodharma/slide5.jpg' />
                <div className='slideBox'>
                  <div className='container pt-5'>
                    <div className='row justify-content-center'>
                      <div className='col-xl-6 col-lg-7 col-md-7 col-sm-8 col-12'>
                        <div className='slideContent text-center px-5'>
                          <h4>
                            "CHARTING PATHWAYS FROM THE PRISONS OF THEIR MINDS."{' '}
                          </h4>
                          <p className='mt-2'>– GOOP</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </div>

        <section className='sec-unloc-whole-course'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 unloc-whole-course-box'>
                <h5 className='unloc-whole-course-title'>
                  <b>GIVE A GIFT OF DHARMA</b>
                </h5>
                <h5>Spread the love, Inspire A Friend, Gift the Course</h5>
                {/* <h5>Only $167 through March 1st $197 after that.</h5> */}
                <div className='unlock-course-btns'>
                  <Link href={'/user/gift-course/NDg=/MQ=='}>
                    <a className='btn '> Gift Course Now </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <DharmaFooter />
        <div
          id='myvidModal'
          className='modal fade myvidModal courseVideoModal'
          role='dialog'
        >
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button
                  type='button'
                  className='closeVideo'
                  data-dismiss='modal'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <iframe
                  id='videoIframe'
                  src=''
                  width='100%'
                  height='550'
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

        <div id='myAudioModal' class='modal fade myAudioModal' role='dialog'>
          <div class='modal-dialog modal-lg'>
            <div class='modal-content'>
              <div class='modal-header'>
                <button
                  type='button'
                  class='audioPlayer closeAudio'
                  data-dismiss='modal'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div class='modal-body'>
                <div class='audioimg-div'>
                  <img
                    id='audioModalImage'
                    class='img-fluid'
                    src='../../images/Ep-3-Thumbnail.png'
                  />
                </div>
                <div class='audio-div' id='audioDiv'></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default RoadToDharma;
