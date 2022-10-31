import React, { Component } from 'react';
import dynamic from 'next/dynamic';
const JoinLive = dynamic(
  () => import('../../components/user/live-stream/JoinLive'),
  {
    ssr: false,
  }
);
import Header from '../../components/user/common/Header';
import Footer from '../../components/user/common/Footer';

class JoinStream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  setLoading = (status) => {
    this.setState({
      loading: false,
    });
  };
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
                  <JoinLive setLoading={this.setLoading} />
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
export default JoinStream;
