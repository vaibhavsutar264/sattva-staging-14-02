import React, { Fragment, useEffect, useState } from 'react';
import HomeBanner from '../components/home/HomeBanner';
import Layout from '../components/Layout';
import Head from 'next/head';
import Slider from "react-slick";
import dynamic from 'next/dynamic';
import { apiRoute, backendportal, getApiHeader } from '../utils/helpers';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import CoursesSlider from '../components/home/CoursesSlider';
import axios from 'axios';
import UpcomingStreamSlider from '../components/home/UpcomingStreamSlider';
const Testimonials = dynamic(() => import('../components/home/Testimonials'), {
  ssr: false,
});
const Intentions = dynamic(() => import('../components/home/Intentions'), {
  ssr: false,
});

var settings ={};
const Home = ({ index }) => {

  
  const [intentions, setIntentions] = useState([]);
  const [courses, setCourses] = useState({});
  const [upcomingStream, setUpcomingStream] = useState({});


  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });

  if(isDesktopOrLaptop){
    settings = {
     dots: false,
     infinite: true,
     speed: 500,
     slidesToShow: 3,
     slidesToScroll: 3
   }
 }else{
    settings = {
     dots: false,
     infinite: true,
     speed: 500,
     slidesToShow: 1,
     slidesToScroll: 1
   }
 
 }

 var settings2 = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}
  useEffect(() => {
   
    if (index) {
      localStorage.setItem('uniqueAffiliate_id', index);
    }

    const requestOptions = {
      headers: getApiHeader(),
    };
    axios.get(apiRoute('cms-all-testimonials'), requestOptions).then((res) => {
      setIntentions(res.data);
      console.log(res.data);
    });

    axios.get(apiRoute('get-courses-data/0'), requestOptions).then((res) => {
      setCourses(res.data);
      console.log(res.data);
    });  

    axios.get(apiRoute('get-upcomming-streams'), requestOptions).then((res) => {
      setUpcomingStream(res.data);
      console.log(res.data);
    });

  },[]);

  
  const getBackgroundImage = (image) => {
    var img = {
      backgroundImage: `url(${image})`,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: `center`,
    };
    return img;
  };

  
  return (
    <Fragment>
      <Head>
        <meta charSet='utf-8' />
        <title>
          Online Yoga Classes | Live Streaming Meditation & Satsang With Anand
          Mehrotra | Sattva Connect.
        </title>
        <meta
          name='description'
          content='Sattva Connect provide Online Yoga Classes & Live Streaming Meditation with Anand Mehrotra. Learn from Master Teachers, Register to join Now!'
        />
        <meta
          name='keywords'
          content='Online yoga classes, kundalini yoga online classes, online yoga classes for beginners, Hatha yoga online class, Prenatal yoga classes online, online meditation classes, Live Streaming Yoga, Live Stream Yoga Classes, Live Satsang with Anand Mehrotra, Live yoga classes online, Online yoga and meditation, yoga exercises online'
        />
        <link rel='canonical' href='https://www.sattvaconnect.com/' />
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
        <script type='application/ld+json'>
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
      <Layout isHome={true}>
        <HomeBanner />
        <main className='homePage'>
         {/* {isTabletOrMobile && <h1>Hello Mobile</h1>}
         {isDesktopOrLaptop&& <h1>Hello Lapop</h1>} */}

          <div className="sec-2">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <div className="video-content">
                            <h1 className="wow fadeInUp" >Sattva Connect</h1>
                            <p className="wow fadeInUp" >Practice yoga as it was intended. The only online yoga platform originating in Rishikesh, India - the Yoga Capital of the World. Learn directly from the source. Study with Himalayan Master, Anand Mehrotra.</p>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div className='container' id='YourIFrame'>
              <iframe
                id='YourIFrame'
                className='responsive-video'
                src='https://player.vimeo.com/video/293595927?title=0&amp;byline=0&amp;portrait=0&amp;sidedock=0'
                frameBorder='0'
                width='100%'
                height='480'
                allowFullScreen
              ></iframe>
            </div>                            <div class="video-icon">
                                <img src="/images/video-icon.svg"/>
                            </div>
                    </div>
                </div>
            </div>
        </div>
          <section className=' bg-cover bg-position-right'>
                <div className="sec-3 membersBenifits"
                style={getBackgroundImage(
                  backendportal(
                    '/images/img-3.jpg'
                  )
                )}
                >
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="lf-list">
                            <h1 className="wow fadeInUp">Membership Benefits</h1>
                            <ul className="wow fadeInUp">
                                <li>Learn from Source </li>
                                <li>Study with Himalayan Master, Anand Mehrotra </li>
                                <li>Integrative Practices </li>
                                <li>Global Community Master Teachers </li>
                                <li>Yogic Lifestyle </li>
                                <li>Yoga where you are </li>
                                <li>Yoga at your own pace </li>
                                <li>Yoga to suit your needs </li>
                                <li>Daily Live Classes</li>
                                <li>5 Day Enlivening the Spirit Retreat with Himalayan Master, Anand Ji</li>
                            </ul>
                            <Link href="/plans">
                            <button className="btn-list wow fadeInUp" >
                                <a >Start Your Free Trial</a>
                            </button></Link>
                            
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="rt-list">
                            <h1 className="wow fadeInUp" >Online Course Benefits</h1>
                            <ul className="wow fadeInUp" >
                                <li>Access greater wisdom </li>
                                <li> Deepen your practice, taking it to the next level </li>
                                <li> Lifetime Access </li>
                                <li>Extra Credits with Yoga Alliance</li> 
                                <li> No Membership Needed</li>
                            </ul>
                            <Link href="/courses">
                            <button className="btn-list wow fadeInUp" >
                                <a>Own a Course</a>
                            </button>
                            </Link>
                            <div className="list-img">
                                <h2 className="wow fadeInUp" >Download Sattva Connect Mobile App</h2>
                                <p>
                                <img src="/images/playstore.png" className="wow fadeInUp" />
                                <img src="/images/appstore.png" className="wow fadeInUp" />
                                </p>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>
            </div> 
          </section>
          <section className=' sec-members text-center'>
            <div className="sec-4">
              <div className="container">
                  <div className="row">
                      <div className="col-md-12">
                          <div className="testimoial-1 wow fadeInUp home_testimonial1" >
                              <img src="/images/quote-up.png" className="up"/>
                              <p>
                                  When you infuse your life with kriya, the learning process<br/>
                                  quickens and the lessons that may have taken many lifetimes<br/>
                                  to learn, are learned quicker and quicker.
                              </p>
                              <img src="/images/quote-dw.png" className="down"/>
                              <h5>-Anand Ji</h5>
                          </div>
                      </div>
                  </div>
                </div>
            </div>
          </section>
          <section className='sec sec-practice'>
            <div className='container text-center text-white'>
              <h2>Integrative Practice of Yoga</h2>
              <p>To be an integrated being you need an integrated practice. Sattva Connect gives you access to teachings and practices on all aspects of being, body, mind and spirit.</p>
              <div className='row'>
                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 cardsHovering'>
                  <figure className='par_wrap'>
                    <div className='par_title'>Sattva Kriya Kundalini</div>
                    <figcaption className='par_title_desc hath'>
                    Learn to balance Shiva and Shakti, the Divine Masculine and Divine Feminine 
                    energies within your Being. Create energetic shifts in the physical, mental, emotional
                    and energetic bodies. Awaken your infinite potential!
                    </figcaption>
                  </figure>
                </div>
                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 cardsHovering'>
                  <figure className='par_wrap'>
                    <div className='par_title'>Sattva Meditation</div>
                    <figcaption className='par_title_desc hath'>
                    The greater access you have to silence, the greater access you have to natural 
                    intelligence. Establish your daily sadhana, take on a japa practice, or listen to a 
                    guided meditation.
                    </figcaption>
                  </figure>
                </div>
                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 cardsHovering'>
                  <figure className='par_wrap'>
                    <div className='par_title'>Sattva Pranayama</div>
                    <figcaption className='par_title_desc hath'>
                    Work with the flow of energy (prana) in the body to experience optimal energy levels.
                    Calm, ground, elevate and expand your energy through a wide variety of techniques 
                    and classes. Master your energy, master your life!
                    </figcaption>
                  </figure>
                </div>
                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 cardsHovering'>
                  <figure className='par_wrap'>
                    <div className='par_title'>Sattva Hatha/Vinyasa</div>
                    <figcaption className='par_title_desc hath'>
                    Learn static and dynamic poses (asanas) in our Asana Lab and Hatha classes. 
                    Discover intelligent sequencing of yogic postures for increased flexibility, strength, 
                    alignment of the physical body and nervous system. Distribute, ground and integrate 
                    the heightened levels of energy built through pranayama and kriya practices. 
                    </figcaption>
                  </figure>
                </div>
                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 cardsHovering'>
                  <figure className='par_wrap'>
                    <div className='par_title'>Sattva Supreme Wisdom</div>
                    <figcaption className='par_title_desc hath'>
                    Awaken your innate wisdom. Expand your consciousness state. Sit in the presence 
                    of Truth, as you explore the timeless teachings of yoga. Live a life of purpose and 
                    meaning.
                    </figcaption>
                  </figure>
                </div>
                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 cardsHovering'>
                  <figure className='par_wrap'>
                    <div className='par_title'>Sattva Naad/Mantra</div>
                    <figcaption className='par_title_desc hath'>
                    Everything in nature responds to vibration and frequency. Work with the power of 
                    sound to experience the expansive energy of the electromagnetic field of the heart.
                    </figcaption>
                  </figure>
                </div>
                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 cardsHovering'>
                  <figure className='par_wrap'>
                    <div className='par_title'>Sattva Yogic Lifestyle</div>
                    <figcaption className='par_title_desc hath'>
                    Yoga is a way of life. Live a whole life, a life of living enlightenment. Sattva Connect 
                    is here to support your expansion. 
                    </figcaption>
                  </figure>
                </div>
                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 cardsHovering'>
                  <figure className='par_wrap'>
                    <div className='par_title'>Sattva Prenatal</div>
                    <figcaption className='par_title_desc hath'>
                    Sattva Prenatal is a journey into the sacred feminine, into wisdom, into wholeness. 
                    Classes include meditation, pranayama, hatha, kundalini/kriya practices, partner 
                    work and freedom movement, linked together through intelligent sequencing.
                    </figcaption>
                  </figure>
                </div>
                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 cardsHovering'>
                  <figure className='par_wrap'>
                    <div className='par_title'>Sattva Sacred Ritual</div>
                    <figcaption className='par_title_desc hath'>
                    A sacred ritual is a conscious action to invoke a desired response from nature, refine
                    your consciousness state, and help you enter a state of receptivity - connecting you 
                    to the vertical love, the love that frees. Yoga is about you claiming the rituals back.
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </section>
          {/*<Intentions />*/}
          {/* <Testimonials /> */}
          <section>
          <div class="sec-6"></div>
          </section>
         <CoursesSlider coursesData={courses.courses} />
        <section>
        <div class="sec-8">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                    <div className="testimoial-1 wow fadeInUp home_testimonial2">
                        <img src="/images/quote-up.png" className="up"/>
                        <p>
                            When you infuse your life with kriya, the learning process<br/>
                            quickens and the lessons that may have taken many lifetimes<br/>
                            to learn, are learned quicker and quicker.
                        </p>
                        <img src="/images/quote-dw.png" className="down"/>
                        <h5>-Anand Ji</h5>
                          </div>
                    </div>
                </div>
            </div>
        </div>
        </section>   
        <UpcomingStreamSlider streamData={upcomingStream}/>
        <section>
          <div class="sec-10">
              <div class="container">
              <form
                  action='https://sattvaconnect.us18.list-manage.com/subscribe/post?u=fdacecbe148d534ba550da181&amp;id=f39d089b44'
                  method='post'
                  id='mc-embedded-subscribe-form'
                  name='mc-embedded-subscribe-form'
                  className='validate'
                  target='_blank'
                  noValidate
                >
                <div class="mail">
                    <h3 class="wow fadeInUp">Subscribe to our Newsletter</h3>

                    <input type="email" id='mce-EMAIL' name="EMAIL" placeholder="Email Address"/>
                    <button class="submit wow fadeInUp" id='mc-embedded-subscribe'>
                    Subscribe
                    </button>
                </div>
                </form>
              </div>
          </div>
        </section>
        <section>
        <div class="sec-11"></div>
        </section>
      <section>
              <div class="sec-12">
                <div className="container mt-5 text-center">
              <h2 class="wow fadeInUp">What The Community Is Saying</h2>
              </div>
                <Slider {...settings2}
                  >
<div>
  <div class="container">
                      <div class="community">
                    <p class="wow fadeInUp"><i>Extremely profound and Sattvic expression of the Gita. Truly enjoyed <br/>listening and soaking in all the wisdom and grace of this teaching. <br/>Thank you Anandji and Sattva for delivering it so I may hear.</i></p>
                          <h5 class="wow fadeInUp">Shalini - <span>Canada</span></h5>
                      </div>
                      
                  </div>
                  </div>
                  <div>
                  <div class="container">
                      <div class="community">
                          <p class="wow fadeInUp"><i>Extremely profound and Sattvic expression of the Gita. Truly enjoyed <br/>listening and soaking in all the wisdom and grace of this teaching. <br/>Thank you Anandji and Sattva for delivering it so I may hear.</i></p>
                          <h5 class="wow fadeInUp">Shalini - <span>Canada</span></h5>
                      </div>
                     
                  </div>
                  </div>
                </Slider>
                <div class="join wow fadeInUp">
                    <h4>Join Us on:</h4>
                    <i class="fa fa-facebook"></i>
                    
                    <i class="fa fa-instagram"></i>
                </div>
              </div>
              </section>
<section>
        <div class="sec-13">
            <div class="container">
                <div class="connect-txt">
                    <h1 class="wow fadeInUp">Sattva Connect is for you if:</h1>
                    <ul class="wow fadeInUp">
                        <li>You are interested in evolution</li> 
                        <li>You want to go on a journey of self-realization </li>
                        <li>You want to experience deeper meaning and purpose </li>
                        <li>You want to experience a deeper sense of connection and belonging </li>
                        <li>You want to thrive instead of just survive </li>
                        <li>You want to experience greater ease in your body and mind </li>
                        <li>You want to radically shift your life </li>
                        <li>You want to discover joy, bliss, happiness</li> 
                        <li>You want to radiate your light out into the world</li>
                    </ul>
                    <Link href="/plans">
                    <button class="btn-list wow fadeInUp">
                        <a>Start Your Free Trial</a>
                    </button>
                    </Link>
                </div>
            </div>
        </div>
        </section>
        </main>
      </Layout>
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
