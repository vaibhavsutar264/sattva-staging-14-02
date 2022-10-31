import React, { Component } from 'react';
import Link from 'next/link';
import router from 'next/router';
import { getLocalStorageAuth, apiRoute, getApiHeader } from '../../../utils/helpers';
import axios from 'axios';
import Moment from 'react-moment';


class Header extends Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);

    this.state = {
      redirect: false,
      notifications: [],
      id: '',
      count: ' ',
      link: '',
      is_link: false,
      show: false,
      data_date: '',
      forall_count: '',
    };
  }


  readNotification = () => {
    const userData = getLocalStorageAuth();
    const userId = userData.userDetails.id
    axios.post(apiRoute('unread'), {
      user_id: userId,
    })
      .then((response) => {
        console.log(response);
        this.setState({ count: ' ' })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteNotification = (n_id) => {
    this.setState({ show: true })
    axios.post(apiRoute('delete-notification'), {
      id: n_id,
    })
      .then((response) => {
        if (response) {
          this.setState({ show: false })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //  notify=setInterval(() => {
  //       axios.post(apiRoute('notifications'), {
  //     user_id: [this.state.id,'forall'],
  //   })
  //   .then(  (response) => {
  //     this.setState({
  //       notifications: response.data,
  //     });  
  //   })
  //   .catch( (error) => {
  //     console.log(error);

  //   });}, 6000);



  //////////////////////////////////////////////////

  // counts=setInterval(() => {

  // axios.post(apiRoute('getcount'), {
  //   user_id: this.state.id,
  // })
  //   .then((res) => {
  //     // console.log(res.data);
  //     if(res.data!=0){
  //       this.setState({count:res.data});
  //     }
  //   });

  // }, 6000);

  componentDidMount = () => {
    // window.onbeforeunload = () => {
    //   localStorage.removeItem('auth');
    // }
    const userData = getLocalStorageAuth();

    function setCookie(c_name, value, exdays) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + exdays);
      var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
      document.cookie = c_name + "=" + c_value;
    }

    function getCookie(c_name) {
      var c_value = document.cookie;
      var c_start = c_value.indexOf(" " + c_name + "=");
      if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
      }
      if (c_start == -1) {
        c_value = null;
      } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
          c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
      }
      return c_value;
    }

    checkSession();

    function checkSession() {
      var c = getCookie("visited");
      if (c === "yes") {
        console.log("Welcome back!");
      }
      else {
        setCookie("visited", "yes", 365);
        $("#exploreSattva").modal();
      }
    }

    if (!userData.userDetails) {
      const redi = router.pathname
      if (redi == '/user/course-details/[pageId]/[courseId]' || redi == '/user/course-landing/[pageId]/[courseId]') {
        // const {pageId} = router.query;
        // const {courseId} = router.query;
        // router.push( `/login/?goto=/user/course-details/${pageId}/${courseId}`)
        router.push(`/login/?goto=/user/my-courses`)
        return 0;
      } else if (redi == '/user/video-details/[id]') {
        router.push(`/login/?goto=/user/search`)
      } else if (redi == '/user/series-videos/[id]') {
        router.push(`/login/?goto=/user/series`)
      } else {
        router.push(`/login/?goto=${redi}`)
      }


      return 0;
    }




    const date = userData.userDetails.created_at;
    var d2 = new Date(date);
    this.setState({
      data_date: date,
    });

    if (!userData) {
      this.setState({
        redirect: true,
      });
    }
    this.setState({ id: userData.userDetails.id })

    window.fbAsyncInit = function () {
      FB.init({
        appId: constants.FB_DEVELOPMENT_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v10.0'
      });
    };

    const requestOptions = {
      headers: getApiHeader(),
    };

    axios.get(apiRoute(`get-notification-type/${userData.userDetails.id}`))
      .then((res) => {
        console.log(res.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });


    axios.post(apiRoute('getcount'), {
      user_id: userData.userDetails.id,
    })
      .then((res) => {
        // console.log(res.data);
        if (res.data != 0) {
          this.setState({ count: res.data });
        }
      });

    axios.post(apiRoute('notifications'), {
      user_id: [userData.userDetails.id, 'forall'],
    })
      .then((response) => {
        this.setState({
          notifications: response.data,
        });
      })
      .catch((error) => {
        console.log(error);

      });

  }

  onDeleteClick() {
    localStorage.removeItem('auth');
    window.location.href = '/login';
    // this.setState({
    //   redirect: true,
    // });
  }

  render() {
    const { loading } = this.props;
    if (this.state.redirect) {
      router.push('/login');
    }

    return (
      <>
        {loading && (
          <div className='preloader-background'>
            <div className='big sattva_loader active'>
              <img src='/images/loader.png' />
            </div>
          </div>
        )}
        <header className='sidebar-head user-header login-header'>
          <img
            className='user-logo img-fluid'
            src='/images/logo-sattva.png'
            alt='Sattva Connect'
          />
          {/* <Link href={`/user/notifications/${this.state.id}`}> */}
          <Link href="/user/notifications">
            <button className='fa_bell' onClick={this.readNotification}>
              <a><i className='fas fa-bell'>
                {this.state.count >= 1 &&
                  <span class="badge badge-light">{this.state.count}</span>

                }

              </i></a>
            </button>
          </Link>
          <button type='button' id='sidebarCollapse' className='btn btn-toggle'>
            <i className='fas fa-bars'></i>
          </button>
          <nav id='sidebar' className='active'>
            <ul id='nav-link' className='list-unstyled components'>
              <li>
                <Link href='/user/me'>
                  <a>
                    <i className='fas fa-user'></i>
                    <span>
                      Home
                      {this.state.hasSubscription == '0' ? (
                        <i class='fa fa-lock'></i>
                      ) : (
                        ''
                      )}
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/user/explore'>
                  <a>
                    <i className='fas fa-eye'></i>
                    <span>
                      Explore
                      {this.state.hasSubscription == '0' ? (
                        <i class='fa fa-lock'></i>
                      ) : (
                        ''
                      )}
                    </span>
                  </a>
                </Link>
              </li>
              {/* <li>
                <a>
                  <i className='fas fa-gift'></i>
                  <span onClick={this.surpriseMe} data-toggle="modal" data-target="#surprise">
                    Surprise Me
                    {this.state.hasSubscription == '0' ? (
                      <i class='fa fa-lock'></i>
                    ) : (
                      ''
                    )}
                  </span>
                </a>
              </li> */}
              <li>
                <Link href='/user/live-stream'>
                  <a>
                    <i className='fas fa-chalkboard-teacher'></i>
                    <span>
                      Live Studio
                      {this.state.hasSubscription == '0' ? (
                        <i class='fa fa-lock'></i>
                      ) : (
                        ''
                      )}
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/user/live-stream-enablex'>
                  <a>
                    <i className='fas fa-chalkboard-teacher'></i>
                    <span>
                      EnableX Live
                      {this.state.hasSubscription == '0' ? (
                        <i class='fa fa-lock'></i>
                      ) : (
                        ''
                      )}
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/user/series'>
                  <a>
                    <i className='fas fa-play'></i>
                    <span>Series</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/user/my-courses'>
                  <a>
                    <i className='fas fa-book'></i>
                    <span>Courses</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/user/blog'>
                  <a>
                    <i className='fas fa-newspaper'></i>
                    <span>Blog</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/user/search'>
                  <a>
                    <i className='fas fa-search'></i>
                    <span>
                      Search
                      {this.state.hasSubscription == '0' ? (
                        <i class='fa fa-lock'></i>
                      ) : (
                        ''
                      )}
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/user/search-new'>
                  <a>
                    <i className='fas fa-search'></i>
                    <span>
                      Library
                      {this.state.hasSubscription == '0' ? (
                        <i class='fa fa-lock'></i>
                      ) : (
                        ''
                      )}
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/user/audio-series'>
                  <a>
                    <i class="fas fa-microphone" aria-hidden="true"></i>
                    <span>Audio Series</span>
                  </a>
                </Link>
              </li>
              {/* <li>
                <Link href='/user/support'>
                  <a>
                    <i className='fas fa-life-ring'></i>
                    <span>Support</span>
                  </a>
                </Link>
              </li> */}
              <li>
                <Link href='/user/settings'>
                  <a>
                    <i className='fas fa-cog'></i>
                    <span>Settings</span>
                  </a>
                </Link>
              </li>
              <li className='desktop'>
                <a class="notification-btn" onClick={this.readNotification}>
                  <i class="fas fa-bell">
                    {this.state.count >= 1 &&
                      <span class="badge badge-light">{this.state.count}</span>
                    }
                  </i><span>Notifications</span>
                </a>
              </li>
              <li>
                <a data-toggle="modal" data-target="#exploreSattva"><i class="fa fa-star" aria-hidden="true"></i>
                  <span>Explore Sattva</span></a>
              </li>
              <li>
                <a className='' onClick={this.onDeleteClick}>
                  <i className='fas fa-sign-out-alt'></i>
                  <input
                    type='button'
                    className='btn btn-sm'
                    name='Submit'
                    value='Logout'
                  />
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <div class="notification-content" id="p2">
          <div class="notify-content text-left">
            <div class="notfy_head"><h4>Notifications</h4>
              <span aria-hidden="true" className="notification-btn">×</span></div>
            {this.state.show && <p>please wait...</p>}
            {this.state.notifications.map((notification, index) => (
              notification.created_at > this.state.data_date &&
              (notification.master_notification && <>

                <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                  <div class="toast-header">
                    <strong class="mr-auto">Sattva Connect</strong>
                    <small class="text-muted"><Moment fromNow>{notification.created_at}</Moment></small>
                    <button type="button" onClick={() => this.deleteNotification(notification.id)} class="ml-2 mb-1 close" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="toast-body mr-5">{notification.master_notification.message}

                  </div>
                  <div class="toast-header">
                    <strong class="mr-auto">
                      {notification.link != null ?

                        notification.message_id == 1 ?
                          <span>
                            <Link href={notification.link}>
                              <a >Update Card Now</a>
                            </Link>
                          </span>
                          : notification.message_id == 2 || notification.message_id == 3 ?
                            <span>
                              <Link href={notification.link}>
                                <a>Click here</a>
                              </Link>
                            </span>
                            : notification.message_id == 5 ?
                              <span>
                                <Link href={notification.link}>
                                  <a>Join Now</a>
                                </Link>
                              </span>
                              : notification.message_id == 4 || notification.message_id == 9 ?
                                <span>
                                  <Link href={notification.link} >
                                    <a>Check Now</a>
                                  </Link>
                                </span>
                                :
                                <span>
                                  <Link href={notification.link}>
                                    <a>View more</a>
                                  </Link>
                                </span>
                        : <></>
                      }
                    </strong>

                  </div>
                </div>
              </>
              )

            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Header;
