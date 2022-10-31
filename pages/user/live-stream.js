import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Layout from '../../components/user/Layout';
import {
  apiRoute,
  getApiHeader,
  getLocalStorageAuth,
} from '../../utils/helpers';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import VideoDetails from '../../components/user/VideoDetails';
import ReactTooltip from 'react-tooltip';
import { SearchContext } from '../../components/user/ContextSearch';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import router from 'next/router';
import moment from 'moment';
export default class Livestream extends Component {
  static contextType = SearchContext;

  constructor(props) {
    super(props);
    this.cancelModal = React.createRef();
    this.state = {
      streamVideos: [],
      userType: 0,
      liveStatus: 1,
      teacherName: '',
      stopStream: true,
      hasSubscription: '0',
      loading: true,
      events: [],
      selected: '',
      handleSearch: true,
      localizer: momentLocalizer(moment)
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

    for (var i = 1; i < 9; i++) {
      window.clearInterval(i);
    }

    const auth = getLocalStorageAuth();
    if (auth) {
      const userType = auth.userDetails.user_type;
      this.setState({
        userType: userType,
        hasSubscription: auth.userDetails.has_subscription,
      });
      const requestOptions = {
        headers: getApiHeader(true),
      };
      this.setState({ loading: true });
      axios
        .get(apiRoute('user-dashboard/get-stream-videos'), requestOptions)
        .then((res) => {
          this.setState({ streamVideos: res.data });
          this.setState({ loading: false });
        })
        .catch((error) => {
          this.setState({ loading: false });
        });
      axios.get(apiRoute('get_opentok_token'), requestOptions).then((res) => {
        this.setState({
          teacherName: res.data.name,
          liveStatus: res.data.status,
          sessionId: res.data.sessionId,
        });
      });
    }
    let { si, st } = this.context;

    st('');
    let tempEvents = [];
    this.state.streamVideos?.map((item, index) => {
      const data = {
        title: `${item?.title}`,
        id: index,
        allDay: false,
        start: moment(item.created_at).toDate(),
        end: moment(item.created_at).add(30, 'minutes').toDate()
      }
      tempEvents.push(data);
      this.setState({ events: tempEvents });
    });
  }

  stopStream = () => {
    this.cancelModal.current.click();
    const requestOptions = {
      headers: getApiHeader(true),
    };
    //Update steam status
    axios
      .get(
        apiRoute('update_stream_status/' + this.state.sessionId + '/' + 0),
        requestOptions
      )
      .then((res) => {
        this.setState({ teacherName: '', liveStatus: 0 });
      });
  };

  componentDidUpdate() {
    console.log(this.state.streamVideos);
  }
  handleSearch = (e) => {
    e.preventDefault;
    console.log(e.target.value);
    let searchData = e.target.value;
    const requestOptions = {
      headers: getApiHeader(true),
    };
    axios
      .get(
        apiRoute('user-dashboard/get-search-stream-videos/' + searchData),
        requestOptions
      ).then((res) => {
        this.setState({ streamVideos: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <>
        <Layout loading={this.state.loading}>
          <main className='admin-content'>
            {/* <section
              className='inner-banner'
              style={{
                background: 'url(../../images/anadlivestreambanner1.jpg)',
                backgroundSize: 'cover',
                minHeight: '500px',
              }}
            >
              <div className='container text-center text-white'>
                <h1>
                  Welcome to Sattva Connect <br />
                  Live Broadcasting.
                </h1>
              </div>
            </section> */}
            <section>
              <div className='row' >
                <div className="col-md-4 pl-0 pr-0  d-none-mob" style={{ height: '500px' }}>
                  <img className='grid-image' src="../../images/live-grid-3.jpeg" alt="" />
                </div>
                <div className="col-md-4 pl-0 pr-0 " style={{ height: '500px' }}>
                  <img className='grid-image' src="../../images/live-grid-2.jpeg" alt="" />
                </div>
                <div className="col-md-4 pl-0 pr-0 d-none-mob" style={{ height: '500px' }}>
                  <img className='grid-image' src="../../images/live-grid.jpg" alt="" />
                </div>
              </div>
            </section>
            {/* <section className='sec sec-inabout'>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-12'>
                    <p>
                      Sattva Connect has regular Live Stream events. Please see
                      the schedule for upcoming live streams by pressing the
                      CALENDAR button. To view an ongoing live stream, click the
                      JOIN LIVE STREAM button.
                    </p>
                    <p className='revamp-para'>International master teachers share their love for the yogic teachings and practices with you through daily live
                      classes. Broadcast from all over the world. Check out your local time and join us live! Let's liberate and celebrate!
                    </p>
                    <p>
                      All live streams are recorded and available on Sattva
                      Connect shortly after the live stream event.
                    </p>
                  </div>
                  </div>
                  </div>
                  </section> */}
            <section className='sec sec-inabout light-purplebg'>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-12 text-center'>
                    <h1 className='revamp-heading mb-5'>Live Classes</h1>
                    {/* <p className='revamp-para mb-5'> All live streams are recorded and available on Sattva
                      Connect shortly after the live stream event.</p> */}
                    <p className='revamp-para mb-5'>International master teachers share their love for the yogic teachings and practices with you through daily live
                      classes. Broadcast from all over the world. Check out your local time and join us live! Let's liberate and celebrate!</p>
                    <div className='stream-btns'>
                      {this.state.userType == 1 &&
                        this.state.liveStatus == 0 ? (
                        <Link href='/user/go-live'>
                          <a className='btn btn-sm mr-2 alt-btn'>
                            Live Broadcast Yourself
                          </a>
                        </Link>
                      ) : null}
                      {this.state.userType == 1 &&
                        this.state.liveStatus == 1 ? (
                        <>
                          <a
                            data-toggle='modal'
                            data-target='#stopstream'
                            data-html={true}
                            data-for='custom-color-no-arrow'
                            data-tip={
                              '<h6>' + this.state.teacherName + ' is Live</h6>'
                            }
                            className='btn btn-sm mr-2 alt-btn '
                          >
                            Stop stream
                          </a>
                          <ReactTooltip
                            id='custom-color-no-arrow'
                            className='react-tooltip videoTooltip'
                            delayHide={0}
                            textColor='#000'
                            backgroundColor='#ffff'
                            effect='solid'
                          />
                        </>
                      ) : null}
                      {this.state.hasSubscription == 0 ? (
                        <>
                          <Link href='/user/plans'>
                            <a
                              data-html={true}
                              data-for='custom-color-no-arrow'
                              data-tip={'<h6>Buy subscription</h6>'}
                              className='btn btn-sm mr-2  alt-btn'
                            >
                              Join Live Stream
                            </a>
                          </Link>
                          <ReactTooltip
                            id='custom-color-no-arrow'
                            className='react-tooltip videoTooltip'
                            delayHide={0}
                            textColor='#000'
                            backgroundColor='#ffff'
                            effect='solid'
                          />
                        </>
                      ) : (
                        <Link href='/user/join-live'>
                          <a className='btn btn-sm mr-2 alt-btn'>Join Live Stream</a>
                        </Link>
                      )}

                      <Link href='/user/upcoming-stream'>
                        <a className='btn btn-sm alt-btn'>
                          Calendar <i className='fas fa-calendar-alt' />
                        </a>
                      </Link>
                    </div>
                  </div>
                  {/* <div className="container">
                    <div className=" mb-5">
                    <Calendar
                  selected={this.state.selected}
                  popup
                  selectable
                  localizer={this.state.localizer}
                  views={['month']}
                  events={this.state.events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{height:'80vh', marginLeft: '15px', marginRight: '15px', backgroundColor: 'white' }}
                  className='training__calendar p-4'
                  // onSelectEvent={handleSelectSlot}
                  // onNavigate={handleSelectSlot}
                />
                    </div>
                  </div> */}
                </div>
              </div>
            </section>
            <section className=' sec-members text-center'>
              <div className="quote-container">
                <div className="quote-box">
                  <div className="quote-text-box">
                    {/* <img src="/images/right-quote.svg" className="right-quote"/> */}
                    <p className='quote-text'><img className='pr-10' src="/images/quote-left.svg" />Let's Practice together<br /> and rise as one!<img className='pl-10' src="/images/quote-right.svg" /></p>
                    {/* <img src="/images/left-quote.svg" className="left-quote"/> */}
                  </div>
                  <div className="quote-writer">
                    <h5 className='quote-writer-text'>-Anand Mehrotra</h5>
                  </div>
                </div>
              </div>
            </section>
            <section className='sec light-purplebg'>
              <div className='container'>
                <div className='class-block my-0 border-0'>
                  <div className='flex-live'>
                    <h4 className='revamp-subtitle mb-0'>Recorded Live classes</h4>
                    <div class="searchbar-form-live py-3">
                      <input type="text" className='mb-0' onChange={(e) => this.handleSearch(e)} placeholder="Search recorded classes.." name="searchInput" />
                      <button onClick={this.handleSearch} class="btn btn-sm maxw-120" type="submit">Search</button>
                    </div>
                  </div>

                  <div className='row'>
                    {this.state.streamVideos.map((item, index) => {
                      return <VideoDetails item={item} key={item.id} />;
                    })}
                  </div>
                  {this.state.streamVideos.length > 0 ? null : (
                    <div className='card-panel valign-wrapper grey lighten-4'>
                      <div className='row'>
                        <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center'>
                          No data found in this category.
                        </div>
                        <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 mt-md-0 mt-3 text-center'>
                          <Link href='/user-dashboard/search'>
                            <a className='btn btn-sm'>Discover Now</a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </main>

          <div
            className='modal fade'
            id='stopstream'
            tabindex='-1'
            role='dialog'
            aria-labelledby='transactionsTitle'
            aria-hidden='true'
          >
            <div
              className='modal-dialog modal-lg modal-dialog-centered'
              role='document'
            >
              <div className='modal-content'>
                <div className='modal-body'>
                  <h6 className='mb-3'>Stop Stream</h6>
                  <div className='table-responsive scroll-visible'>
                    Are you sure you want to end the Live Stream of{' '}
                    {this.state.teacherName}?
                  </div>

                  <div class='text-right mt-6'>
                    <button
                      type='button'
                      className='btn btn-sm mr-3'
                      onClick={this.stopStream}
                    >
                      Yes
                    </button>
                    <button
                      type='button'
                      ref={this.cancelModal}
                      className='btn btn-sm'
                      data-dismiss='modal'
                    >
                      <i class='fas fa-times'></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}
