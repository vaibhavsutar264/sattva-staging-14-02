import React, { Component } from 'react';
import dynamic from 'next/dynamic';
const Chat = dynamic(() => import('../../components/user/live-stream/Chat'), {
  ssr: false,
});
const GoLive = dynamic(
  () => import('../../components/user/live-stream/GoLive'),
  {
    ssr: false,
  }
);
import Header from '../../components/user/common/Header';
import Footer from '../../components/user/common/Footer';
import { getLocalStorageAuth } from '../../utils/helpers';

class LiveStream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
    };
  }

  componentDidMount() {
    const userData = getLocalStorageAuth();
    if (userData) {
      this.setState({
        first_name: userData.userDetails.first_name,
        last_name: userData.userDetails.last_name,
      });
    }
  }

  render() {
    return (
      <>
        <div className='t3-wrapper'>
          <div className='broadcastHeader'>
            <Header className='d-sm-none d-block' />
          </div>
          <main className='admin-content'>
            <a
              href='/user-dashboard/live-stream'
              className='btn btn-toggle waves-effect waves-light'
            >
              <i className='fas fa-arrow-left'></i>
            </a>
            <section className='sec-broadcast'>
              <div className='card-broadcast'>
                <div className='broadcast-box'>
                  <div className='broadcast-header'>
                    <h4 className='user-name mb-0'>
                      {this.state.first_name} {this.state.last_name}{' '}
                      <span className='btn-success'></span> Note - Please don't
                      Close this window or Refresh this page.
                    </h4>
                  </div>
                  <div className='row m-0'>
                    <GoLive />
                    <Chat userType='1' />
                  </div>
                </div>
              </div>
            </section>
          </main>
          <div className='broadcastFooter'>
            <Footer />
          </div>
        </div>
      </>
    );
  }
}
export default LiveStream;
