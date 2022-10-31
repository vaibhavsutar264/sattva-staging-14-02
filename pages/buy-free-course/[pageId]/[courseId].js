import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { apiRoute, getApiHeader } from '../../../utils/helpers';
import BuyCourseFormWithotPayment from '../../../components/course/BuyCourseFormWithoutPayment';
import Layout from '../../../components/Layout';
import Fade from 'react-reveal/Fade';

const BuyCourse = ({ banner, course, courseId, pageId }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Layout isHome={true}>
      <Head>
        <meta charSet='utf-8' />
        <title>Buy Course.</title>
        <meta name='description' content='Buy Course.' />

        <script>
          {`           

					 !function(f,b,e,v,n,t,s)
					

					 {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
					

					 n.callMethod.apply(n,arguments):n.queue.push(arguments)};
					

					 if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
					

					 n.queue=[];t=b.createElement(e);t.async=!0;
					

					 t.src=v;s=b.getElementsByTagName(e)[0];
					

					 s.parentNode.insertBefore(t,s)}(window,document,'script',
					

					 'https://connect.facebook.net/en_US/fbevents.js');
					

					  fbq('init', '2255546191382402'); 
					

					 fbq('track', 'PageView');
					 `}
        </script>
        <noscript>
          {`       

						<img height="1" width="1" src="https://www.facebook.com/tr?id=2255546191382402&ev=PageView&noscript=1"/>
						
						  `}
        </noscript>
      </Head>
      {loading && (
        <div className='preloader-background'>
          <div className='big sattva_loader active'>
            <img src={'/images/loader.png'} />
          </div>
        </div>
      )}
      <div className='main coursePage'>
        {banner ? (
          <div>
            <div
              className='secCourseBanner'
              style={{
                backgroundImage: `url(${banner.image})`,
              }}
            >
              <div className='container'>
                <Fade bottom>
                  <div className='row'>
                    <div className='col-xl-6 col-lg-7 col-md-8 col-10 pr-0'>
                      <h1
                        className='textTheme'
                        dangerouslySetInnerHTML={{
                          __html: banner.title,
                        }}
                      ></h1>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: banner.description,
                        }}
                      ></p>
                    </div>
                  </div>
                </Fade>
              </div>
            </div>
            <div className='CourseBannerContent'>
              <div className='container'>
                <h1
                  className='textTheme'
                  dangerouslySetInnerHTML={{
                    __html: banner.title,
                  }}
                ></h1>
                <p
                  dangerouslySetInnerHTML={{
                    __html: banner.description,
                  }}
                ></p>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        <section className='sec'>
          <div className='container'>
            <BuyCourseFormWithotPayment courseId={courseId} course={course} />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { pageId, courseId } = params;
  const getBanner = await fetch(apiRoute('cms-page-banner/' + pageId));
  const banner = await getBanner.json();

  const courseDetails = await fetch(apiRoute('course-detail/' + courseId));
  const course = await courseDetails.json();

  return {
    props: { banner, course, courseId, pageId },
  };
};
export default BuyCourse;
