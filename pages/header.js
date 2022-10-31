import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getLocalStorageAuth,apiRoute } from '../utils/helpers';
import axios from 'axios';
import Moment from 'react-moment';


class Header extends Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);

    this.state = {
      redirect: false,
      notifications:[],
      id:'',
    };
  }

   readNotification=()=>{
    console.log(id);
    axios.post(apiRoute('unread'), {
        user_id: this.state.id,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

  componentDidMount() {
    const userData = getLocalStorageAuth();
    if (!userData) {
      this.setState({
        redirect: true,
      });
    }

    window.fbAsyncInit = function() {
      FB.init({
        appId            : constants.FB_DEVELOPMENT_APP_ID,
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v10.0'
      });

     
    };
       
             axios.post(apiRoute('notifications'), {
              user_id: userData.userDetails.id,
            })
            .then(  (response) => {
             
              this.setState({
                notifications: response.data,
              });
              
              // console.log(response.data[0].master_notification.message);
              console.log(this.state.notifications);
              
            })
            .catch( (error) => {
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
      Router.push('/login');
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
        <header className='sidebar-head user-header'>
          <img
            className='user-logo img-fluid'
            src='/images/logo-sattva.png'
            alt='Sattva Connect'
          />

          <button type='button' id='sidebarCollapse' className='btn btn-toggle'>
            <i className='fas fa-bars'></i>
          </button>
          <nav id='sidebar' className='active'>
            <ul className='list-unstyled components'>
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
              <li>
                <Link href='/user/me'>
                  <a>
                    <i className='fas fa-user'></i>
                    <span>
                      Me
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
                <Link href='/user/live-stream'>
                  <a>
                    <i className='fas fa-chalkboard-teacher'></i>
                    <span>
                      Live Stream
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
                <Link href='/user/my-courses'>
                  <a>
                    <i className='fas fa-book'></i>
                    <span>Courses</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/user/support'>
                  <a>
                    <i className='fas fa-life-ring'></i>
                    <span>Support</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/user/settings'>
                  <a>
                    <i className='fas fa-cog'></i>
                    <span>Settings</span>
                  </a>
                </Link>
              </li>
              <li>
            <a  class="notification-btn">
            <i class="fas fa-bell"></i><span>Notifications</span>
            </a>
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
        <div class="notification-content">
      <div class="notify-content text-left">
      <h4>Notifications</h4>
      { this.state.notifications.map((notification,index)=>(
      <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <strong class="mr-auto">Sattva Connect</strong>
            <small class="text-muted"><Moment fromNow>{notification.time}</Moment></small>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body">{notification.master_notification.message}</div>
      </div>
      ))}
    </div>
  </div>
      </>
    );
  }
}

export default Header;
