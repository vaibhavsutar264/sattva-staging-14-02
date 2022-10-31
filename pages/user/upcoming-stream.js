import React, { Fragment } from 'react';
import Head from 'next/head';
import { apiRoute } from '../../utils/helpers';
import Layout from '../../components/user/Layout';
import Moment from 'react-moment';

function UpcomingStream({ banner, allStream }) {
  return (
    <Fragment>
      <Head>
        <meta charSet='utf-8' />
        <title>
          Live Streaming Yoga Classes, Satsang with Anand Mehrotra | Sattva
          Connect Broadcast Channel
        </title>
        <meta
          name='description'
          content='Join us Live Streaming Yoga Classes, Satsang with Anand Mehrotra @ Sattva Connect Live Stream Channel. Register to join an ongoing live stream event.'
        />
        <meta
          name='keywords'
          content='Live Streaming Yoga, Live yoga classes online, Live Stream Yoga Classes, Live Satsang with Anand Mehrotra'
        />
      </Head>
      <Layout>
        <div className='view intro-2'>
          {/* <section
            className='inner-banner'
            style={{
              backgroundImage: `url(${banner.image})`,
            }}
          >
            <div className='container text-center text-white'>
              {banner.title ? <h1>{banner.title}</h1> : ''}
              {banner.description ? (
                <h2 className='sp-posttitle animated-two fadeInUp sp-animation-2'>
                  {banner.description}
                </h2>
              ) : (
                ''
              )}
              {banner.link ? (
                <div className='read-more-wrapper animated-four fadeInUp'>
                  <a
                    href={banner.link}
                    className='btn waves-effect waves-light btn-lg'
                  >
                    Learn more
                  </a>
                </div>
              ) : (
                ''
              )}
            </div>
          </section> */}
        </div>
        <main className='light-purplebg'>
          <section
            className='inner-banner'
            style={{
              background: `url(${banner.image})`,
              backgroundSize: 'cover',
              minHeight: '500px',
            }}
          >
            <div className='container text-center text-white'>
              <h1 className='revamp-signature-heading mb-0'>{banner.title}</h1>
              <p className='revamp-banner-para'> {banner.description}</p>
            </div>
          </section>
          <section className='sec sec-inabout bg-white'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12 text-center'>
                  <p className='revamp-para'>International master teachers share their love for the yogic teachings and practices with you through daily live classes. Broadcast from all over the world. Check out your local time and join us live! Let's liberate and celebrate!</p>
                </div>
              </div>
            </div>
          </section>
          <section className='sec sec-inabout'>
            <div className='container'>
              {allStream.map((item, index) => {
                return (
                  <div className='upcminglivestream' key={index}>
                    <div className='card'>
                      <div className='row mb-5 mt-5'>
                        <div className='col-xl-4 clo-lg-4 col-md-4 col-sm-6'>
                          <div className='card-image'>
                            <img
                              src={item.image}
                              className='img-fluid'
                              alt=''
                            />
                          </div>
                        </div>
                        <div className='col-xl-8 clo-lg-8 col-md-8 col-sm-6 mt-sm-0 mt-3'>
                          <div className='stamTitle'>
                            <h4 className='h4-style revamp-blog-title'>{item.event}</h4>
                            <p className='streamTeacherName'>
                              with <span className='quote-writer-text black-text'>{item.name}</span>
                            </p>
                          </div>

                          <p
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          ></p>
                          <p className='underline'>
                            <span>
                              <strong>Schedule:</strong>
                            </span>{' '}
                          </p>

                          {item.schedule.length > 0 ? (
                            <div className='singleSchedule'>
                              <p><Moment>{item.schedule[0]}</Moment></p>
                            </div>
                          ) : (
                            ''
                          )}
                          {item.schedule.length > 1 ? (
                            <a className=' showMoreSchedule scheduleBtn'>
                              VIEW MORE
                              <i
                                class='fa fa-angle-down'
                                aria-hidden='true'
                              ></i>
                            </a>
                          ) : (
                            ''
                          )}
                          <div className='allSchedule'>
                            {item.schedule.map((items, index) => {
                              return index !== 0 ? <p><Moment>{items}</Moment></p> : '';
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          {/* <section className='sec upcoming-last-sec'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12 text-white text-center'>
                  <h2>
                    You have to be a member in order to join a Live Stream
                    event.
                  </h2>
                  <Link href='/user/plans'>
                    <a className='btn btn-lg mt-3'>Sign Up</a>
                  </Link>
                </div>
              </div>
            </div>
          </section> */}
        </main>
      </Layout>
    </Fragment>
  );
}

export async function getStaticProps() {
  const getBanner = await fetch(apiRoute('cms-page-banner/MTg='));
  const banner = await getBanner.json();

  const getStreams = await fetch(apiRoute('get-upcomming-streams'));
  const allStream = await getStreams.json();
  return {
    props: {
      banner,
      allStream,
    },
    revalidate: 1,
  };
}

export default UpcomingStream;
