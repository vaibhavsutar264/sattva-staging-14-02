import React, { Fragment,useState,useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Head from 'next/head';
import {setLocalStorage} from '../../utils/helpers';
import CoursesSlider from '../../components/home/CoursesSlider';
import TestimonialSlider from '../../components/home/TestimonialSlider';
import Slider from "react-slick";
import dynamic from 'next/dynamic';
import { apiRoute, backendportal, getApiHeader } from '../../utils/helpers';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

const Testimonials = dynamic(() => import('../../components/home/Testimonials'), {
  ssr: false,
});
const Intentions = dynamic(() => import('../../components/home/Intentions'), {
  ssr: false,
});

const Plans = ({affiliateId}) => {
  console.log(affiliateId[0]);
  const [intentions, setIntentions] = useState([]);
  const [courses, setCourses] = useState({});
    useEffect(() => {
      if(affiliateId){
      setLocalStorage('affiliate_subscription', affiliateId[0]);
    }
        
    const requestOptions = {
      headers: getApiHeader(),
    };
    axios.get(apiRoute('cms-all-testimonials'), requestOptions).then((res) => {
      setIntentions(res.data);
    });
  
    axios.get(apiRoute('get-courses-data/0'), requestOptions).then((res) => {
      setCourses(res.data);
    });  
    },[]);

  return (
    <Fragment>
      <Head>
        <meta charSet='utf-8' />
        <title>
          Online Yoga & Meditation Classes Subscription | Sattva Connect
        </title>
        <meta
          name='description'
          content='Sign up for online yoga subscription. Find monthly & yearly plans for Online yoga & meditation classes. 14 days free trial, Cancel anytime.'
        />
        <meta
          name='keywords'
          content='online yoga subscription, Online yoga and meditation'
        />
        <link rel='canonical' href='https://sattvaconnect.com/plans' />
        <script type='application/ld+json'>
          {`
					{"@context" : "http://schema.org",
					"@type" : "Product",
					"name" : "Sattva Connect",
					"image" : "https://www.sattvaconnect.com/static/media/sattvabanner-logo.4aa95fc5.png",
					"description" : "We offer authentic teachings and full-spectrum yogic practices online. Sattva Connect is Your Support to an Awakened Life.",
					"url" : "https://www.sattvaconnect.com/",
					"brand" : {
						"@type" : "Brand",
						"name" : "Sattva Connect",
						"logo" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALkAAACXCAMAAAB+1QooAAAAllBMVEUAAABsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWxsCWx3G7lNAAAAMXRSTlMABdKj+A/e7BsV5fIJPNeXhM2dMCEra1KxNshjSyXDuop5fmamknFHXkJ1q7+2j1ZauLGX7QAAEs5JREFUeNrU11nSojAUBeATDCEBAorMIgr4q+BA3/1vrgn0uIBW+3sJVYGqU+ReEvDPMEBVALPxn2FphbPY4zngf3Mq9wGFW97hf2InYDUJIu7yM+ytj/+F2oQ9J/JyIqrjusb/40aciNZ4EHFvGv8PcsziFU1KpQqHJql/uSh8vE44njCBua5KOdDkvvEckeHDnflg72jCn4g7hjtNvE7feYWPZjs5AFMswVZKGcvKFHwLMOvB8Mkq3gHQDhGvN5ZlbUoiEgrA4Mb4ZOOcHFV+smhR3h8ak1Z8dvI9P8Fg/o0Wnc8w8YP8s6sFR57CYA9aaMy+uMaHYn3atu05C/hTYnJpxizLurOPif2kr23XtM2uwKfpLIc8d/mUixF/q0qijeU6jsfdzYgPwcZ1ArZyol7atq1i3a0cOmzxC9M5F6urjtU0L6ub0wJFlL79FMYiJx/Y0S3wiwo5UagZDFWdiOiM3ypvh/XBC98d/RvXgKbKXGYwEuurGh/E8+te9eua6N604mHD2JlbWkf52L29Y0OLATehAOjyDECWLQPsIxGJwCGiRgFJuZrX554ASLw1oHmG97pOya50tzHprT3QBxKSgUW0OAK+RCISQDsFJpLzLN68dWNSuo8REnlPS2MSi8IkVzivGWRARmmDRSOUlQDfhI3J2b0RiQr7Xtt4i28WJ7HDeMwQmmA43X1AWiFrNwwYyMgA3/1m304AYm+YOzTFNd1j7RDVPd7gQpHWEY2AiSue3cPdY5JsSpEB2AsiCmwA16A+mRGZG6YrfmKYDHTU/cEr8HLS+sKkzjHLAqLb8LUexlj2EkZORF8w4kIl34b1M62JLA3DD8wUe8c/ak8aTGq3xYQVgyDiNNuEw67SOhMUeHXW66prVgHNOFGQbpd9oCwUcHVivNrFJG+dpw8gWRF59/awhDPMcHA7y/KI02+Pdc2JhxKAykUHjE6CV4tFaMoAk6ugTVrYhUuPIdOX3VHM2ddjs0s9mljH6+UytjWJrTKrE1TzOkmw3GJ4uYaWc6AMydnZgG3xCgt7MIH54XhyptHpbMzYN2/jA2rgdFQ/jpBXvJ6f030sdOPSQWKSUg9ZKRhJSRPhkpHvYcRjgoxnP6bFurqcBa0Z3sBurLmeVzYmLL9DH0qzv/crxzTquN/uapq4YQFoYVk9q0MYcmmJww5vIvXlTrUPwy6f9r1RqxyNRxOxxUSdyHA7fxOp8wOrG2bKokgXPt4ndtwtZuyQs4vC3jFbe+nSDTP7Tm4piHI3gb1F+cRC00bhnUJa/+7YAsCZyBptbKnEYkcX2J1L1ABIuf795Bmvp9dRIzGRLk/wU+ScryGR2APw72ssLnQBUDjEV0Pk/U6r+VJm+3XUJniR1uMBlQmAb/TAomi/unDjHMyr3IaNr3wsGjfujjFC3oTWKc3ancRM1fMaaUEBiR1eYkcraY8UMSCiAbOj5zlukErWOkUiPJ4zLKTbhB4v456uUGngOo5z/aPQWO30dnzgBV6hFiZWFChIi5YYHT1tqNZr8XTiUGCkFDPbOu28Xrndns6I+FH6MuIaRksbBsWPAJT4wguYU953au21WU0YCAPwGyGBhHAV5CKCFxStoGf//58rRzytbe1Mv9TL88WMTGaWzGxmh92F6yqfYU/0Md4rFT7tyN2bhzJiLMzwKekaZvSQRj78n445ycLjNXIqwapJcrARVRr/H5t0mBZWJcEnNJ6t7gwAElL4tpldFtGlCFC0TbuCacnFhPWCMQmgqvHpRNRpLEJVS9ZnDA9wohbxQQNbGiL7+mruZnugETqgJrYzKoGkb875KjRpyacdzbhnALvoYIwVgD6SohUgDzZS2uARYuWkHGwRUdQ6Y63HlkI1EjAszQ2TyAoAyBgD/c0hi8wlFsK/1LZiTGpbOG5NQczAz9RJPMS0oLCpydxqPqEWg2u9y4tQA22wdnHjTJNdC3AvxCCRuEgpg4zI6ZsJ9Qs8iJw3RX0Jb0dH/FSaM51+5PhNo2wMDLp5wioqAbTLrjD2Go/DuL6mK6X4ojvHn1iWElGMW4cxG0rq8cOOejZu4gxP4TpOixHbEonNQsab0Nrghm3WHIOIAlzNSU3xZKllfltgkBtEKgdsCSxpyfADV4XEQNbkJxgkAYkWT+cWJLKt31vkkw8EwjtxBBSxm8hrPS6WpLLttlfUP/3EP8k0E5Y1OSUubbAy9zOqbLalSONK0hJXeVAI5Rnly0y9MK4ZkNIZ8yVQUoAh9KPEaG7dXiqMvV6rK6ev7pawwQIKx4AT8fLTOfraZ2bNpfg9C2d7iN2dEK93yL9rxz5ubgWNBGCvlKiPmzrC61ubfj6dOVscZ/ikY1vb3gFvYF8pEa6BtMeXD+8NZlsGLJlyALxqcRUZeCvLE0ay2OOt5JW8LpSLt8Kz9KtzbuO9BNvrb/P6t/mv2s7GgDXvMvP3Q+K5GPD+zRIU0NkcAzt8swQd+NF49K89vnXPrNYADsXLlOL/rAwlgH2Gt5OLGMDuiJckZ1ETfUtwTyyml+v8Lxv9YeMCz3L2yOoKU33DHfJyLW4N3LH3aFIrUis8xzfyXA4td+bpXuSTFkDU3B07jmwOndTk4xlaCmOg9G1sqL0XeQnAON4bJD2BLTcAP9IGj6crcoGZtebDMmP4HZ+cATQZ/hCoGGyjTgy2siQeznUywFYzDCJPA+BBUaw4rqT3AcCo8WVeFVGMwTG87LdcIHjGoc9oDkytHIOsY4DsnKNh1hqjWJQAogpXJ6eOxr7vaXxP9QG4ZoSHW5N7GXHmQGrOAWZY04Vd0gyjqToAWIYaFwfa8akdFvoz3BUDWzsLwLZ6PNyKXACtWQUGHTmwUPPEa+EZGB3MHMD6eztXoqWsDYWTEBIg7IsgyiKCorjd93+5yqgDUdvTn2k7055+58wIGLhfLndJLhFbe8QTTbPjgC97Q4fOTT66qPNvyLFrON9XCxsfxm3x+YbhiLqPmCn0MMZLuns8o2hRUWNj/WHyj6e3kfiGuLgTNxM1dfX2SdzM5sIL76ElP5xsfqhYed9PKDe2SyO77d1PmsEM/ePQba6hAdHuyNUocR7HdueSJScvjx85Xq0OW5zau/k4sqbwHeXocpwBXS4AEnXIr+nM7xxfSVanPBotzQBBfXUUnxL0DdBtWHwSZ8topwCZqY/9Lj/WyfHY5d2R3NSM4xyO28DKP9nuuAjQd2AHtP0c0W69hTkvOD84bum3nl/Uq8Rmnlsd/CJvSrc5Gpws1S3ZmCx+EIcN+h60FJrwI1YIHZ/FBaHIJ8ywu9XRZ3V5dKzcV4q89BRiMFLvEAqEqyJSfdyyFUCFvgsxA7bqn2oxX4/FR5jAmja3FqmveHne7dMD6Xy/brdaqN7W41Tmvg/00ToHscHo2xCeKBhFZTng8fu6fm2WGpedUFzjUBQdKzaGYxl2ld19lKZwsPYJA6jn6CtwE+UraCobeoiPpaur/d5J+83VVnhrx6gdI9+caNP2LYiy2qzcut+kcAUvy+lykwop5GvwioSCR7iAO6jHwK98my1cJUk6f+3TU+1TntLPFty+7hyPHvkCFIS/ChSLap7N44XrO43flXHmpficutTbtyms1g4c3A75hrWsaqVp/HIWW2FwES4yvyT269DYKrLzDyterqM+B/EMZWzWUVI7aVlwscgdpLK6b9tezI+KHYsvPELfDAvmutWvKZp7jLASqd71D1f2Iqe08BkVq8bQVNQaIZoxYrMLun5ac5V/e71RJ10YsD3KjE7FlrEOjPmcF/osyfak29hJ0BZaQ9cqWVp8gXEllmjJt5r7/TpHO5vTTkUnpvamklsk8ipP0Q7nWTnbumWbWrGxYpYfN8Vt+mSiUhh8hr4f4SU2+zEurhA6HTJmncItT8HdOYQf1xWkZG36cy9oCEJVthQRQtv2+zX+gGq7iCSdWCKFZLoL1D6idXtx0Ypz6DTtSPCcFzXXl/TnkP4AVjwcHdIzQmFBDpS2FqwbZV8sxdrikKZ9GX1eXL9XvJ/2eHRLy6H2RTcIu8BWVQKdjmIByjAi/3HLF7AL3TYMs/laYXDq52vbqHX1ONQRWlOebKws1KwGup9XT8cnoPwKyn0SoSC1LVQekXaw+zWsCQF+hYD65xG/wvI9r2hic17gUJyWG5Xw8Ny2YomSGd6ViUe6H/6ihcjYulAh5NpeglAMx4Bd0L8C2BG2z081xBEUpdF5/PgjbeQNzMsOr6ix6BMs+Ga0+GmB8I9xW0WKv03bYRD9nmw9Rn8fcKt/6fRZYhssLzP0DhemyUMvxRlBsW6XWCmN80Djn25qmCu1a6IB/YEVRiMEYoemIzvADcZb7XZPNcEKJGxuJu/BGDS8L2EH+VfzCoArz4/hhCZD9wB4V50IgDijFwQGyM+XF8YVjANw1m9dbsy7/iCjAEZ/lOifvSzHOmLAMkn2cGACTgDerne1kgJT35QVgcaSS2aapql7gJkaamF4P0O7buuaB3am90fxvdtc+vXZGqCWS9wUYD19ggmPVak+OePXB7UAw7JhiUT7GiZTILLHHcfdNhOApaTyHADyqWFpK8B/aFNDL9gAUHgzJZsNypIMz5avcR53OxDgSTpYUqB9Z6YhplD+QbROId8DuO+YL15bvzBXbTDCkW/vkeywxtmYXKGec0hNJEHW2eoqnekTmfduMnt8S4AGkvNz6Mxjf3ASzAOAo6L3wIfeCSqAxVTmloAc3+0SoJOMpQHYopZODoxLAEh/x9YsCjVGkQEpnshcPQB9BACAs+T8vI+3OoHJb+1YCACan9+lYR9o36caaDyROZo9QrpmAJG+3NzSmNt/TMSugCu82Qv3gMNBvXmxgicyjwwg+v0MR2p8V/acTw+MCMcdBYB8i17d686Izycy72/YuZeRgNg+ZYTT0GAyzHlDAZ6KgNpnUNkAlFOZxxT8m2oP5lhiAdx6eG5ifm1xMICInrSy+Rxf2NpE5n1QzT6C+ex3MmAxyJ0G3AH4chaC0750XbfcewCLiczRquese8A1qeQEUN8vXtztZjoCQ0o5S5CQ44nMMwEHvKWgPCXAMQzta0o/SiOUBIAKeoOgAMuJzFECNKueznfli08oiamWa30yT4Bn4yyUZ1nwgUjbACRTmV8AnBS8cejTDWBWFtygxQKI+uuLQKAZxRJ7uIAvuZROQATTmN/fH7WSspA0isPJhMBo8SH5bsaekhkyCxfgNJE5OgHICUEl8v6F/npgxA7A4SatFSCiMdPy2X3Dicy3AmRmF4DOlHvy66+PymwAex1lO0XyE81+nk/UAOuJzM1cbo2LYSAk6enXYDHo/bz/50rMOiQhBkj1wVDfzokIMIn50NrW5LTqqc+R08jQryLyDeh5F+eR9grOtk+KKziPh55xvnhlXggvfHtjqS9lIWFskIyGi/2UquzCLTfWWAs4CKKXEBHMtYFkEOivTpPNI4zeIVnLFw/UZ0MLggz9RIT/lirv//gvA+tR9mKJahZpWA4vwbCPzZHH6fLhYQdfYeK3wuRGfatfh3k+AoDhSM4dlQwADq3UoeOQLlbpUKV16mE6TpZDLCwO+RVpIwm7FL2wJvxM4l5+KIo8LbRfj4kdiMSvPalaueBAauUoIBlHRwdmQ0qNR4XpakiGsyHHASW2bbMaj4QlwK/CCPiPntSMGCAII9kvp38Gfm8F2r7EoxTKWw0hPPeBjag3QC+flbXteNZTPTZHaT6gRXhFpo+IM3CCPjesTg9heqa10Gih9svmksCDsToam7P5/WauoBgzBxo/mC/HzGH2hvlrybAA9yFsRHQL5aSXsHvmi8Mmg3x8GFWmHHoyxPYN84bA5U8wj9/XMGNoJjD339TBLUEGAfFIvgO7LeXzV+ZxxMX51VoO0RWjyNMNWvgycz2lrz69Ht89TdjawLxFMzCsF+Z7tBRi+cxcUMYMZjTDWFLofxlzjRiv928zntCaBstGzHtyLHhmvkGoBb57Zs6PRVGkm+EBCMN/nc49qr8p67ujFoJJOu+DIMtemaOWGtaznZtPE9K/UOe4g/i1REo9PCq7FFhmjl3w9PKFOZpRlrUS86PMHBfDSV/30BaK16TqjbpzhBmSmSNcQvGs8x57SB1YS8yfHSj565ib6Wf5etDz5cOU72yIKjF/vGXpDXNUAcjWgpEElXyqwcTTmMt1C1fr7Xk9yqENsKWOEA5LELtx9r/cO+m/ZY5KiTk96qqq6uoo53CoBmFfZI4sAobvnvLxlBmXAGlTKhykl5son7zMcfZ3hzLQaWQtcxBFP+Jy8HjBJhiOe0pBkazFQZMQVgQAuBJIubXmAEDcTCousHiYLQ/KXRuf22ZSDTr3iH0FqyVhrt0L88fCdqxCE6FvF/Hz3BdH58Xu+XlVOLhcZA2HM3VgNhzG2g06kqBdhWVYEhWOmsj4DY38GBd+m+XaAAAAAElFTkSuQmCC"
					},
					"offers" : {
						"@type" : "Offer",
						"availability": "https://www.sattvaconnect.com/user-registration/5",
						"url": "https://www.sattvaconnect.com/plans",
						"price" : "210",
						"priceCurrency": "USD"
					},
					"aggregateRating" : {
						"@type" : "AggregateRating",
						"ratingValue" : "5",
						"bestRating" : "5",
						"worstRating" : "1",
						"ratingCount" : "44"
					},
					"review" : {
						"@type" : "Review",
						"author" : {
						"@type" : "Person",
						"name" : "Amaya Zelena Garcia"
						},
						"datePublished" : "2020-03-14",
						"reviewRating" : {
						"@type" : "Rating",
						"ratingValue" : "5",
						"bestRating" : "5",
						"worstRating" : "1"
						},
						"reviewBody" : "Since I have returned from YTT, Sattva Connect has been an invaluable tool in my personal practice. The ability to access their library of classes to customize my daily practice is amazing! I love the option to choose the duration of the class so when I’m short of time I can squeeze a 15 minute practice after meditation before I start my day. As a teacher, Sattva Connect is the best tool for “continuing education.” The labs are my favorite, especially when I want to master a pose or kriya before I teach it. After three months at SYA, Sattva Connect has made the transition in keeping a consistent daily practice at home effortless."
					}}
					`}
        </script>
      </Head>
      <Layout>
        <div className='t3-wrapper'>
          <main>
            <section className='sec sec-inabout light-purplebg'>
              <div className='container'>
                <h4 className='revamp-heading text-align-center'>Membership Plans</h4>
                <div className='row mt-5'>
                  <div className="col-lg-1"></div>
                  <div className='col-lg-5 col-md-8 plans-mx-auto px-mob-none pr-4'>
                    <div className='plans-container mb-4'>
                      <div className="plan-box">
                        <div className="plan-header mb-3">
                          <h3 className='purple-text revamp-subheading'>Monthly Plan</h3>
                          <p className='revamp-para-small fs-italic'>14 days free trial, cancel anytime</p>
                        </div>
                        <div className="plan-pricing">
                          <h3 className='purple-text revamp-subheading'>$21</h3>
                          <p className='revamp-para-small'>(70 cents a day)</p>
                        </div>
                        <button class="benefit-btn   OnlineCoursesBtn wow fadeInUp">
                          <a href='/user-registration/2' class="puprleHover_Golden">Start your free trial now!</a></button>
                        <button class="benefit-btn OnlineCoursesBtn wow fadeInUp">
                          <a href='/gift-subscription/2' class="puprleHover_Golden">Gift Subscription</a></button>
                        <div className="plan-details mt-4">
                          <div className="plan-check mr-3">
                              <img src="./images/purple_check.svg" alt="" />
                          </div>
                          <div className="plan-detail-text">
                            <p className='revamp-para-small'>Unlimited access to 1000+ yoga classes </p>
                          </div>
                        </div>
                        <div className="plan-details">
                          <div className="plan-check mr-3">
                              <img src="./images/purple_check.svg" alt="" />
                          </div>
                          <div className="plan-detail-text">
                            <p className='revamp-para-small'>Daily live sessions </p>
                          </div>
                        </div>
                        <div className="plan-details">
                          <div className="plan-check mr-3">
                              <img src="./images/purple_check.svg" alt="" />
                          </div>
                          <div className="plan-detail-text">
                            <p className='revamp-para-small'>5-day Enlivening the Spirit Retreat </p>
                          </div>
                        </div>
                        <div className="plan-details">
                          <div className="plan-check mr-3">
                              <img src="./images/purple_check.svg" alt="" />
                          </div>
                          <div className="plan-detail-text">
                            <p className='revamp-para-small'>The Alchemy of Life Wisdom Series </p>
                          </div>
                        </div>
                      </div>
                      {/* <div className='card center-align'>
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
                              <a href='/user-registration/2' className='btn btn-lg'>
                                Start your free trial now
                              </a>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className='col-lg-5 col-md-8 plans-mx-auto px-mob-none pb-5 pl-4'>
                    <div className='plans-container'>
                      <div className="plan-box">
                        <div className="plan-header mb-3">
                          <h3 className='purple-text revamp-subheading'>Yearly Plan</h3>
                          <p className='revamp-para-small fs-italic'>14 days free trial, cancel anytime</p>
                        </div>
                        <div className="plan-pricing">
                          <h3 className='purple-text revamp-subheading'>$210</h3>
                          <p className='revamp-para-small'>(Save $42, 50 cents a day)</p>
                        </div>
                        <button class="benefit-btn   OnlineCoursesBtn wow fadeInUp">
                          <a href='/user-registration/5' class="puprleHover_Golden">Start your free trial now!</a></button>
                        <button class="benefit-btn   OnlineCoursesBtn wow fadeInUp">
                          <a href='/gift-subscription/5' class="puprleHover_Golden">Gift Subscription</a></button>
                        <div className="plan-details mt-4">
                          <div className="plan-check mr-3">
                              <img src="./images/purple_check.svg" alt="" />
                          </div>
                          <div className="plan-detail-text">
                            <p className='revamp-para-small'>Unlimited access to 1000+ yoga classes </p>
                          </div>
                        </div>
                        <div className="plan-details">
                          <div className="plan-check mr-3">
                              <img src="./images/purple_check.svg" alt="" />
                          </div>
                          <div className="plan-detail-text">
                            <p className='revamp-para-small'>Daily live sessions </p>
                          </div>
                        </div>
                        <div className="plan-details">
                          <div className="plan-check mr-3">
                              <img src="./images/purple_check.svg" alt="" />
                          </div>
                          <div className="plan-detail-text">
                            <p className='revamp-para-small'>5-day Enlivening the Spirit Retreat </p>
                          </div>
                        </div>
                        <div className="plan-details">
                          <div className="plan-check mr-3">
                              <img src="./images/purple_check.svg" alt="" />
                          </div>
                          <div className="plan-detail-text">
                            <p className='revamp-para-small'>The Alchemy of Life Wisdom Series </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-1"></div>
                  {/* <div className='col-md-6'>
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
                              <a href='/user-registration/5' className='btn btn-lg'>
                                Start your free trial now
                              </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </section>
            <CoursesSlider title={'Own a Course'} coursesData={courses.courses} />
            <section className=' sec-members text-center'>
          <div className="quote-container">
                <div className="quote-box">
                  <div className="quote-text-box">
                    {/* <img src="/images/right-quote.svg" className="right-quote"/> */}
                    <p className='quote-text'><img className='pr-10' src="/images/quote-left.svg" />To live our most authentic lives, we must move beyond the<br /> fearful chattering of the mind and dive deep into the awakened heart.<br /> Sattva Connect is your support to an Awakened Life.<img className='pl-10' src="/images/quote-right.svg" /></p>
                    {/* <img src="/images/left-quote.svg" className="left-quote"/> */}
                  </div>
                  <div className="quote-writer">
                    <h5 className='quote-writer-text'>-Anand Mehrotra</h5>
                  </div>
                </div>
            </div>
          </section>
          <TestimonialSlider testData={intentions}/>
          </main>
        </div>
      </Layout>
    </Fragment>
  );
};

export const getServerSideProps = async ({ params }) => {
    
    let {affiliateId} = params;
    if(affiliateId==null){
        affiliateId = 0
      return {
          props: { affiliateId
  
          },
        };
      
    }
    else{
    return {
      props: {affiliateId},
    };
  }
  };

export default Plans;
