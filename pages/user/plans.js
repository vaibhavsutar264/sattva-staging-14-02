import React, { Fragment } from 'react';
import Link from 'next/link';
import Layout from '../../components/user/Layout';

const Plans = () => {
  return (
    <Fragment>
      <Layout>
        <div className='t3-wrapper'>
          <main>
            <section className='sec sec-inabout'>
              <div className='container'>
                <h4>Membership Plans</h4>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='plans-container'>
                      <div className='card center-align'>
                        <div className=''>
                          <div className='card-image grey darken-4 '>
                            Monthly Plan
                          </div>
                        </div>
                        <div className='osm-item-description clearfix'>
                          <p className='planP'>
                            $21 (70 cents a day for a new you)
                          </p>
                          <div className='osm-item-description-text text-center'>
                            <p>
                              Gain unlimited access to a great variety of
                              wisdom, yoga and meditation classes, daily live
                              streams from experienced international teachers
                              and Enlivening the Spirit, a 5-day retreat from
                              the foothills of the Himalayas.
                            </p>
                          </div>
                          <div className='span12'>
                            <p className='purpleText mb-3  text-center'>
                              <i>14 days free trial, cancel anytime</i>
                            </p>
                          </div>
                          <div className='card-action text-center'>
                            <Link href='/user/user-registration/2'>
                              <a className='btn btn-lg'>
                                Start your free trial now
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='plans-container'>
                      <div className='card center-align'>
                        <div className=''>
                          <div className='card-image grey darken-4 '>
                            Yearly Plan
                          </div>
                        </div>
                        <div className='osm-item-description clearfix'>
                          <p className='planP'>
                            $210 (50 cents a day for a new you)
                          </p>
                          <div className='osm-item-description-text text-center'>
                            <p>
                              Commit to yourself for a year and get an
                              additional 2 months free. Gain unlimited access to
                              a great variety of wisdom, yoga and meditation
                              classes, daily live streams from experienced
                              international teachers and Enlivening the Spirit,
                              a 5-day retreat from the foothills of the
                              Himalayas.
                            </p>
                          </div>
                          <div className='span12'>
                            <p className='purpleText mb-3  text-center'>
                              <i>14 days free trial, cancel anytime</i>
                            </p>
                          </div>
                          <div className='card-action text-center'>
                            <Link href='/user/user-registration/5'>
                              <a className='btn btn-lg'>
                                Start your free trial now
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Plans;
