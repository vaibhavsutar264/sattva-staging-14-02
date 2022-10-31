import React, { Component } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
const UserDetailsForm = dynamic(
  () => import('../../components/user/UserDetailsForm'),
  {
    ssr: false,
  }
);
import UserTeacherAccess from '../../components/user/UserTeacherAccess';
import UserCardDetails from '../../components/user/UserCardDetails';
import axios from 'axios';
import { apiRoute, getApiHeader } from '../../utils/helpers';
import {
  getLocalStorageAuth,
  removeLocalStorageAuth,
} from '../../utils/helpers';
import Recaptcha from 'react-google-invisible-recaptcha';
import Layout from '../../components/user/Layout';
import Notification from '../../components/user/Notification';
import { SearchContext } from '../../components/user/ContextSearch';
import router from 'next/router';
import Support from '../../components/user/support';
import Security from '../../components/user/Security';

class Setting extends Component {
  static contextType = SearchContext;
  constructor(props) {
    super(props);
    this.deleteModal = React.createRef();
    this.state = {
      userId: '',
      userFirstName: '',
      userLastName: '',
      hasSubscription: '0',
      alert: false,
      alertType: '',
      alertMsg: '',
      userType: '1',
      showTeacherAccessError: false,
      showSubscriptionError: false,
      loading: false,
    };
  }

  componentDidMount() {
    const getId = getLocalStorageAuth();
    if (!getId.userDetails) {
      const ForUrl = router.pathname
      router.push(`/login/?goto=${ForUrl}`);
      return 0;
    }

    window.scrollTo(0, 0);
    const auth = getLocalStorageAuth();
    const userDetails = auth.userDetails;
    if (auth) {
      const userId = userDetails.id;
      this.setState({
        userId: userId,
        hasSubscription: userDetails.has_subscription,
        userLastName: userDetails.last_name,
        userFirstName: userDetails.first_name,
        userType: userDetails.user_type,
      });
    }
    if (this.props.location && this.props.location.state) {
      if (this.props.location.state.accessError) {
        this.setState({ showTeacherAccessError: true });
      }
      if (this.props.location && this.props.location.state.subscriptionError) {
        this.setState({ showSubscriptionError: true });
      }
    }

    let { si, st } = this.context;

    st('');

    // if (unsavedChanges) {
    //   const routeChangeStart = () => {
    //     const ok = callback()
    //     if (!ok) {
    //       Router.events.emit("routeChangeError")
    //       throw "Abort route change. Please ignore this error."
    //     }
    //   }
    //   Router.events.on("routeChangeStart", routeChangeStart)

    //   return () => {
    //     Router.events.off("routeChangeStart", routeChangeStart)
    //   }
    // }

  }

  deleteAccount = () => {
    const requestOptions = {
      headers: getApiHeader(true),
    };
    this.deleteModal.current.click();
    this.setState({ loading: true });
    axios
      .get(
        apiRoute('user-dashboard/delete-user-account/' + this.state.userId),
        requestOptions
      )
      .then((res) => {
        window.scrollTo(0, 0);
        removeLocalStorageAuth();
        this.setState({
          alert: true,
          alertType: 'success',
          alertMsg: res.data.message,
          subscriptionStatus: 0,
        });
        this.setState({ loading: false });
        setTimeout(() => {
          Router.push('/');
        }, 2000);
      })
      .catch((error) => {
        this.setState({
          alert: true,
          alertType: 'error',
          alertMsg: 'Something went wrong please try again.',
        });
        this.setState({ loading: false });
      });
  };

  setLoading = (status) => {
    this.setState({ loading: status });
  };
  render() {
    const { alert, alertType, alertMsg } = this.state;
    return (
      <>
        <Recaptcha
          ref={(ref) => (this.recaptcha = ref)}
          sitekey='6LcXXb0ZAAAAAPKkrgEa8LPjOazq4InauFR3azbD'
          onResolved={() => console.log('Human detected.')}
        />
        <Layout loading={this.state.loading}>
          <div className=''>
            <main class='admin-content light-purplebg'>
              <section class='sec coursePage'>
                <div class='container'>
                  <h4 className='revamp-subtitle'>Account Settings</h4>
                  {this.state.showTeacherAccessError && (
                    <div className='alert alert-danger col-sm-8' role='alert'>
                      <p className='revamp-para-small'>You not have authorisation to access this page</p>
                    </div>
                  )}
                  {this.state.showSubscriptionError && (
                    <div className='alert alert-danger col-sm-8' role='alert'>
                      <p className='revamp-para-small'>Your subscription is expired. Please renew it.</p>
                    </div>
                  )}
                  {alert && alertType === 'success' && (
                    <div className='alert alert-success' role='alert'>
                      {alertMsg}
                    </div>
                  )}
                  <div class='card card-panel'>
                    <ul
                      class='nav nav-tabs custom-tabs jc-sb'
                      id='myTab'
                      role='tablist'
                    >
                      <li class='nav-item'>
                        <a class='nav-link active' id='profile-tab' data-toggle='tab' href='#profile' role='tab' aria-controls='profile' aria-selected='true'>
                          My Profile
                        </a>
                      </li>
                      {this.state.userType == '0' &&
                        this.state.hasSubscription == '1' && (
                          <>
                            <li class='nav-item'>
                              <a
                                class='nav-link'
                                id='payment-tab'
                                data-toggle='tab'
                                href='#payment'
                                role='tab'
                                aria-controls='payment'
                                aria-selected='false'
                              >
                                Payment
                              </a>
                            </li>
                          </>
                        )}
                      {<li class='nav-item'>
                        <a
                          class='nav-link'
                          id='security-tab'
                          data-toggle='tab'
                          href='#security'
                          role='tab'
                          aria-controls='security'
                          aria-selected='false'
                        >
                          Security
                        </a>
                      </li>}
                      {<li class='nav-item'>
                        <a
                          class='nav-link'
                          id='support-tab'
                          data-toggle='tab'
                          href='#support'
                          role='tab'
                          aria-controls='support'
                          aria-selected='false'
                        >
                          Support
                        </a>
                      </li>}
                      {<li class='nav-item'>
                        <a
                          class='nav-link'
                          id='notification-tab'
                          data-toggle='tab'
                          href='#notification'
                          role='tab'
                          aria-controls='payment'
                          aria-selected='false'
                        >
                          Notification
                        </a>
                      </li>}
                      {this.state.hasSubscription == '1' && (
                        <>
                          <li class='nav-item'>
                            <a
                              class='nav-link'
                              id='contact-tab'
                              data-toggle='tab'
                              href='#contact'
                              role='tab'
                              aria-controls='contact'
                              aria-selected='false'
                            >
                              Sattva Yoga Academy
                            </a>
                          </li>

                        </>
                      )}
                    </ul>
                    <div class='tab-content' id='myTabContent'>
                      <div class='tab-pane fade show active' id='profile' role='tabpanel' aria-labelledby='profile-tab'>
                        <UserDetailsForm
                          history={this.props.history}
                          setLoading={this.setLoading}
                        />
                      </div>
                      {this.state.userType == '0' &&
                        this.state.hasSubscription == '1' && (
                          <>
                            <div
                              class='tab-pane fade'
                              id='payment'
                              role='tabpanel'
                              aria-labelledby='payment-tab'
                            >
                              <UserCardDetails
                                history={this.props.history}
                                setLoading={this.setLoading}
                              />
                            </div>
                          </>
                        )}
                      <div
                        class='tab-pane fade'
                        id='contact'
                        role='tabpanel'
                        aria-labelledby='contact-tab'
                      >
                        <UserTeacherAccess
                          history={this.props.history}
                          setLoading={this.setLoading}
                        />
                      </div>
                      <div
                        class='tab-pane fade '
                        id='notification'
                        role='tabpanel'
                        aria-labelledby='notification-tab'
                      >
                        <Notification id={this.state.userId} />
                      </div>
                      <div
                        class='tab-pane fade'
                        id='support'
                        role='tabpanel'
                        aria-labelledby='support-tab'
                      >
                        <Support />
                      </div>
                      <div
                        class='tab-pane fade'
                        id='security'
                        role='tabpanel'
                        aria-labelledby='security-tab'
                      >
                        <Security
                          history={this.props.history}
                          setLoading={this.setLoading}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class='modal fade show'
                  id='delete-account'
                  tabindex='-1'
                  role='dialog'
                  aria-labelledby='manage-methodTitle'
                  aria-modal='true'
                >
                  <div
                    class='modal-dialog modal-lg modal-dialog-centered'
                    role='document'
                  >
                    <div class='modal-content'>
                      <div class='modal-body'>
                        <h6 class='mb-3'>Delete Sattva Account Permanently</h6>
                        <p>
                          HI {this.state.userFirstName}{' '}
                          {this.state.userLastName},
                        </p>
                        <p className='revamp-para-small'>
                          Deleting your account will have following effects:
                        </p>
                        <ul>
                          <li className='revamp-para-small'>
                            Your current active subscription (if any)&nbsp;will
                            be canceled.
                          </li>
                          <li className='revamp-para-small'>All your payment agreements will be void.</li>
                          <li className='revamp-para-small'>
                            Your payment methods (if any) will be detached from
                            payment gateway.
                          </li>
                          <li className='revamp-para-small'>
                            You will&nbsp;no longer be able to access the Sattva
                            Connect platform.
                          </li>
                          <li className='revamp-para-small'>
                            You will be immediately logged out from the Sattva
                            Connect platform.
                          </li>
                        </ul>
                        <div class='text-right'>
                          <a
                            onClick={this.deleteAccount}
                            class='pop btn btn-sm red waves-effect waves-light'
                            data-container='body'
                            data-toggle='popover'
                            data-placement='top'
                            data-content='Delete anyway'
                            data-original-title=''
                            title=''
                          >
                            <i class='fas fa-trash'></i>
                          </a>
                          <button
                            ref={this.deleteModal}
                            type='button'
                            class='btn btn-sm waves-effect waves-light ml-2'
                            data-dismiss='modal'
                          >
                            <i class='fas fa-times'></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </Layout>
      </>
    );
  }
}

export default Setting;
