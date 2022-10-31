import React, { Component } from 'react';
import Router from 'next/router';
import axios from 'axios';
import Layout from '../../components/user/Layout';
import {
  apiRoute,
  getApiHeader,
  getUserId,
  userProfilePath,
  getLocalStorageAuth,
} from '../../utils/helpers';
import ReactTooltip from 'react-tooltip';
import Vimeo from '@u-wave/react-vimeo';
import SimpleReactValidator from 'simple-react-validator';

class VideoDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.hariomModal = React.createRef();
    this.hariomValidation = new SimpleReactValidator();
    this.state = {
      video: {},
      videoId: this.props.videoId,
      userId: '',
      hariom: [],
      comments: [],
      showModal: false,
      hariomMessage: '',
      classStatus: false,
      favoriteStatus: false,
      alert: false,
      alertType: '',
      alertMsg: '',
      showHariomForm: false,
      showToolTip: false,
      showTextArea: false,
      showCommentArea: false,
      showHariomBtn: true,
      access: true,
      allowToHariom: false,
      hariomTime: 60,
      subscriptionStatus: true,
      loading: true,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const userId = getUserId(this.props.history);
    this.setState({ userId: userId });
    const auth = getLocalStorageAuth();

    if (auth) {
      const userDetails = auth.userDetails;
      const requestOptions = {
        headers: getApiHeader(true),
      };
      if (userDetails.user_type === 0) {
        axios
          .get(
            apiRoute(
              'user-dashboard/check-subscriber-status/' +
                userDetails.transaction_id
            ),
            requestOptions
          )
          .then((res) => {
            if (res.data) {
              if (res.data.status === false) {
                this.setState({ subscriptionStatus: false });
              } else {
                this.setState({ subscriptionStatus: true });
              }
            }
          })
          .catch((error) => {
            this.setState({ subscriptionStatus: false });
          });
      }

      //get video details
      axios
        .get(
          apiRoute(
            'user-dashboard/get-video-details/' +
              this.state.videoId +
              '/' +
              userId
          ),
          requestOptions
        )
        .then((res) => {
          this.setState({
            video: res.data.videoDetails,
            favoriteStatus: res.data.favoriteStatus,
            classStatus: res.data.myClassStatus,
            access: res.data.access,
            loading: false,
          });
        })
        .catch((error) => {
          this.setState({ loading: false });
        });
      //get video all harioms
      axios
        .get(
          apiRoute('user-dashboard/get-video-hariom/' + this.state.videoId),
          requestOptions
        )
        .then((res) => {
          this.setState({ hariom: res.data });
          if (res.data.length > 0) {
            let comments = res.data.filter(function (e) {
              return e.comment !== null;
            });
            this.setState({ comments: comments });
            const hariomStatus = res.data.some((el) => el.user_id == userId);
            if (hariomStatus) {
              this.setState({ showHariomBtn: false });
            }
          }
          this.setState({ loading: false });
        })
        .catch((error) => {
          this.setState({ loading: false });
        });
      // add video to recent watched
      var details = {
        user_id: userId,
        video_id: this.state.videoId,
      };
      axios.post(
        apiRoute('user-dashboard/add-recent-watched'),
        details,
        requestOptions
      );
    }
  }

  getVideoTime = (time) => {
    var d = Number(time);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);
    if (h < 10) {
      h = '0' + h;
    }
    if (m < 10) {
      m = '0' + m;
    }
    if (s < 10) {
      s = '0' + s;
    }
    var time = h + ':' + m + ':' + s;
    return time;
  };
  changeFavoriteStatus = (e) => {
    const requestOptions = {
      headers: getApiHeader(true),
    };
    this.setState({ loading: true });
    var details = {
      user_id: this.state.userId,
      video_id: this.state.videoId,
      type:0,
    };
    if (!this.state.favoriteStatus) {
      axios
        .post(
          apiRoute('user-dashboard/add-user-favorite'),
          details,
          requestOptions
        )
        .then((res) => {
          this.setState({ favoriteStatus: true, loading: false });
        })
        .catch((error) => {
          window.scrollTo(0, 0);
          this.setState({
            error: true,
            alertType: 'error',
            alertMsg: 'Something went wrong please try again.',
            loading: false,
          });
        });
    } else {
      axios
        .post(
          apiRoute('user-dashboard/remove-user-favorite'),
          details,
          requestOptions
        )
        .then((res) => {
          this.setState({ favoriteStatus: false, loading: false });
        })
        .catch((error) => {
          window.scrollTo(0, 0);
          this.setState({
            loading: false,
            error: true,
            alertType: 'error',
            alertMsg: 'Something went wrong please try again.',
          });
        });
    }
  };

  changeClasesStatus = (e) => {
    const requestOptions = {
      headers: getApiHeader(true),
    };
    this.setState({ loading: true });
    var details = {
      user_id: this.state.userId,
      video_id: this.state.videoId,
    };
    if (!this.state.classStatus) {
      axios
        .post(
          apiRoute('user-dashboard/add-user-classes'),
          details,
          requestOptions
        )
        .then((res) => {
          this.setState({ classStatus: true, loading: false });
        })
        .catch((error) => {
          window.scrollTo(0, 0);
          this.setState({
            loading: false,
            error: true,
            alertType: 'error',
            alertMsg: 'Something went wrong please try again.',
          });
        });
    } else {
      axios
        .post(
          apiRoute('user-dashboard/remove-user-classes'),
          details,
          requestOptions
        )
        .then((res) => {
          this.setState({ classStatus: false, loading: false });
        })
        .catch((error) => {
          window.scrollTo(0, 0);
          this.setState({
            loading: false,
            error: true,
            alertType: 'error',
            alertMsg: 'Something went wrong please try again.',
          });
        });
    }
  };

  toggleToolTip = (status) => {
    this.setState({ showToolTip: status });
  };

  toggleTextArea = () => {
    this.setState({ showTextArea: !this.state.showTextArea });
  };

  toggleComment = () => {
    this.setState({ showCommentArea: !this.state.showCommentArea });
  };
  onChange = (e) => {
    this.setState({ hariomMessage: e.target.value });
  };
  handleSubmitHariom = (e) => {
    e.preventDefault();
    if (!this.hariomValidation.allValid()) {
      this.hariomValidation.showMessages();
      this.forceUpdate();
      return false;
    }
    this.hariomModal.current.click();
    this.setState({ showModal: false });
    const requestOptions = {
      headers: getApiHeader(true),
    };
    this.setState({ loading: true });
    var details = {
      user_id: this.state.userId,
      video_id: this.state.videoId,
      comment: this.state.hariomMessage,
    };
    axios
      .post(
        apiRoute('user-dashboard/add-video-hariom'),
        details,
        requestOptions
      )
      .then((res) => {
        window.scrollTo(0, 0);
        this.setState({
          loading: false,
          alert: true,
          alertType: 'success',
          alertMsg: res.data.message,
          showHariomBtn: false,
        });
        axios
          .get(
            apiRoute('user-dashboard/get-video-hariom/' + this.state.videoId),
            requestOptions
          )
          .then((res) => {
            this.setState({ hariom: res.data, loading: false });
          })
          .catch((error) => {
            this.setState({ loading: false });
          });
      })
      .catch((error) => {
        window.scrollTo(0, 0);
        this.setState({
          loading: false,
          error: true,
          alertType: 'error',
          alertMsg: 'Something went wrong please try again.',
        });
      });
  };

  currentTime = (e) => {
    const seconds = Math.trunc(e.seconds);
    this.setState({ hariomTime: 60 - seconds });
    if (seconds > 60) {
      this.setState({ allowToHariom: true });
    }
  };
  render() {
    const { alert, alertType, alertMsg } = this.state;

    if (!this.state.access) {
      return (
        <Redirect
          to={{
            pathname: window.PUBLIC_URL + '/user/settings',
            state: { accessError: 'true' },
          }}
        />
      );
    }

    if (!this.state.subscriptionStatus) {
      return (
        <Redirect
          to={{
            pathname: window.PUBLIC_URL + '/user/settings',
            state: { subscriptionError: 'true' },
          }}
        />
      );
    }
    return (
      <>
        <Layout loading={this.state.loading}>
          <main className='admin-content'>
            <section className='sec'>
              <div className='container'>
                <div className='card card-view'>
                  <div className='card-content p-3'>
                    <div className='media-header'>
                      {alert && alertType === 'error' && (
                        <div
                          className='alert alert-danger col-sm-6'
                          role='alert'
                        >
                          {alertMsg}
                        </div>
                      )}
                      {alert && alertType === 'success' && (
                        <div
                          className='alert alert-success col-sm-6'
                          role='alert'
                        >
                          {alertMsg}
                        </div>
                      )}
                      <h4 className='media-media-title'>
                        {this.state.video.title}{' '}
                      </h4>
                      <div className='meta_info'>
                        <span class='teacher'>
                          Teacher: {this.state.video.teacherName}
                        </span>
                        <span className='duration'>
                          {' '}
                          Duration:
                          {this.getVideoTime(this.state.video.duration)}
                        </span>
                      </div>
                    </div>
                    <div className='media-content'>
                      <div>
                        {this.state.video.video_url && (
                          <Vimeo
                            video={this.state.video.video_url}
                            onTimeUpdate={this.currentTime}
                            height={480}
                          />
                        )}
                        {/* <iframe   allowfullscreen="true" src={this.state.video.video_url} frameBorder={0} width="100%" height={480} /> */}
                      </div>{' '}
                      <div className='media-btns text-right my-4'>
                        <a
                          title={
                            this.state.classStatus === false
                              ? 'Add to my classes'
                              : 'Remove from my classes'
                          }
                          className={
                            this.state.classStatus === false
                              ? 'btn btn-sm mr-3 removeclass'
                              : 'btn btn-sm mr-3'
                          }
                          onClick={this.changeClasesStatus}
                        >
                          {this.state.classStatus === false ? (
                            <>
                              <i className='fas fa-check' />
                              <> Add to my classes</>
                            </>
                          ) : (
                            <>
                              <i class='fas fa-times' />
                              <> Remove from my classes</>
                            </>
                          )}
                        </a>
                        <a
                          title={
                            this.state.favoriteStatus === false
                              ? 'Add to Favorite'
                              : 'Remove fromFavorite'
                          }
                          className={
                            this.state.favoriteStatus === false
                              ? 'btn btn-sm favorited'
                              : 'btn btn-sm'
                          }
                          onClick={this.changeFavoriteStatus}
                        >
                          {this.state.favoriteStatus === false ? (
                            <>
                              <i className='fas fa-heart' />
                              <> Add to Favorite</>
                            </>
                          ) : (
                            <>
                              <i class='fa fa-heart-o' aria-hidden='true'></i>
                              <> Remove from Favorite</>
                            </>
                          )}
                        </a>
                      </div>
                      <div className='notes-content'>
                        <div className='chat-output' id='chat-output' />
                        <div className='chat-input'>
                          <form action='#0' id='user-input-form'>
                            <input
                              type='text'
                              id='user-input'
                              className='user-input'
                              placeholder='Type your notes here'
                            />
                          </form>
                        </div>
                        <a className='btn close-notes'>
                          <i className='fas fa-times' />
                        </a>
                      </div>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: this.state.video.description,
                        }}
                      ></p>
                      <div className='recent-cont  commnt-section'>
                        <div
                          class='tooltip_templates'
                          style={{
                            position: 'absolute',
                            bottom: '90px',
                            left: '-60px',
                          }}
                        >
                          {this.state.showToolTip && (
                            <div id='tooltip_content'>
                              <div class='modal-content'>
                                <div
                                  class='card-contentt'
                                  style={{ padding: '10px' }}
                                >
                                  <span class='card-titlet'>Hari Om</span>
                                  <p class='hariom_main'>
                                    If you would like to show gratitude and give
                                    thanks, use Hari Om.
                                  </p>
                                  {this.state.allowToHariom == false ? (
                                    <p class='hariom_foot'>
                                      Watch{' '}
                                      <span class='cthari'>
                                        {this.state.hariomTime === 60
                                          ? '1:00'
                                          : '00:' + this.state.hariomTime}
                                      </span>{' '}
                                      more minutes before you can use Hari Om.
                                    </p>
                                  ) : (
                                    ''
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <h6 class='recent-head'>Recent Hari OMs</h6>
                        <div className='recent-list'>
                          {this.state.hariom.map((item, index) => {
                            return (
                              <div class='pop-img'>
                                {item.comment !== null ? (
                                  <a
                                    data-html={true}
                                    data-for='custom-color-no-arrow'
                                    data-html='true'
                                    data-tip={
                                      '<h6>' +
                                      item.user.first_name +
                                      ' ' +
                                      item.user.last_name +
                                      '</h6><br/><hp>' +
                                      item.comment +
                                      '</hp>'
                                    }
                                  >
                                    <img
                                      src={userProfilePath(
                                        item.user.profile_pic
                                      )}
                                    />
                                  </a>
                                ) : (
                                  <a
                                    data-html={true}
                                    data-for='custom-color-no-arrow'
                                    data-tip={
                                      '<h6>' +
                                      item.user.first_name +
                                      ' ' +
                                      item.user.last_name +
                                      '</h6>'
                                    }
                                  >
                                    <img
                                      src={userProfilePath(
                                        item.user.profile_pic
                                      )}
                                    />
                                  </a>
                                )}

                                <ReactTooltip
                                  id='custom-color-no-arrow'
                                  className='react-tooltip videoTooltip'
                                  delayHide={1000}
                                  textColor='#000'
                                  backgroundColor='#ffff'
                                  effect='solid'
                                />
                              </div>
                            );
                          })}

                          {this.state.showHariomBtn && (
                            <button
                              data-toggle='modal'
                              data-target='#hariom'
                              type='button'
                              className='btn btn-sm pop'
                              data-tooltip-content='#tooltip_content'
                              id='tooltipsterhariom'
                              onMouseEnter={() => this.toggleToolTip(true)}
                              onMouseLeave={() => this.toggleToolTip(false)}
                            >
                              Hari Om
                            </button>
                          )}
                        </div>
                      </div>
                      {this.state.comments.length > 0 ? (
                        <div className='showCommentDiv'>
                          <p
                            class='text-purple showCommentText'
                            onClick={this.toggleComment}
                          >
                            Hari om comments
                          </p>
                          {this.state.showCommentArea ? (
                            <p
                              class='text-purple showCommentIcon'
                              onClick={this.toggleComment}
                            >
                              <i
                                class='fa fa-arrow-circle-up'
                                aria-hidden='true'
                              ></i>
                            </p>
                          ) : (
                            <p
                              class='text-purple showCommentIcon'
                              onClick={this.toggleComment}
                            >
                              <i
                                class='fa fa-arrow-circle-down'
                                aria-hidden='true'
                              ></i>
                            </p>
                          )}
                        </div>
                      ) : (
                        ''
                      )}
                      {this.state.showCommentArea ? (
                        <>
                          {this.state.comments.map((item, index) => {
                            return (
                              <>
                                <div class=' recent-list recent-cmnts'>
                                  <div class='cmnt-img-box'>
                                    <div class=' pop-img'>
                                      <img
                                        src={userProfilePath(
                                          item.user.profile_pic
                                        )}
                                      />
                                    </div>
                                    <div class='receiver-box'>
                                      <h6>
                                        {item.user.first_name}{' '}
                                        {item.user.last_name}
                                      </h6>
                                      <hp>{item.comment}</hp>
                                    </div>
                                  </div>
                                  {item.reply ? (
                                    <div class='rec-cmnt-box'>
                                      <div class='sender-box'>
                                        {' '}
                                        <span>- Admin</span>
                                        {item.reply}
                                      </div>
                                    </div>
                                  ) : (
                                    ''
                                  )}
                                </div>
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {this.state.allowToHariom == true ? (
              <div
                className='modal fade '
                id='hariom'
                tabIndex={-1}
                role='dialog'
                aria-labelledby='upgradeTitle'
                aria-hidden='true'
              >
                <div
                  className='modal-dialog modal-md modal-dialog-centered'
                  role='document'
                >
                  <div className='modal-content'>
                    <button
                      type='button'
                      class='close inner-close'
                      data-dismiss='modal'
                      ref={this.hariomModal}
                    >
                      &times;
                    </button>

                    <div className='modal-body'>
                      <form onSubmit={this.handleSubmitHariom}>
                        <div className='row'>
                          <div className='col-md-12'>
                            <h5 className='mb-2 hariom-heading'>Hari Om</h5>
                            <div className='row'>
                              <div className='col-md-12'>
                                <div id='mswitch' className='switch'>
                                  <p className>
                                    Would you also like to say something?
                                  </p>
                                  <p>
                                    <input
                                      type='checkbox'
                                      id='test5'
                                      onClick={this.toggleTextArea}
                                    />
                                    <label for='test5'>
                                      If Yes please check and continue
                                    </label>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          {this.state.showTextArea && (
                            <div className='col-md-12 '>
                              <div className=''>
                                <div className='input-field'>
                                  <textarea
                                    onChange={this.onChange}
                                    cols={50}
                                    rows={5}
                                    name='form[Tell me more about]'
                                    id='Tell me more about'
                                    className='rsform-text-box'
                                    value={this.state.hariomMessage}
                                  />
                                  {this.hariomValidation.message(
                                    'message',
                                    this.state.hariomMessage,
                                    'max:150'
                                  )}
                                  <label
                                    style={{ left: '15px' }}
                                    htmlFor='address'
                                  >
                                    Say Something
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className='col-md-12'>
                            <button
                              type='submit'
                              id='sendHariOmd'
                              title='Send Hari om'
                              className='btnhariom btn btn-small'
                            >
                              Send <i className='material-icons right'></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </main>
        </Layout>
      </>
    );
  }
}

export default VideoDetailsPage;
