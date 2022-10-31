import React, { Component } from 'react';
import Link from 'next/link';
import Layout from '../../components/user/Layout';

class SupportSuccess extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Layout>
          <main>
            <section class='sec vh-100'>
              <div class='container h-100'>
                <div class='row h-100'>
                  <div class='col-xl-12 col-lg-12 col-md-12 col-sm-12 align-self-center'>
                    <div class='thankyou-div'>
                      <img
                        src='../../images/correct-green.png'
                        className='img-fluid'
                      />
                      <h3>Thank You!</h3>
                      <h6>Your request is sent successfully.</h6>
                      <p>
                        You can expect to hear back from us within 48 hours..
                      </p>
                      <Link href='/user/support'>
                        <a className='waves-effect btn'>SEND A NEW INQUIRY</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </Layout>
      </>
    );
  }
}

export default SupportSuccess;
