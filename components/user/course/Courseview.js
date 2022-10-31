import React, { Component } from 'react';
import Link from 'next/link';
import Chapter from './Chapter';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import { getUserId, apiRoute, getApiHeader } from '../../../utils/helpers';
import Fade from 'react-reveal/Fade';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ReactTooltip from 'react-tooltip';
import { encode } from 'js-base64';
import Layout from '../../../components/user/Layout';
import Footer from './Footer';
import ReadMoreAndLess from 'react-read-more-less';

class Courseview extends Component {
  constructor(props) {
    super(props);
    if (this.props.courseId == 'OQ==') {
      this.validator = new SimpleReactValidator({
        messages: {
          email: 'El. Paštas turi būti galiojantis el. Pašto adresas.',
          required: 'Šį lauką būtina užpildyti.',
          max: 'Komentaras negali būti ilgesnis nei 700 simbolių.',
          default: 'Patvirtinti nepavyko!',
        },
      });
    } else {
      this.validator = new SimpleReactValidator();
    }

    if (this.props.courseId == 'OQ==') {
      this.updatevalidator = new SimpleReactValidator({
        messages: {
          email: 'El. Paštas turi būti galiojantis el. Pašto adresas.',
          required: 'Šį lauką būtina užpildyti.',
          max: 'Komentaras negali būti ilgesnis nei 700 simbolių.',
          default: 'Patvirtinti nepavyko!',
        },
      });
    } else {
      this.updatevalidator = new SimpleReactValidator();
    }
    this.reviewDiv = React.createRef();
    this.markCompleted = this.markCompleted.bind(this);
    // if (this.props.location.state !== undefined) {
    //   var preExtendVal = ['123'];
    // } else {
    var preExtendVal = [];
    // }
    this.state = {
      courseId: this.props.courseId,
      pageId: this.props.pageId,
      courseDetails: null,
      courseContent: [],
      bannerImage: {},
      completedModules: [],
      comment: '',
      rating: '',
      userId: '',
      addReviewSuccess: false,
      addReviewSuccessMsg: '',
      ratingAvg: 0,
      preExpanded: preExtendVal,
      reviewSent: false,
      updateComment: '',
      updateRating: '',
      ratingId: '',
      event: 'add',
      charsLeft: 700,
      maxLength: 700,
      loading: true,
      desc: ''
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    console.log(this.state.courseId);
    const userId = getUserId(this.props.history);
    this.setState({ userId: userId });
    const requestOptions = {
      headers: getApiHeader(),
    };
    axios
      .get(apiRoute('cms-page-banner/' + this.state.pageId), requestOptions)
      .then((res) => {
        this.setState({ bannerImage: res.data, loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
    axios
      .get(apiRoute('course-detail/' + this.state.courseId), requestOptions)
      .then((res) => {
        console.log(res);
        this.setState({
          courseContent: res.data,
          ratingAvg: res.data.rating,
        });
        // if (this.props.location.state !== undefined) {
        //   setTimeout(function () {
        //     document.getElementById('ratingDiv').scrollIntoView(true);
        //   }, 500);
        // }
      });
    let allData = {
      courseId: encode(this.state.courseId),
      userId: userId,
    };
    axios
      .post(apiRoute('get-user-review'), allData, requestOptions)
      .then((res) => {
        if (res.data.status) {
          this.setState({
            reviewSent: res.data.status,
            updateComment: res.data.userReview.comment,
            updateRating: res.data.userReview.rating,
            ratingId: res.data.userReview.id,
            charsLeft:
              this.state.maxLength - res.data.userReview.comment.length,
          });
        }
      });
    console.log(this.state.courseId);
    const userDetails = {
      courseId: this.state.courseId,
      userId: userId,
    };
    axios
      .post(
        apiRoute('get-course-purchase-details'),
        userDetails,
        requestOptions
      )
      .then((res) => {
        if (res.data.completed_module) {
          console.log(res.data.completed_module);
          let cData = res.data.completed_module.split(',');
          this.setState({ completedModules: cData });
        }
      });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCommentChange = (event) => {
    var input = event.target.value;
    this.setState({
      charsLeft: this.state.maxLength - input.length,
      [event.target.name]: input,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      this.forceUpdate();
      return false;
    } else {
      this.validator.hideMessages();
    }
    const data = {
      rating: this.state.rating,
      comment: this.state.comment,
      userId: this.state.userId,
      courseId: this.state.courseId,
    };
    const requestOptions = {
      headers: getApiHeader(),
    };
    this.setState({ loading: true });
    axios
      .post(apiRoute('add-course-rating'), data, requestOptions)
      .then((res) => {
        this.setState({
          reviewSent: true,
          updateComment: res.data.review.comment,
          updateRating: res.data.review.rating,
          ratingId: res.data.review.id,
          rating: '',
          comment: '',
          addReviewSuccess: true,
          addReviewSuccessMsg: res.data.message,
        });
        document.getElementById('courseRatingForm').reset();
        this.setState({ loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  onUpdate = (e) => {
    e.preventDefault();
    if (!this.updatevalidator.allValid()) {
      this.updatevalidator.showMessages();
      this.forceUpdate();
      return false;
    } else {
      this.updatevalidator.hideMessages();
    }
    const data = {
      rating: this.state.updateRating,
      comment: this.state.updateComment,
      id: this.state.ratingId,
    };
    const requestOptions = {
      headers: getApiHeader(),
    };
    this.setState({ loading: true });
    axios
      .post(apiRoute('update-course-rating'), data, requestOptions)
      .then((res) => {
        this.setState({
          addReviewSuccess: true,
          event: 'update',
          addReviewSuccessMsg: res.data.message,
        });
        this.setState({ loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  handleCallback = (childdata) => {
    this.setState({ desc: childdata });
  }

  markCompleted(a, e) {
    const userId = getUserId(this.props.history);
    const userDetails = {
      courseId: this.state.courseId,
      moduleId: a.id,
      userId: userId,
    };

    const requestOptions = {
      headers: getApiHeader(),
    };
    this.setState({ loading: true });
    axios
      .post(apiRoute('mark-complete'), userDetails, requestOptions)
      .then((res) => {
        let arr = this.state.completedModules;
        arr.push(userDetails.moduleId.toString());
        this.setState({ completedModules: arr });
        this.setState({ loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }

  scrollToReview = () => {
    this.reviewDiv.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  render() {
    var progress = 0;
    if (this.state.courseContent.modules) {
      console.log(this.state.courseContent.modules.length);
      console.log(this.state.completedModules.length);
      console.log(this.state.completedModules);
      console.log(this.state.courseContent);
      // console.log(this.state.courseContent.modules.length);
      var allRating =
        (this.state.completedModules.length /
          this.state.courseContent.modules.length) *
        100;
      progress = Math.round(allRating);
    }
    console.log(progress);
    // console.log(this.state.ratingAvg);
    var avgStars = '';
    for (var i = 0; i < this.state.ratingAvg; i++) {
      avgStars += '<i class="fa fa-star" aria-hidden="true"></i>';
    }
    console.log(this.bannerImage)

    return (
      <Layout loading={this.state.loading}>
        <div className='main coursePage'>
          <div>
            <div
              className='secCourse secCourseBanner'
              style={{
                background: `url(${this.state.bannerImage.image})`,
                backgroundSize: 'cover',
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
                        id='courseRatingStar'
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
                  id='courseRatingStar'
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
          </div>
          <div className='secCourse secOffer'>
            <div className='container text-center'>
              <Fade bottom>
                {this.state.courseContent &&
                  this.state.courseContent.id == 4 ? (
                  <>
                    <h4 className='text-white'>
                      START YOUR 5-DAY ENLIVENING THE SPIRIT RETREAT NOW
                    </h4>
                    <h6 className='text-white'>
                      Below is the suggested retreat schedule, watch at your own
                      pace and return to view again and again.
                    </h6>
                  </>
                ) : (
                  ''
                )}
                {this.state.courseContent &&
                  this.state.courseContent.id == 54 ? (
                  <>
                    <h4 className='text-white'>
                      Full Life Giving
                    </h4>
                    <h6 className='text-white'>
                      Below is the suggested retreat schedule, watch at your own
                      pace and return to view again and again.
                    </h6>
                  </>
                ) : (
                  ''
                )}
                {this.state.courseContent &&
                  this.state.courseContent.id == 7 ? (
                  <>
                    <h4 className='text-white'>
                      Begin your journey into the Devotional Path of Chanting
                      now!{' '}
                    </h4>
                    <h6 className='text-white'>
                      Find your course curriculum below, watch at your own pace
                      and enjoy!
                    </h6>
                  </>
                ) : (
                  ''
                )}
                {this.state.courseContent &&
                  this.state.courseContent.id == 9 ? (
                  <>
                    <h4 className='text-white'>
                      Pradėk savo kelionę į gerovę dabar.
                    </h4>
                    <h6 className='text-white'>
                      Mokinkis ir praktikuok kada nori, ten kur tau patogu. Iki
                      malonaus ir sėkmės kelyje!
                    </h6>
                  </>
                ) : (
                  ''
                )}
                {this.state.courseContent &&
                  this.state.courseContent.id == 10 ? (
                  <>
                    <h4 className='text-white'>
                      Begin your journey into the Bhagavad Gita now!{' '}
                    </h4>
                    <h6 className='text-white'>
                      Find your course curriculum below, watch at your own pace
                      and enjoy!
                    </h6>
                  </>
                ) : (
                  ''
                )}
                {this.state.courseContent &&
                  this.state.courseContent.id == 31 ? (
                  <>
                    <h4 className='text-white'>
                      Begin your journey into The Alchemy of Life now!  {' '}
                    </h4>
                    <h6 className='text-white'>
                      Find your course curriculum below, watch at your own pace and enjoy!
                    </h6>
                  </>
                ) : (
                  ''
                )}
                {this.state.courseContent &&
                  this.state.courseContent.id == 53 ? (
                  <>
                    <h4 className='text-white'>
                      Begin your journey into Art of Realating now!  {' '}
                    </h4>
                    <h6 className='text-white'>
                      Find your course curriculum below, watch at your own pace and enjoy!
                    </h6>
                  </>
                ) : (
                  ''
                )}
                {this.state.courseContent &&
                  this.state.courseContent.id == 58 ? (
                  <>
                    <h4 className='text-white'>
                      Begin your journey into The Yoga of Love now!  {' '}
                    </h4>
                    <h6 className='text-white'>
                      Find your course curriculum below, watch at your own pace and enjoy!
                    </h6>
                  </>
                ) : (
                  ''
                )}
                {this.state.courseContent &&
                  this.state.courseContent.id == 59 ? (
                  <>
                    <h4 className='text-white'>
                      Begin your journey into Ayurveda: Your Pathway to Self-Healing now!  {' '}
                    </h4>
                    <h6 className='text-white'>
                      Find your course curriculum below. Watch at your own pace and enjoy!</h6>
                  </>
                ) : (
                  ''
                )}
              </Fade>
            </div>
          </div>
          <div className='secCourse secCurriculum secInnerCurriculum'>
            <div className='container'>
              <div className='progressBarDiv mb-5'>
                {this.state.courseContent &&
                  this.state.courseContent.is_in_english == '2' ? (
                  <p>Jūsų kurso pažanga</p>
                ) : (
                  <p>Your Course Progress</p>
                )}
                <div className='progressBar'>
                  <div class='progress-box'>
                    <div class='prog-left-box'>
                      <ProgressBar now={progress} />
                      <p>{progress}% completed</p>
                    </div>
                    {this.state.courseContent &&
                      this.state.courseContent.id == 7 ? (
                      <div class='prog-right-box'>
                        For any questions about this course please reach out:
                        thesattvamusic@gmail.com
                      </div>
                    ) : (
                      ''
                    )}
                    {this.state.courseContent &&
                      this.state.courseContent.id == 59 ? (
                      <div class='prog-right-box'>
                        For questions concerning the course content, please send an email to <a href="mailto:justine@justinelemos.com">justine@justinelemos.com</a>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
              {this.state.courseContent && this.state.courseContent.modules ? (
                <Accordion
                  className='chapterAccordion'
                  allowZeroExpanded={true}
                >
                  {this.state.courseContent.modules.map((item, index) => {
                    if (index + 1 == this.state.courseContent.modules.length) {
                      var last = true;
                    } else {
                      var last = false;
                    }
                    return (
                      <AccordionItem>
                        <AccordionItemHeading>
                          {this.state.completedModules &&
                            this.state.completedModules.includes(
                              item.id.toString()
                            ) ? (
                            <AccordionItemButton className='accordion__button accord-gold'>
                              <div>
                                {item.title}{' '}
                                {/* {this.state.courseContent.id != '10' && this.state.courseContent.id != '31' && this.state.courseContent.id != '53' && this.state.courseContent.id != '54'  && this.state.courseContent.id != '58' && this.state.courseContent.id != '59'
                                  ? item.description
                                  : ''} */}
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
                          ) : (
                            <AccordionItemButton className='accordion__button'>
                              <div>
                                {item.title}{' '}
                                {/* {this.state.courseContent.id != '10' && this.state.courseContent.id != '31' && this.state.courseContent.id != '53' && this.state.courseContent.id != '54' && this.state.courseContent.id != '58'
                                  ? item.description
                                  : ''}  */}
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
                          )}
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                          <Chapter
                            is_in_english={
                              this.state.courseContent.is_in_english
                            }
                            markCompleted={this.markCompleted}
                            courseDetails={item}
                            completedModules={this.state.completedModules}
                            last={last}
                            allDetails={this.state.courseContent.modules}
                            cDetails={this.state.courseContent}
                            parentcallback={this.handleCallback}
                          />
                        </AccordionItemPanel>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              ) : (
                ''
              )}
              {this.state.courseContent &&
                this.state.courseContent.is_in_english == '2' ? (
                <>
                  <Accordion
                    className='chapterAccordion'
                    allowZeroExpanded={true}
                    preExpanded={this.state.preExpanded}
                  >
                    <AccordionItem uuid='123'>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          <div ref={this.reviewDiv} id='ratingDiv'>
                            Peržiūrėkite kursą, pasidalykite savo patirtimi ir
                            įkvėpkite bendruomenę
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
                        <div>
                          {this.state.reviewSent == false && (
                            <>
                              {this.state.addReviewSuccess == true && (
                                <div
                                  className='alert alert-danger alert-dismissible fade show'
                                  role='alert'
                                >
                                  <p>Peržiūra sėkmingai pateikta.</p>
                                </div>
                              )}
                              <form
                                className='customer-support'
                                onSubmit={this.onSubmit}
                                id='courseRatingForm'
                              >
                                <div className=''>
                                  <label className='control-label'>
                                    Įvertink savo patirtį{' '}
                                  </label>
                                  <div class='starRating'>
                                    <input
                                      type='radio'
                                      id='5-stars'
                                      name='rating'
                                      value='5'
                                      onChange={this.onChange}
                                    />
                                    <label for='5-stars' class='star'>
                                      &#9733;
                                    </label>
                                    <input
                                      type='radio'
                                      id='4-stars'
                                      name='rating'
                                      value='4'
                                      onChange={this.onChange}
                                    />
                                    <label for='4-stars' class='star'>
                                      &#9733;
                                    </label>
                                    <input
                                      type='radio'
                                      id='3-stars'
                                      name='rating'
                                      value='3'
                                      onChange={this.onChange}
                                    />
                                    <label for='3-stars' class='star'>
                                      &#9733;
                                    </label>
                                    <input
                                      type='radio'
                                      id='2-stars'
                                      name='rating'
                                      value='2'
                                      onChange={this.onChange}
                                    />
                                    <label for='2-stars' class='star'>
                                      &#9733;
                                    </label>
                                    <input
                                      type='radio'
                                      id='1-star'
                                      name='rating'
                                      value='1'
                                      onChange={this.onChange}
                                    />
                                    <label for='1-star' class='star'>
                                      &#9733;
                                    </label>
                                  </div>
                                  {this.validator.message(
                                    'rating',
                                    this.state.rating,
                                    'required'
                                  )}
                                </div>
                                <div className='input-field'>
                                  <label className='control-label'>
                                    Papasakok mums apie savo patirtį{' '}
                                  </label>
                                  <textarea
                                    maxlength='700'
                                    className='form-control'
                                    rows='5'
                                    name='comment'
                                    onChange={this.onCommentChange}
                                  >
                                    {this.state.comment}
                                  </textarea>
                                  <p className='commectCharLeft'>
                                    Characters Left: {this.state.charsLeft}
                                  </p>
                                  {this.validator.message(
                                    'comment',
                                    this.state.comment,
                                    'max:700'
                                  )}
                                </div>
                                <button type='submit' class='btn btn-sm'>
                                  Pasidalinti
                                </button>
                              </form>
                            </>
                          )}
                          {this.state.reviewSent == true && (
                            <>
                              {this.state.addReviewSuccess == true &&
                                this.state.event == 'update' && (
                                  <div
                                    className='alert alert-danger alert-dismissible fade show'
                                    role='alert'
                                  >
                                    <p>Peržiūra sėkmingai atnaujinta.</p>
                                  </div>
                                )}
                              {this.state.addReviewSuccess == true &&
                                this.state.event == 'add' && (
                                  <div
                                    className='alert alert-danger alert-dismissible fade show'
                                    role='alert'
                                  >
                                    <p>Peržiūra sėkmingai pateikta.</p>
                                  </div>
                                )}
                              <form
                                className='customer-support'
                                onSubmit={this.onUpdate}
                                id='courseRatingForm'
                              >
                                <div className=''>
                                  <label className='control-label'>
                                    Įvertink savo patirtį
                                  </label>
                                  <div class='starRating'>
                                    <input
                                      type='radio'
                                      id='5-stars'
                                      name='updateRating'
                                      checked={
                                        this.state.updateRating == 5
                                          ? true
                                          : false
                                      }
                                      value='5'
                                      onChange={this.onChange}
                                    />
                                    <label for='5-stars' class='star'>
                                      &#9733;
                                    </label>
                                    <input
                                      type='radio'
                                      id='4-stars'
                                      name='updateRating'
                                      value='4'
                                      checked={
                                        this.state.updateRating == 4
                                          ? true
                                          : false
                                      }
                                      onChange={this.onChange}
                                    />
                                    <label for='4-stars' class='star'>
                                      &#9733;
                                    </label>
                                    <input
                                      type='radio'
                                      id='3-stars'
                                      name='updateRating'
                                      value='3'
                                      checked={
                                        this.state.updateRating == 3
                                          ? true
                                          : false
                                      }
                                      onChange={this.onChange}
                                    />
                                    <label for='3-stars' class='star'>
                                      &#9733;
                                    </label>
                                    <input
                                      type='radio'
                                      id='2-stars'
                                      name='updateRating'
                                      value='2'
                                      checked={
                                        this.state.updateRating == 2
                                          ? true
                                          : false
                                      }
                                      onChange={this.onChange}
                                    />
                                    <label for='2-stars' class='star'>
                                      &#9733;
                                    </label>
                                    <input
                                      type='radio'
                                      id='1-star'
                                      name='updateRating'
                                      value='1'
                                      checked={
                                        this.state.updateRating == 1
                                          ? true
                                          : false
                                      }
                                      onChange={this.onChange}
                                    />
                                    <label for='1-star' class='star'>
                                      &#9733;
                                    </label>
                                  </div>
                                  {this.updatevalidator.message(
                                    'updateRating',
                                    this.state.updateRating,
                                    'required'
                                  )}
                                </div>
                                <div className='input-field'>
                                  <label className='control-label active'>
                                    Papasakok mums apie savo patirtį{' '}
                                  </label>
                                  <textarea
                                    maxlength='700'
                                    className='form-control'
                                    rows='5'
                                    name='updateComment'
                                    onChange={this.onCommentChange}
                                    value={this.state.updateComment}
                                  ></textarea>
                                  <p className='commectCharLeft'>
                                    Characters Left: {this.state.charsLeft}
                                  </p>
                                  {this.updatevalidator.message(
                                    'updateComment',
                                    this.state.updateComment,
                                    'max:700'
                                  )}
                                </div>
                                <button type='submit' class='btn btn-sm'>
                                  Naujinimas
                                </button>
                              </form>
                            </>
                          )}
                        </div>
                      </AccordionItemPanel>
                    </AccordionItem>
                  </Accordion>
                </>
              ) : (
                <>
                  <Accordion
                    className='chapterAccordion'
                    allowZeroExpanded={true}
                    preExpanded={this.state.preExpanded}
                  >
                    <AccordionItem uuid='123'>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          <div ref={this.reviewDiv} id='ratingDiv'>
                            Review the course, share your experience and inspire
                            the community
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
                        <div>
                          {this.state.addReviewSuccess == true && (
                            <div
                              className='alert alert-danger alert-dismissible fade show'
                              role='alert'
                            >
                              <p>{this.state.addReviewSuccessMsg}</p>
                            </div>
                          )}
                          {this.state.reviewSent == false ? (
                            <form
                              className='customer-support'
                              onSubmit={this.onSubmit}
                              id='courseRatingForm'
                            >
                              <div className=''>
                                <label className='control-label'>
                                  Rate your experience{' '}
                                </label>
                                <div class='starRating'>
                                  <input
                                    type='radio'
                                    id='5-stars'
                                    name='rating'
                                    value='5'
                                    onChange={this.onChange}
                                  />
                                  <label for='5-stars' class='star'>
                                    &#9733;
                                  </label>
                                  <input
                                    type='radio'
                                    id='4-stars'
                                    name='rating'
                                    value='4'
                                    onChange={this.onChange}
                                  />
                                  <label for='4-stars' class='star'>
                                    &#9733;
                                  </label>
                                  <input
                                    type='radio'
                                    id='3-stars'
                                    name='rating'
                                    value='3'
                                    onChange={this.onChange}
                                  />
                                  <label for='3-stars' class='star'>
                                    &#9733;
                                  </label>
                                  <input
                                    type='radio'
                                    id='2-stars'
                                    name='rating'
                                    value='2'
                                    onChange={this.onChange}
                                  />
                                  <label for='2-stars' class='star'>
                                    &#9733;
                                  </label>
                                  <input
                                    type='radio'
                                    id='1-star'
                                    name='rating'
                                    value='1'
                                    onChange={this.onChange}
                                  />
                                  <label for='1-star' class='star'>
                                    &#9733;
                                  </label>
                                </div>
                                {this.validator.message(
                                  'rating',
                                  this.state.rating,
                                  'required'
                                )}
                              </div>
                              <div className='input-field'>
                                <label className='control-label'>
                                  Tell us about your experience{' '}
                                </label>
                                <textarea
                                  maxlength='700'
                                  className='form-control'
                                  rows='5'
                                  name='comment'
                                  onChange={this.onCommentChange}
                                >
                                  {this.state.comment}
                                </textarea>
                                <p className='commectCharLeft'>
                                  Characters Left: {this.state.charsLeft}
                                </p>
                                {this.validator.message(
                                  'comment',
                                  this.state.comment,
                                  'max:700'
                                )}
                              </div>
                              <button type='submit' class='btn btn-sm'>
                                Share
                              </button>
                            </form>
                          ) : (
                            <form
                              className='customer-support'
                              onSubmit={this.onUpdate}
                              id='courseRatingForm'
                            >
                              <div className=''>
                                <label className='control-label'>
                                  Rate your experience{' '}
                                </label>
                                <div class='starRating'>
                                  <input
                                    type='radio'
                                    id='5-stars'
                                    name='updateRating'
                                    checked={
                                      this.state.updateRating == 5
                                        ? true
                                        : false
                                    }
                                    value='5'
                                    onChange={this.onChange}
                                  />
                                  <label for='5-stars' class='star'>
                                    &#9733;
                                  </label>
                                  <input
                                    type='radio'
                                    id='4-stars'
                                    name='updateRating'
                                    value='4'
                                    checked={
                                      this.state.updateRating == 4
                                        ? true
                                        : false
                                    }
                                    onChange={this.onChange}
                                  />
                                  <label for='4-stars' class='star'>
                                    &#9733;
                                  </label>
                                  <input
                                    type='radio'
                                    id='3-stars'
                                    name='updateRating'
                                    value='3'
                                    checked={
                                      this.state.updateRating == 3
                                        ? true
                                        : false
                                    }
                                    onChange={this.onChange}
                                  />
                                  <label for='3-stars' class='star'>
                                    &#9733;
                                  </label>
                                  <input
                                    type='radio'
                                    id='2-stars'
                                    name='updateRating'
                                    value='2'
                                    checked={
                                      this.state.updateRating == 2
                                        ? true
                                        : false
                                    }
                                    onChange={this.onChange}
                                  />
                                  <label for='2-stars' class='star'>
                                    &#9733;
                                  </label>
                                  <input
                                    type='radio'
                                    id='1-star'
                                    name='updateRating'
                                    value='1'
                                    checked={
                                      this.state.updateRating == 1
                                        ? true
                                        : false
                                    }
                                    onChange={this.onChange}
                                  />
                                  <label for='1-star' class='star'>
                                    &#9733;
                                  </label>
                                </div>
                                {this.updatevalidator.message(
                                  'updateRating',
                                  this.state.updateRating,
                                  'required'
                                )}
                              </div>
                              <div className='input-field'>
                                <label className='control-label active'>
                                  Tell us about your experience{' '}
                                </label>
                                <textarea
                                  maxlength='700'
                                  className='form-control'
                                  rows='5'
                                  name='updateComment'
                                  onChange={this.onCommentChange}
                                  value={this.state.updateComment}
                                ></textarea>
                                <p className='commectCharLeft'>
                                  Characters Left: {this.state.charsLeft}
                                </p>
                                {this.updatevalidator.message(
                                  'updateComment',
                                  this.state.updateComment,
                                  'max:700'
                                )}
                              </div>
                              <button type='submit' class='btn btn-sm'>
                                Update
                              </button>
                            </form>
                          )}
                        </div>
                      </AccordionItemPanel>
                    </AccordionItem>
                  </Accordion>
                </>
              )}
            </div>
          </div>

          <div className='secCoursePrice giftCourseInner'>
            <div className='container h-100'>
              <div className='row h-100 justify-content-center align-items-center text-center'>
                <div className='col-md-8 h-100 bgTheme'>
                  <Fade bottom>
                    <div className='py-5'>
                      {this.state.courseContent &&
                        this.state.courseContent.is_in_english == '2' ? (
                        <>
                          <h2 className='mb-4'>Padovanoti</h2>
                          <p>
                            Tikimės,kad jums patiko ši Kelionė į Gerovę! Kodėl
                            gi nepadovanojus tiems kas jums rūpi?
                          </p>
                          <Link
                            href={
                              '/user/gift-course/' +
                              this.state.pageId +
                              '/' +
                              this.state.courseId
                            }
                          >
                            <a className='btn btnWhite mt-5'>Dovanoti dabar</a>
                          </Link>
                        </>
                      ) : (
                        <>
                          <h2 className='mb-4'>Gift a Friend</h2>
                          <p>
                            We hope that you enjoyed the{' '}
                            {this.state.courseContent &&
                              this.state.courseContent.title
                              ? this.state.courseContent.title
                              : ''}{' '}
                            course ! Why not gift it to a friend?
                          </p>
                          <Link
                            href={
                              '/user/gift-course/' +
                              this.state.pageId +
                              '/' +
                              this.state.courseId
                            }
                          >
                            <a className='btn btnWhite mt-5'>GIFT NOW</a>
                          </Link>
                        </>
                      )}
                    </div>
                  </Fade>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id='cardVideoModal'
          className='modal fade cardVideoModal nadeem-video'
          role='dialog'
        >
          <div className='modal-dialog'>
            <div className='modal-content light-purplebg' >
              <div className='container'>
                <div className='card card-view'>
                  <button
                    type='button'
                    className='closeVideo'
                    data-dismiss='modal'
                  >
                    <img src='/images/cancel.svg' />
                  </button>
                  <div className='card-content p-3'>
                    <div className='media-header'>
                      <h4
                        className='media-media-title mt-0'
                        id='courseVidTitle'
                      ></h4>
                    </div>
                    <div className='media-content'>
                      <iframe
                        allowfullscreen='true'
                        className='ifmplayer'
                        id='courseVidUrl'
                        src=''
                        frameborder='0'
                        width='100%'
                        height='430'
                      ></iframe>
                      <div className="description">
                        <ReadMoreAndLess
                          ref={this.ReadMore}
                          className="read-more-content"
                          charLimit={400}
                          readMoreText={<a className='view-more'>View More</a>}
                          readLessText={<a className='view-more'>  View Less</a>}
                        >
                          {this.state.desc}
                        </ReadMoreAndLess>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id='videoModal' className='modal fade videoModal' role='dialog'>
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <button type='button' className='closeBtn' data-dismiss='modal'>
                <img src='/images/cancel.svg' />
              </button>
              <div className='media-content'>
                <iframe
                  //                   id='courseVidUrl2'

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
        <Footer />
      </Layout>
    );
  }
}

export default Courseview;
