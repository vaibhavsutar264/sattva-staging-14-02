import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import Head from 'next/head';
import TestimonialSlider from '../components/home/TestimonialSlider';
import { apiRoute, backendportal, getApiHeader } from '../utils/helpers';
import axios from 'axios';
import dynamic from 'next/dynamic';

const Intentions = dynamic(() => import('../components/home/Intentions'), {
  ssr: false,
});
function AboutUs() {
  const [intentions, setIntentions] = useState([]);


  useEffect(() => {
    const requestOptions = {
      headers: getApiHeader(),
    };
    axios.get(apiRoute('cms-all-testimonials'), requestOptions).then((res) => {
      setIntentions(res.data);
    });
  },[])

  return (
    <Fragment>
      <Head>
        <meta charSet='utf-8' />
        <title>
          Online Advanced Yoga & Meditation For Beginners | Sattva Connect{' '}
        </title>
        <meta
          name='description'
          content='Sattva Connect offer kundalini, kriya, prenatal, vinyasa yoga & & Meditation online For Beginners & advanced. Register to join Now! '/>
        <meta
          name='keywords'
          content='yoga for beginners, advanced yoga practices, yoga for beginners online, online yoga subscription, yoga exercises online, Online yoga and meditation, Online guided meditation, Transcendental meditation online, kundalini yoga, kriya yoga online, prenatal yoga online, vinyasa yoga online'
        />
        <link rel='canonical' href='https://www.sattvaconnect.com/about-us/' />
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
      <div className="indexLogo">
      <Layout isHome={true} isAbout={true}>
        <div className='view intro-2 about'>
          <section
            className='inner-banner about-banner finalBanner'
            style={{
              backgroundImage: `url(
            '/images/aboutNew.png'
          )`,
            }}
          >
            <div className='myContainer text-center text-white about_bannersNew'>
              {/* <img src='https://wordpress.betadelivery.com/sattvaconnect/img/ban-logo.png' alt='' /> */}
              {/* <h2 className='sp-posttitle animated-two fadeInUp sp-animation-2 revamp-signature-heading'>About Us</h2> */}
              <h2 className='revamp-signature-heading text-center'>About Us</h2>
              <p className='sp-posttitle animated-two fadeInUp sp-animation-2 revamp-banner-para w-60p'>
              <span className='display-b'>Sattva Connect - Your Support to an Awakened Life</span>
                </p>
            </div>

          </section>
          <main>

          <div class="about2 py-5">
        <div class="myContainer">
        {/*<img src='https://wordpress.betadelivery.com/sattvaconnect/img/ban-logo.png' alt='' />
            <p class="wow fadeInUp  about-txt">Your purpose here is to evolve, to transform, to 
            experience your radical aliveness, to <br/>
          awaken to your true nature. You are the path. The path is you. The time is now.</p>
            <h5 class="wow fadeInUp">Anand Mehrotra</h5>*/}
            <div class="content tl-c">
              {/* <h1 className='revamp-heading '>What is Sattva Connect</h1> */}
              <p class="wow fadeInUp revamp-para text-center w-90">Sattva Connect is an online yoga platform that inspires transformation, self-realization and healing. It is the only yoga platform that has its origin in Rishikesh, India, the Birthplace of Yoga. Founded by Himalayan Master, Anand Mehrotra, Sattva Connect is where you have the opportunity to Learn from the Source and Practice Yoga as it was intended!
                <br/><br/> Our teachings are authentic and integrative. We offer a 1000+ classes on Hatha, Vinyasa Flow, Pranayama, Kriya, Himalayan Kundalini, Mantra, Meditation and more. New classes are added weekly. We also offer a wide variety of courses and retreats, where you have the opportunity to deepen your knowledge and Bring Your Practice to the Next Level! <br/><br/>  With our Membership Plans, you also have an opportunity to meet our wonderful team of international master teachers for daily live classes. And be a part of a global, vibrant and living community. 
                </p>
            </div>
            {/*<div class="about-img">
              <img src={'/images/18.png'} alt='' />
        </div>*/}
        </div>
    </div>
    <section>
          <div className="sec-6 about-scrollover"></div>
          </section>
          <div class="about2-sec py-5">
        <div class="myContainer">
        {/*<img src='https://wordpress.betadelivery.com/sattvaconnect/img/ban-logo.png' alt='' />
            <p class="wow fadeInUp  about-txt">Your purpose here is to evolve, to transform, to 
            experience your radical aliveness, to <br/>
          awaken to your true nature. You are the path. The path is you. The time is now.</p>
            <h5 class="wow fadeInUp">Anand Mehrotra</h5>*/}
            <div class="content tl-c">
              {/* <h1 className='revamp-heading '>What We Offer</h1> */}
                <p class="wow fadeInUp revamp-para text-center w-90">Yoga is for All. The yogic science may have originated in Rishikesh, India, the Birthplace of Yoga, but it is the Spiritual Inheritance of the World. Whatever level you are at, whatever age, body type or background, the teachings and practices shared on Sattva Connect are relevant for you. They are for every being interested in living an inspired life, a life of expanded consciousness and living enlightenment. 
                <br/><br/>
                Sattva Connect is for You. We are where you are. You may practice at your own pace, in your own time, and in the comfort of your own home. Sattva Connect is Your Support to an Awakened Life.
                </p>
            </div>
            {/*<div class="about-img">
              <img src={'/images/18.png'} alt='' />
        </div>*/}
        </div>
    </div>
    <div class="sec sec-5 inigraty_practice sec-practice">
      <div class="myContainer text-center">
          <h2 class="wow fadeInUp revamp-heading">More About Us</h2>
          <p class="wow fadeInUp revamp-para">Learn more about who we are, our offerings and what we stand for in the different sections below.</p>
          <div className='row'>
          <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-5 cardsHovering'>
            <figure className='par_wrap '>
              <Link href="/about-anandji">
                <a>
              <div className='par_title'>Anand Mehrotra</div>
              </a>
              </Link>
            </figure>
          </div>
          <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-5 cardsHovering'>
            <figure className='par_wrap '>
            <Link href="/plans">
              <a>
              <div className='par_title'>Membership</div>
              </a>
              </Link>
            </figure>
          </div>
          <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-5 cardsHovering'>
            <figure className='par_wrap '>
            <Link href="/courses">
              <a>
              <div className='par_title'>Courses</div>
              </a>
              </Link>
            </figure>
          </div>
          <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-5 cardsHovering'>
            <figure className='par_wrap '>
            <Link href="/upcoming-stream">
              <a>
              <div className='par_title'>Live Classes</div>
              </a>
              </Link>
            </figure>
          </div>
          <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-5 cardsHovering'>
            <figure className='par_wrap '>
            <Link href="https://sattvayogaacademy.com/" >
              <a target="_blank">
              <div className='par_title'>Sattva Yoga Academy</div>
              </a>
              </Link>
            </figure>
          </div>
          <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-5 cardsHovering'>
          <figure className='par_wrap '>
            <Link href="/blog">
              <a>
              <div className='par_title'>Yogic Lifestyle Blog</div>
              </a>
              </Link>
            </figure>
          </div>
            </div>
        </div>
      </div>
     
        <section className="email-sec">
          <div className="sec-10 h-auto bg-white">
              <div className="myContainer">
                
                <div className="mail">
                  <div>
                  <h3 className="wow fadeInUp flex-1 mb-1"><span className='quote-writer-text black-text mr-2 tilt'>Download</span> our mobile app!</h3>
                    <p className='revamp-para'>Experience the benefits of a virtual studio<br /> at home and on-the-go with any device.</p>
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
                   <a href='https://play.google.com/store/apps/details?id=com.app.sattvaconnect'
                    target='_blank'>
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
      <section className=' sec-members text-center'>
          <div className="quote-container">
                <div className="quote-box">
                  <div className="quote-text-box">
                    {/* <img src="/images/right-quote.svg" className="right-quote"/> */}
                    <p className='quote-text'><img className='pr-10' src="/images/quote-left.svg" />Let your life be an expression of joy,<br /> not the pursuit of it.<img className='pl-10' src="/images/quote-right.svg" /></p>
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
      </div>
    </Fragment>
    
  );
}

export default AboutUs;
