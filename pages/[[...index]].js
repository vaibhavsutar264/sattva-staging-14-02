import React, { Fragment, useEffect, useState } from "react";
import HomeBanner from "../components/home/HomeBanner";
import Layout from "../components/Layout";
import Head from "next/head";
import Slider from "react-slick";
import dynamic from "next/dynamic";
import { apiRoute, backendportal, getApiHeader } from "../utils/helpers";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import CoursesSlider from "../components/home/CoursesSlider";
import axios from "axios";
import UpcomingStreamSlider from "../components/home/UpcomingStreamSlider";
import TestimonialSlider from "../components/home/TestimonialSlider";
import validator from "validator";

const Testimonials = dynamic(() => import("../components/home/Testimonials"), {
  ssr: false,
});
const Intentions = dynamic(() => import("../components/home/Intentions"), {
  ssr: false,
});

var settings = {};
const Home = ({ index }) => {
  var settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [intentions, setIntentions] = useState([]);
  const [courses, setCourses] = useState({});
  const [upcomingStream, setUpcomingStream] = useState({});
  const [Email, SetIsEmail] = useState(false);
  const [ErrorMsg, SetErrorMsg] = useState(false);
  const [subscribeMsg, SetSubscribeMsg] = useState(false);

  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });

  const onSubscribe = (e) => {
    e.preventDefault();
    console.log(e.target.email.value);

    axios
      .get(apiRoute(`mailchimp-subscribe/${e.target.email.value}`))
      .then(function (response) {
        if (response.data.id) {
          SetSubscribeMsg("Thanks For subscribing");
          SetErrorMsg(true);
          setTimeout(function () {
            SetErrorMsg(false);
          }, 4000);
        } else {
          SetSubscribeMsg("You are already subscribed thank you !");
          SetErrorMsg(true);
          setTimeout(function () {
            SetErrorMsg(false);
          }, 4000);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (isDesktopOrLaptop) {
    settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: false,
      arrows: false,
    };
  } else {
    settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      arrows: false,
    };
  }
  var communitySettings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    if (index) {
      localStorage.setItem("uniqueAffiliate_id", index);
    }

    const requestOptions = {
      headers: getApiHeader(),
    };
    axios.get(apiRoute("cms-all-testimonials"), requestOptions).then((res) => {
      setIntentions(res.data);
    });

    axios.get(apiRoute("get-courses-data/0"), requestOptions).then((res) => {
      setCourses(res.data);
    });

    axios
      .get(apiRoute("get-latest-upcomming-streams"), requestOptions)
      .then((res) => {
        setUpcomingStream(res.data);
      });
  }, []);

  const getBackgroundImage = (image) => {
    var img = {
      backgroundImage: `url(${image})`,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: `center`,
    };
    return img;
  };

  const changeSubscribe = (e) => {
    if (validator.isEmail(e.target.value)) {
      SetIsEmail(false);
    } else if (e.target.value == null) {
      SetIsEmail(false);
    } else {
      SetIsEmail(true);
      SetErrorMsg("Enter Valid Email");
    }

    alert(e.target.value);
  };

  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <title>
          Online Yoga Classes | Live Streaming Meditation & Satsang With Anand
          Mehrotra | Sattva Connect.
        </title>
        <meta
          name="description"
          content="Sattva Connect provide Online Yoga Classes & Live Streaming Meditation with Anand Mehrotra. Learn from Master Teachers, Register to join Now!"
        />
        <meta
          name="keywords"
          content="Online yoga classes, kundalini yoga online classes, online yoga classes for beginners, Hatha yoga online class, Prenatal yoga classes online, online meditation classes, Live Streaming Yoga, Live Stream Yoga Classes, Live Satsang with Anand Mehrotra, Live yoga classes online, Online yoga and meditation, yoga exercises online"
        />
        <link rel="canonical" href="https://www.sattvaconnect.com/" />

        <script type="application/ld+json">
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
						"logo" : "data:image/png;base64,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"
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
        <script type="application/ld+json">
          {`
			{"@context": "https://schema.org",
			"@type": "Organization",
			"name": "Sattva Connect",
			"url": "https://www.sattvaconnect.com/",
			"logo": "https://www.sattvaconnect.com/static/media/sattvabanner-logo.4aa95fc5.png",
			"alternateName": "Sattva Yoga",
			"sameAs": [
				"https://www.facebook.com/sattvaconnect/",
				"https://www.instagram.com/sattvaconnect/",
				"https://twitter.com/SattvaConnect",
				"https://www.pinterest.com/sattvaconnect/"
			],
			"contactPoint": [
				{
				"@type": "ContactPoint",
				"telephone": "",
				"contactType": "customer service",
				"email": "info@sattvaconnect.com",
				"availableLanguage": "en"
				}
			]}
			`}
        </script>
      </Head>
      <div className="indexLogo">
        <Layout isHome={true}>
          <HomeBanner />
          <main className="homePage">
            {/* {isTabletOrMobile && <h1>Hello Mobile</h1>}
         {isDesktopOrLaptop&& <h1>Hello Lapop</h1>} */}

            {/* sandeep comment
          <div className="sec-2 side-design">
            <div className="myContainer">
                <div className="row">
                    <div className="col-md-5 video_content_area">
                        <div className="video-content ">
                            <h1 className="wow fadeInUp revamp-heading" >Sattva Connect</h1>
                            <p className="wow fadeInUp revamp-para" >Practice yoga as it was intended. The only online yoga platform originating in Rishikesh, India - the Yoga Capital of the World. Learn directly from the source. Study with Himalayan Master, Anand Mehrotra.</p>
                        </div>
                    </div>
                    <div className="col-md-7 video_img_area">
                        <div className='video_imgArea' id='YourIFrame'>
                             <iframe id='YourIFrame' className='responsive_video' src='https://player.vimeo.com/video/293595927?autopause=0&amp;loop=0'
        frameBorder='0' width='100%' height='567' allowFullScreen ></iframe>
                            comment end */}

            {/*<img src="/images/video.png" alt="" srcset="" />*/}
            {/*<video loop="" controls="" width="640" height="480">
                              <source type="video/mp4" src="http://player.vimeo.com/video/3873878"></source>
                            </video>*/}

            {/* sandeep comment
                            <div className="video-icon">
                              comment end */}

            {/*<img src="/images/video-icon.svg"/>*/}
            {/*}  <i class="far fa-play-circle" id='playPause'></i>*/}

            {/* sandeep comment
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        comment end */}
            {/* <section className=' bg-cover bg-position-right'>
                <div className="sec-3 membersBenifits"
                style={getBackgroundImage(
                  backendportal(
                    '/images/img-3.jpg'
                  )
                )}
                >
            <div className="myContainer">
                <div className="row">
                    <div className="col-md-6 member_left">
                        <div className="lf-list">
                            <h1 className="wow fadeInUp">Membership Benefits</h1>
                            <ul className="wow fadeInUp">
                                <li>Learn from the Source </li>
                                <li>Study with Himalayan Master, Anand Mehrotra </li>
                                <li>Integrative Yogic Teachings and Practices </li>
                                <li>Global Community </li>
                                <li>Master Teachers</li>
                                <li>Yogic Lifestyle </li>
                                <li>Yoga Where You Are </li>
                                <li>Yoga at Your Own Pace </li>
                                <li>Yoga to Suit Your Needs </li>
                                <li>Daily Live Classes</li>
                                <li>5-Day Enlivening the Spirit Retreat with Anand Mehrotra</li>
                                <li>The Alchemy of Life, a 6-Episode Wisdom Series with Anand Mehrotra</li>
                            </ul>
                            <Link href="/plans">
                            <button className="btn-list wow fadeInUp" >
                                <a className='puprleHover_Golden'>Start Your Free Trial</a>
                            </button></Link>
                            
                        </div>
                    </div>
                    <div className="col-md-6 member_right">
                        <div className="rt-list">
                            <h1 className="wow fadeInUp" >Online Course Benefits</h1>
                            <ul className="wow fadeInUp" >
                                <li>Advanced Yogic Studies </li>
                                <li>Refine and Expand Your Consciousness</li>
                                <li>Deepen Your Wisdom</li>
                                <li>Take Your Practice to the Next Level</li>
                                <li>Lifetime Access</li>
                                <li>Extra Credits with Yoga Alliance</li> 
                                <li>No Membership Needed</li>
                            </ul>
                            <Link href="/courses">
                            <button className="btn-list wow fadeInUp" >
                                <a className='puprleHover_Golden' >Own a Course</a>
                            </button>
                            </Link>
                            <div className="list-img">
                                <h2 className="wow fadeInUp" >Download Sattva Connect Mobile App</h2>
                                <p>
                         Previous comment       <a href='javascript:void(0)'> <img src="/images/appstore.png" className="wow fadeInUp" /></a>
                                <a href='https://play.google.com/store/apps/details?id=com.app.sattvaconnect'
                                target='_blank'> <img src="/images/playstore.png" className="wow fadeInUp" /></a>
                                </p>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>
            </div> 
          </section> */}
            {/* <section className=' bg-cover bg-position-right'>
            <div className="sec-3 membersBenifits"
              style={getBackgroundImage(
                backendportal(
                  '/images/img-3.jpg'
                )
              )}
            >
              <div className="myContainer text-center text-white">
              <h2>Membership Benefits</h2>
              <p>To be an integrated being you need an integrated practice. Sattva Connect gives you access to teachings and practices on all aspects of being; body, mind and spirit.</p>
              </div>
            </div> 
          </section> */}
            <section className="sec-2 inigraty_practice">
              <div className="myContainer text-center text-white pb-100">
                <h2 className="revamp-heading">Sattva Connect</h2>
                <p className="revamp-para w-90 mb-4">
                  The only online platform originating in Rishikesh, India, Yoga
                  Capital of the World. Learn directly from the source. Study
                  with Himalayan Master, Anand Mehrotra. Practice yoga as it was
                  intended!
                </p>
                <div className="video_img_area video-width">
                  <div className="video_imgArea" id="YourIFrame">
                    <iframe
                      id="YourIFrame"
                      className="responsive_video"
                      src="https://player.vimeo.com/video/293595927?autopause=0&amp;loop=0"
                      frameBorder="0"
                      width="100%"
                      height="567"
                      allowFullScreen
                    ></iframe>
                    <div className="video-icon"></div>
                  </div>
                </div>
              </div>
            </section>

            <section className=" sec-members text-center">
              <div className="quote-container">
                <div className="quote-box">
                  <div className="quote-text-box">
                    {/* <img src="/images/right-quote.svg" className="right-quote"/> */}
                    <p className="quote-text">
                      <img className="pr-10" src="/images/quote-left.svg" />
                      Your purpose here is to evolve, to transform,
                      <br /> to experience your radical aliveness, to awaken to
                      your true nature.
                      <br /> You are the path. The path is you. The time is now.
                      <img className="pl-10" src="/images/quote-right.svg" />
                    </p>
                    {/* <img src="/images/left-quote.svg" className="left-quote"/> */}
                  </div>
                  <div className="quote-writer">
                    <h5 className="quote-writer-text">-Anand Mehrotra</h5>
                  </div>
                </div>
              </div>

              {/* I M A G E     B A N N E R


            <div className="sec-4">
                <div className="testimoial-1 wow fadeInUp home_testimonial1 text-left" >
                    <img src="/images/quote-up.png" className="up"/>
                    <div className="container text-left ml-5">
                    <p>
                        When you infuse your life with kriya, the learning process<br/>
                        quickens and the lessons that may have taken many lifetimes<br/>
                        to learn, are learned quicker and quicker.
                    </p>
                    <img src="/images/quote-dw.png" className="down"/>
                    </div>
                    <h5>-Anand Mehrotra</h5>
                  
                </div>
            </div> */}
            </section>
            <section className="sec inigraty_practice benefit-footer">
              <div className="myContainer text-center text-purple pb-50">
                <h2 className="revamp-heading">Our Offerings</h2>
                <p className="revamp-para w-90">
                  Sign up to become a member or choose one of our many courses
                  to start your transformation today.{" "}
                </p>
                <div className="row">
                  <div className="col-xl-2"></div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 cardsHovering">
                    <div className="benefit-card">
                      {/* <div className="benefit-img">
             
                      <img src="/images/gold_yoga.png" alt="Teaching" />
                    </div> */}
                      <div className="benefit-info">
                        <h2 className="benefit-title ">Membership Benefits</h2>
                        <p className="revamp-para-small w-100 mb-3 ">
                          Unlimited access to 1000+ classes on all aspects of
                          Yoga - New classes uploaded weekly - Daily live
                          classes – 2 free courses – Global community
                        </p>
                        <button class="benefit-btn   OnlineCoursesBtn wow fadeInUp">
                          <a href="/plans" class="puprleHover_Golden">
                            Become a Member
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 cardsHovering">
                    <div className="benefit-card">
                      {/* <div className="benefit-img">
             
                      <img src="/images/gold_lotus.png" alt="Teaching" />
                    </div> */}
                      <div className="benefit-info">
                        <h2 className="benefit-title ">Course Benefits</h2>
                        <p className="revamp-para-small w-100 mb-3 ">
                          Advanced Yogic Studies –Take your practice to the next
                          level – Lifetime Access – Study at your own pace –
                          Extra credits with Yoga Alliance.
                        </p>
                        <button class="benefit-btn   OnlineCoursesBtn wow fadeInUp">
                          <a href="/courses" class="puprleHover_Golden">
                            Own a Course
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-2"></div>
                </div>
              </div>
            </section>
            <section className="email-sec">
              <div className="sec-10 h-auto bg-white">
                <div className="myContainer">
                  {ErrorMsg && (
                    <div className="col-5">
                      <div className="alert alert-danger" role="alert">
                        {subscribeMsg}
                      </div>
                    </div>
                  )}

                  <div className="mail">
                    <div>
                      <h3 className="wow fadeInUp flex-1 mb-1">
                        <span className="quote-writer-text black-text mr-2 tilt">
                          Download
                        </span>{" "}
                        our mobile app!
                      </h3>
                      <p className="revamp-para">
                        Experience the benefits of a virtual studio
                        <br /> at home and on-the-go with any device.
                      </p>
                    </div>

                    {/* onChange={(e)=>changeSubscribe(e)} */}
                    <div className="app-box">
                      {/* <div className="app-button w-ios">
                    <i class="fab fa-apple"></i>
                    <div className="app-text">
                      <span>Download on the</span>
                      <p>App Store</p>
                    </div>
                  </div> */}
                      <a
                        href="https://play.google.com/store/apps/details?id=com.app.sattvaconnect"
                        target="_blank"
                      >
                        <div className="app-button w-and">
                          <i class="fab fa-google-play"></i>
                          <div className="app-text">
                            <span>GET IT ON</span>
                            <p>Google Play</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className=" sec-members text-center">
              <div className="quote-container">
                <div className="quote-box">
                  <div className="quote-text-box">
                    {/* <img src="/images/right-quote.svg" className="right-quote"/> */}
                    <p className="quote-text">
                      <img className="pr-10" src="/images/quote-left.svg" />
                      Wake yourself up with a Power Vinyasa or an activating
                      Kriya Set,
                      <br /> reconnect with what is important with a lunchtime
                      Wisdom Talk,
                      <br /> clear your energy before bed with a relaxing
                      Restorative Flow.
                      <br /> Find practices that suit your every mood.
                      <img className="pl-10" src="/images/quote-right.svg" />
                    </p>
                    {/* <img src="/images/left-quote.svg" className="left-quote"/> */}
                  </div>
                  <div className="quote-writer">
                    <h5 className="quote-writer-text">-Anand Mehrotra</h5>
                  </div>
                </div>
              </div>

              {/* <div className="sec-4">
                <div className="testimoial-1 wow fadeInUp home_testimonial1 text-left" >
                    <img src="/images/quote-up.png" className="up"/>
                    <div className="container text-left ml-5">
                    <p>
                        When you infuse your life with kriya, the learning process<br/>
                        quickens and the lessons that may have taken many lifetimes<br/>
                        to learn, are learned quicker and quicker.
                    </p>
                    <img src="/images/quote-dw.png" className="down"/>
                    </div>
                    <h5>-Anand Mehrotra</h5>
                  
                </div>
            </div> */}
            </section>
            <section className="sec inigraty_practice sec-practice">
              <div className="myContainer text-center text-white pb-50">
                <h2 className="revamp-heading">Integrative Practice of Yoga</h2>
                <p className="revamp-para">
                  With an Integrative Practice of Yoga, you will experience a
                  deeper level of understanding and wholeness. Practice yoga as
                  it was intended!
                </p>
                <div className="row">
                  {/* <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 cardsHovering'>
                  <figure className='interactive_practce_Yoga'>
                    <div className='par_titles'>Sattva Kriya Kundalini</div>
                    <figcaption className='par_title_desc hath'>
                    <p>Learn to balance Shiva and Shakti, the Divine Masculine and Divine Feminine 
                    energies within your Being. Create energetic shifts in the physical, mental, emotional
                    and energetic bodies. Awaken your infinite potential!</p>
                    </figcaption>
                  </figure>
                </div> */}
                  {/* pankaj */}
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 cardsHovering">
                    <figure className="par_wrap interactive_practce_Yoga">
                      <div className="par_title">Sattva Kriya Kundalini</div>
                      <figcaption className="par_title_desc hath overflow-scroll">
                        <p className="revamp-para-small w-90 ">
                          Learn to balance Shiva and Shakti, the Divine
                          Masculine and Divine Feminine energies within your
                          Being. Create energetic shifts in the physical,
                          mental, emotional and energetic bodies. Awaken your
                          infinite potential!
                        </p>
                      </figcaption>
                    </figure>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 cardsHovering">
                    <figure className="par_wrap">
                      <div className="par_title">Sattva Meditation</div>
                      <figcaption className="par_title_desc hath overflow-scroll">
                        <p className="revamp-para-small w-90 ">
                          The greater access you have to silence, the greater
                          access you have to natural intelligence. Establish
                          your daily sadhana, take on a japa practice, or listen
                          to a guided meditation.
                        </p>
                      </figcaption>
                    </figure>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 cardsHovering">
                    <figure className="par_wrap">
                      <div className="par_title">Sattva Pranayama</div>
                      <figcaption className="par_title_desc hath overflow-scroll">
                        <p className="revamp-para-small w-90 ">
                          Work with the flow of energy (prana) in the body to
                          experience optimal energy levels. Calm, ground,
                          elevate and expand your energy through a wide variety
                          of techniques and classes. Master your energy, master
                          your life!
                        </p>
                      </figcaption>
                    </figure>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 cardsHovering">
                    <figure className="par_wrap">
                      <div className="par_title">Sattva Hatha/Vinyasa</div>
                      <figcaption className="par_title_desc hath overflow-scroll">
                        <p className="revamp-para-small w-90 ">
                          Learn static and dynamic poses (asanas) in our Asana
                          Lab and Hatha classes. Discover intelligent sequencing
                          of yogic postures for increased flexibility, strength,
                          alignment of the physical body and nervous system.
                          Distribute, ground and integrate the heightened levels
                          of energy built through pranayama and kriya practices.
                        </p>
                      </figcaption>
                    </figure>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 cardsHovering">
                    <figure className="par_wrap">
                      <div className="par_title">Sattva Supreme Wisdom</div>
                      <figcaption className="par_title_desc hath overflow-scroll">
                        <p className="revamp-para-small w-90 ">
                          Awaken your innate wisdom. Expand your consciousness
                          state. Sit in the presence of Truth, as you explore
                          the timeless teachings of yoga. Live a life of purpose
                          and meaning.
                        </p>
                      </figcaption>
                    </figure>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 cardsHovering">
                    <figure className="par_wrap">
                      <div className="par_title">Sattva Naad/Mantra</div>
                      <figcaption className="par_title_desc hath overflow-scroll">
                        <p className="revamp-para-small w-90 ">
                          Everything in nature responds to vibration and
                          frequency. Work with the power of sound to experience
                          the expansive energy of the electromagnetic field of
                          the heart.
                        </p>
                      </figcaption>
                    </figure>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 cardsHovering">
                    <figure className="par_wrap">
                      <div className="par_title">Sattva Yogic Lifestyle</div>
                      <figcaption className="par_title_desc hath overflow-scroll">
                        <p className="revamp-para-small w-90 ">
                          Yoga is a way of life. Live a whole life, a life of
                          living enlightenment. Sattva Connect is here to
                          support your expansion.{" "}
                        </p>
                      </figcaption>
                    </figure>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 cardsHovering">
                    <figure className="par_wrap">
                      <div className="par_title">Sattva Prenatal</div>
                      <figcaption className="par_title_desc hath overflow-scroll">
                        <p className="revamp-para-small w-90 ">
                          Sattva Prenatal is a journey into the sacred feminine,
                          into wisdom, into wholeness. Classes include
                          meditation, pranayama, hatha, kundalini/kriya
                          practices, partner work and freedom movement, linked
                          together through intelligent sequencing.
                        </p>
                      </figcaption>
                    </figure>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 cardsHovering">
                    <figure className="par_wrap">
                      <div className="par_title">Sattva Sacred Ritual</div>
                      <figcaption className="par_title_desc hath overflow-scroll">
                        <p className="revamp-para-small w-90 ">
                          A sacred ritual is a conscious action to invoke a
                          desired response from nature, refine your
                          consciousness state, and help you enter a state of
                          receptivity - connecting you to the vertical love, the
                          love that frees. Yoga is about you claiming the
                          rituals back.
                        </p>
                      </figcaption>
                    </figure>
                  </div>
                </div>
                {/* Removed class intigratyTbs from button */}
                <button class="btn-list wow fadeInUp">
                  <a href="/plans" class="puprleHover_Golden">
                    Start Your Free Trial
                  </a>
                </button>
              </div>
            </section>

            {/*<Intentions />*/}
            {/* <Testimonials /> */}
            <section>
              <div className="sec-6"></div>
            </section>
            <CoursesSlider coursesData={courses.courses} />

            <section className=" sec-members text-center">
              <div className="quote-container">
                <div className="quote-box">
                  <div className="quote-text-box">
                    {/* <img src="/images/right-quote.svg" className="right-quote"/> */}
                    <p className="quote-text">
                      <img className="pr-10" src="/images/quote-left.svg" />
                      To live our most authentic lives, we must move beyond the{" "}
                      <br />
                      fearful chattering of the mind and dive into <br /> the
                      awakened heart.
                      <img className="pl-10" src="/images/quote-right.svg" />
                    </p>
                    {/* <img src="/images/left-quote.svg" className="left-quote two"/> */}
                  </div>
                  <div className="quote-writer">
                    <h5 className="quote-writer-text">-Anand Mehrotra</h5>
                  </div>
                </div>
              </div>
            </section>
            {/* I M A G E  B A N N E R
        <section>
        <div className="sec-8">
       
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <div className="testimoial-1 wow fadeInUp home_testimonial2">
                        <img src="/images/quote-up.png" className="up"/>
                        <p>
                            To live our most authentic lives, we must move beyond the<br/>
                            fearful chattering of the mind and dive into<br/> the awakened heart.
                        </p>
                        <img src="/images/quote-dw.png" className="down"/>
                        <h5>-Anand Mehrotra</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>    */}
            <UpcomingStreamSlider streamData={upcomingStream} />

            {/* <section>
          <div className="sec-9">
              <h1 className="wow fadeInUp">Practice Live Together</h1>
                  <p className="wow fadeInUp">Meet us for live satsang, kirtan, guided meditations and other yogic practices. Master teachers broadcasting daily from all <br/>over the world. As we practice together, we elevate our energy and rise higher. Be inspired. Live inspired.</p>
              <div className="online-courses_sliders2 wow fadeInUp">
              <Slider {...settings}>
                  <div className="courses-slider">
                      <img src="/images/11.png"/>
                      <div className="courses-txt">
                      <h5>GENTLE VINYASA FLOW</h5>
                      <p>Monday 24 May at 11:00 IST</p>
                      </div>
                  </div>
                  <div className="courses-slider">
                      <img src="/images/12.png"/>
                      <div className="courses-txt">
                      <h5>HIMALAYAN KUNDALINI</h5>
                      <p>Monday 24 May at 11:00 IST</p>
                      </div>
                  </div>
                  <div className="courses-slider">
                      <img src="/images/13.png"/>
                      <div className="courses-txt">
                      <h5>HIMALAYAN KRIYA MEDITATION</h5>
                      <p>Monday 24 May at 11:00 IST</p>
                      </div>
                  </div>
                  <div className="courses-slider">
                      <img src="/images/11.png"/>
                      <div className="courses-txt">
                      <h5>GENTLE VINYASA FLOW</h5>
                      <p>Monday 24 May at 11:00 IST</p>
                      </div>
                  </div>
                  <div className="courses-slider">
                      <img src="/images/12.png"/>
                      <div className="courses-txt">
                      <h5>HIMALAYAN KUNDALINI</h5>
                      <p>Monday 24 May at 11:00 IST</p>
                      </div>
                  </div>
                  <div className="courses-slider">
                      <img src="/images/13.png"/>
                      <div className="courses-txt">
                      <h5>HIMALAYAN KRIYA MEDITATION</h5>
                      <p>Monday 24 May at 11:00 IST</p>
                      </div>
                  </div>
                  </Slider>
              </div>
              <Link href="/upcoming-stream">
              <button className="courses-btn live wow fadeInUp">
                  <a className='puprleHover_Golden'>View Live Stream Calendar </a>
              </button>
              </Link>
              <Link href="/upcoming-stream">
              <button className="courses-btn live wow fadeInUp">
                  <a className='puprleHover_Golden'>Join Live Stream</a>
              </button>
              </Link>
          </div>
        </section> */}
            <section className="email-sec">
              <div className="sec-10">
                <div className="myContainer">
                  {ErrorMsg && (
                    <div className="col-5">
                      <div className="alert alert-danger" role="alert">
                        {subscribeMsg}
                      </div>
                    </div>
                  )}

                  <form onSubmit={onSubscribe}>
                    <div className="mail">
                      <h3 className="wow fadeInUp">
                        <span className="quote-writer-text black-text mr-2 tilt">
                          Subscribe
                        </span>{" "}
                        to our Newsletter
                      </h3>
                      {/* onChange={(e)=>changeSubscribe(e)} */}
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="Email Address"
                      />
                      <button
                        className="submit wow fadeInUp"
                        id="mc-embedded-subscribe"
                      >
                        Subscribe
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
            <section>
              <div className="sec-11"></div>
            </section>
            <TestimonialSlider testData={intentions} />
            <section style={{ position: "relative" }}>
              <div className="sec-13 gradientsec">
                <div className="myContainer flex-column-center p-relative">
                  <div className="connect-txt">
                    <h1 className="wow fadeInUp revamp-heading text-center">
                      Sattva Connect is for you if
                    </h1>
                  </div>
                  <div className="connect-card-container my-5">
                    <div className="connect-card">
                      <div className="connect-pointer mb-4">
                        <div className="tick-point mr-4">
                          <img src="/images/check.svg" alt="" />
                        </div>
                        <div className="text-point ">
                          <p className="mb-0 revamp-para-small">
                            You are Interested in evolution.
                          </p>
                        </div>
                      </div>
                      <div className="connect-pointer mb-4">
                        <div className="tick-point mr-4">
                          <img src="/images/check.svg" alt="" />
                        </div>
                        <div className="text-point">
                          <p className="mb-0 revamp-para-small">
                            You want to go on a journey of self-realization.
                          </p>
                        </div>
                      </div>
                      <div className="connect-pointer mb-4">
                        <div className="tick-point mr-4">
                          <img src="/images/check.svg" alt="" />
                        </div>
                        <div className="text-point">
                          <p className="mb-0 revamp-para-small">
                            You want to experience deeper meaning and purpose.
                          </p>
                        </div>
                      </div>
                      <div className="connect-pointer">
                        <div className="tick-point mr-4">
                          <img src="/images/check.svg" alt="" />
                        </div>
                        <div className="text-point">
                          <p className="mb-0 revamp-para-small">
                            You want to thrive instead of just survive.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="connect-card">
                      <div className="connect-pointer mb-4">
                        <div className="tick-point mr-4">
                          <img src="/images/check.svg" alt="" />
                        </div>
                        <div className="text-point">
                          <p className="mb-0 revamp-para-small">
                            You want to radically shift your life.
                          </p>
                        </div>
                      </div>
                      <div className="connect-pointer mb-4">
                        <div className="tick-point mr-4">
                          <img src="/images/check.svg" alt="" />
                        </div>
                        <div className="text-point">
                          <p className="mb-0 revamp-para-small">
                            You want to discover joy, bliss, happiness.
                          </p>
                        </div>
                      </div>
                      <div className="connect-pointer mb-4">
                        <div className="tick-point mr-4">
                          <img src="/images/check.svg" alt="" />
                        </div>
                        <div className="text-point">
                          <p className="mb-0 revamp-para-small">
                            You want to radiate your light out into the world.
                          </p>
                        </div>
                      </div>
                      <div className="connect-pointer">
                        <div className="tick-point mr-4">
                          <img src="/images/check.svg" alt="" />
                        </div>
                        <div className="text-point">
                          <p className="mb-0 revamp-para-small">
                            You want to experience greater ease in your body and
                            mind.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <ul className="wow fadeInUp">
                          <li>You are interested in evolution</li> 
                          <li>You want to go on a journey of self-realization </li>
                          <li>You want to experience deeper meaning and purpose </li>
                          <li>You want to experience a deeper sense of connection and belonging </li>
                          <li>You want to thrive instead of just survive </li>
                          <li>You want to experience greater ease in your body and mind </li>
                          <li>You want to radically shift your life </li>
                          <li>You want to discover joy, bliss, happiness</li> 
                          <li>You want to radiate your light out into the world</li>
                      </ul> */}
                  <Link href="/plans">
                    <button className="btn-list wow fadeInUp">
                      <a class="puprleHover_Golden">Start Your Free Trial</a>
                    </button>
                  </Link>
                </div>
              </div>
            </section>
          </main>
        </Layout>
      </div>
    </Fragment>
  );
};

export const getServerSideProps = async ({ params }) => {
  let { index } = params;
  if (index == null) {
    index = 0;
    return {
      props: { index },
    };
  } else {
    return {
      props: { index },
    };
  }
};

export default Home;
