import React, { Fragment, useEffect } from 'react';
import Head from 'next/head';
import Constants from '../constants';
import Router from 'next/router';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { ContextSearch } from '../components/user/ContextSearch';
import * as ga from "../lib/ga/index";

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
function MyApp({ Component, pageProps }) {
const router = useRouter();
  const gonative_onesignal_info=(info)=> {
    console.log(info);
  } 
  const handleRouteChange = (url) => {
    ga.pageview(url)
  }
  useEffect(() => {

    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <Fragment>
      <Head>
     <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
        <link
          rel='stylesheet'
          href='https://use.fontawesome.com/releases/v5.8.2/css/all.css'
        />
        <link
          rel='stylesheet'
          href='https://use.fontawesome.com/releases/v5.6.3/css/all.css'
          integrity='sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/'
          crossorigin='anonymous'
        />
        <link
          href='https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
          rel='stylesheet'
          integrity='sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN'
          crossorigin='anonymous'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        ></link>

        <link
          rel='stylesheet'
          href={Constants.SITE_URL + '/css/bootstrap.min.css'}
        />
        <link
          href='https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/css/mdb.min.css'
          rel='stylesheet'
        ></link>
        <link  
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.css" 
        />
        <link  
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css" />

        <link
          rel='stylesheet'
          href={Constants.SITE_URL + '/css/animate.css'}
        />

        <link
          rel='stylesheet'
          href={Constants.SITE_URL + '/css/course-style.css'}
        />
        

        <link rel='stylesheet' href={Constants.SITE_URL + '/css/style.css'} />
        <link rel='stylesheet' href={Constants.SITE_URL + '/css/homeNew.css'} />
        
        <link
          rel='stylesheet'
          href={Constants.SITE_URL + '/css/kirtancourses.css'}
        />
        <link
          rel='stylesheet'
          href={Constants.SITE_URL + '/css/roadtodharmanew.css'}
        />
        <script src={Constants.SITE_URL + '/js/jquery-3.4.1.min.js'}></script>
        <script
          type='text/javascript'
          src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.4/umd/popper.min.js'
        ></script>
        <script src={Constants.SITE_URL + '/js/bootstrap.min.js'}></script>
        <script src='https://static.opentok.com/v2/js/opentok.min.js'></script>
       

        <script
          type='text/javascript'
          src='https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/js/mdb.min.js'
        ></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
        <script src={Constants.SITE_URL + '/js/owl.carousel.js'}></script>
        <script src={Constants.SITE_URL + '/js/custom.js'}></script>

        <script type="text/javascript" src="/js/EnxRtc.js"></script>

        {/* Global site tag (gtag.js) - Google Analytics */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=UA-151508208-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());

          gtag('config', 'UA-151508208-1');
        </script> */}
      </Head>
      <ContextSearch>
      <Component {...pageProps} />
      </ContextSearch>
    </Fragment>
  );
}

export default MyApp;
