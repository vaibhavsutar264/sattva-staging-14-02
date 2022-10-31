import React from 'react';
import Constants from '../../constants';
import Layout from '../../components/Layout';

export default function UserRegistrationSuccess() {
  return (
    <Layout>
      <div className='t3-wrapper'>
        <main>
          <section class='sec vh-100'>
            <div class='container h-100'>
              <div class='row h-100'>
                <div class='col-xl-12 col-lg-12 col-md-12 col-sm-12 align-self-center'>
                  <div class='thankyou-div'>
                    <img
                      src={Constants.SITE_URL + '/images/correct-green.png'}
                      class='img-fluid'
                    />
                    <h3>Thank You!</h3>
                    <h6>Registration successfully</h6>
                    <p>Please check your email for login details.</p>
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
