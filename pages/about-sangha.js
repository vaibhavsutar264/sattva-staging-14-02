import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import Head from 'next/head';

const AboutSangha = () => {
  return (
    <Fragment>
      <Head>
        <meta charSet='utf-8' />
        <title>About Sangha.</title>
      </Head> 
      <Layout>
        <div className='view intro-2'>
          <section className='inner-banner about-sangha-bg'>
            <div className='container text-center text-white'>
              <h1>Connect with a vibrant & living community</h1>
              <h5>Join our sangha, a global community of inspired yogis.</h5>
            </div>
          </section>
        </div>
        <main>
          <section className='sec sec-inabout'>
            <div className='container'>
              <div className='row'>
                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-lg-0 mb-5'>
                  <h4 className='h4-style'>Join Us</h4>
                  <p>
                    Join us by connecting with us online. Through{' '}
                    <a
                      href='https://www.sattvaconnect.com'
                      title='Sattva Connect'
                    >
                      Sattva Connect
                    </a>
                    , you will have access to a loving and vibrant tribe. You
                    may also join our closed Sattva Connect member{' '}
                    <a
                      href='https://www.facebook.com/sattvaconnect/'
                      target='_blank'
                      rel='alternate'
                    >
                      Facebook{' '}
                    </a>
                    group and follow us on{' '}
                    <a
                      href='https://www.instagram.com/sattvaconnect/'
                      target='_blank'
                      rel='alternate'
                    >
                      Instagram
                    </a>
                    .{' '}
                    <a
                      href='https://www.sattvaconnect.com/about-us'
                      title='Sattva Connect'
                    >
                      Sattva Connect
                    </a>{' '}
                    gives you access to discovering a home before a place.
                    TheSattva Connect{' '}
                    <a href='https://www.sattvaconnect.com' title='website'>
                      website
                    </a>{' '}
                    offers you a sangha, a community in which you can be
                    surrounded by others who support your path. You will be able
                    to make friends and connect with people of many
                    nationalities, backgrounds, and experience who actually are
                    pursuing the same path as you. Share your experiences and
                    read those of others in the comments section on each video
                    page.
                  </p>
                  <Link href='/plans' rel='alternate'>
                    <a className='btn btn-lg'>Sign up</a>
                  </Link>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                  <h4 className='h4-style'>Meet Us</h4>
                  <p>
                    Meet us by joining our retreats in the Himalayas or
                    internationally. Through Sattva Connect, you will receive
                    information and gain priority access to Sattva retreats and
                    exclusive Sattva events for Sattva Connect members.
                  </p>
                  <a
                    className='btn btn-lg'
                    href='https://sattvayogaacademy.com/'
                    target='_blank'
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section className='sec about-sangha-sec text-white'>
            <div className='container'>
              <div className='row'>
                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'></div>
                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                  <h4>About Sattva Center</h4>
                  <p>
                    Study with us. We have a center with incredible facilities
                    that is nestled in a lush valley in the Shivalik Mountains,
                    the pristine foothills of the Himalayas. It is a yogic
                    heaven. The luxurious Sattva Center is where yoga was meant
                    to be studied. The Center is a soul sanctuary for
                    self-discovery and personal transformation. It provides a
                    beautiful and uplifting space to study with accommodation of
                    the highest international standards and all the amenities
                    one needs to be comfortable and cared for. It is a place to
                    connect with the nature we see and the nature within. It is
                    a place for you to come to practice and meet like-minded
                    individuals. It is a community of awakened beings. We invite
                    you to come visit where you can experience living
                    enlightenment.
                  </p>
                  <a
                    className='btn btn-lg'
                    href='http://thesattva.com/'
                    target='_blank'
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </Fragment>
  );
};

export default AboutSangha;
