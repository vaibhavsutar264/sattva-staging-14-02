import React, { Component } from 'react';
import Router from 'next/router';
import Layout from '../../components/user/Layout';

class RegistrationSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      count: 10,
    };
  }

  componentDidMount() {
    setTimeout(() => Router.push('/user/me'), 10000);
    this.interval = setInterval(
      () => this.setState({ count: this.state.count - 1 }),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Layout>
        <div className='t3-wrapper'>
          <main>
            <section class='sec vh-100'>
              <div class='container h-100'>
                <div class='row h-100'>
                  <div class='col-xl-12 col-lg-12 col-md-12 col-sm-12 align-self-center'>
                    <div class='thankyou-div'>
                      <img src='/images/correct-green.png' class='img-fluid' />
                      <b>
                        Thank you for the subscription, it's free for 14 Days
                        and after that your subscription will start.
                      </b>
                      <p>
                        All the Locked features are now unlocked and you can
                        start your free Sattva Journey.
                      </p>
                      <p>
                        Please hold on while we redirect you to the Explore
                        Page, where you can see all the videos.
                      </p>
                      <div class='backdiv'>
                        <h3>Redirect in {this.state.count}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </Layout>
    );
  }
}

export default RegistrationSuccess;
