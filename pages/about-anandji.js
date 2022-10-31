import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

const AboutAnandji = () => {
  return (
    <Fragment>
      <Head>
        <meta charSet='utf-8' />
        <title>
          Live Streaming Yoga Classes, Meditation & Satsang with Anand Mehrotra
          | Sattva Connect
        </title>
        <meta
          name='description'
          content="Learn & Study with Himalayan Master Anand Mehrotra's Live Streaming Yoga, Meditation Classes & Satsang. Register to join an ongoing live stream event."
        />
        <meta
          name='keywords'
          content='Live Satsang with Anand Mehrotra, Live yoga classes online, Online yoga and meditation'
        />
        <link rel='canonical' href='https://sattvaconnect.com/about-anandji' />
        <script type='application/ld+json'>
          {`
					{"@context": "https://schema.org/",
					"@type": "Person",
					"name": "Anand Mehrotra",
					"url": "https://www.sattvaconnect.com/about-anandji",
					"image": "https://www.internationalyogafestival.org/wp-content/uploads/2019/01/anand-mehrotra.jpg",
					"jobTitle": "Yog-Vedantic pioneer",
					"worksFor": {
						"@type": "Organization",
						"name": "Sattva Yoga"
					},
					"sameAs": [
						"https://www.instagram.com/theanandmehrotra/",
						"https://www.facebook.com/Anandteachings"
					]}
					`}
        </script>
      </Head>
      <Layout isHome={true}>
        <div className='view intro-2'>
          <section className='inner-banner about-anandji-bg'>
            <div className='container text-center text-white'>
              <h1 className='revamp-signature-heading mb-0'>Learn from the source</h1>
              <h5 className='revamp-banner-para mt-10px'>Study with Himalayan Master, Anand Mehrotra.</h5>
            </div>
          </section>
        </div>
        <main>
          <section className='sec sec-inabout py-5'>
            <div className='myContainer'>
              <div className="inabout-content margin-auto w-90">
              <p className='revamp-para text-center'>
                Anand Mehrotra is the youngest known spiritual Master in the
                world to develop and present the Himalayan yogic tradition in
                its pure and raw form. He has dedicated his entire life to
                bringing the original teachings of the Himalayan yogic tradition
                to the world and does so in a unique and powerful way. His{' '}
                <a href='https://www.sattvaconnect.com/' title='Sattva Yoga'>
                  Sattva Yoga
                </a>{' '}
                teachings come from the Vedic tradition and merge with the pure
                Tantric roots as taught by the ancient Masters in the far
                reaches of the Himalayas where he was born and raised.
              </p>
              <br />
              <p className='revamp-para text-center'>
                Anand is originally from{' '}
                <a
                  href='https://www.sattvaconnect.com/about-rishikesh'
                  title='Rishikesh'
                >
                  Rishikesh
                </a>
                , which is recognized as the yoga capital of the world.
                Rishikesh is one of the most sacred places in India. It calls
                thousands of pilgrims and spiritual seekers from around India
                and many countries of the world.
              </p>
              </div>
              
            </div>
          </section>
          <section>
          <div className="sec-6 inabout-scrollover"></div>
          </section>
          <section className='sec sec-inabout py-5'>
            <div className='myContainer'>
              <div className="inabout-content margin-auto w-90">
                <h3 className='revamp-heading text-center mb '>Anand’s Teachings</h3>
              <p className='revamp-para text-center'>
              Anand is a world citizen who is fluent in many languages.
                    For the last fifteen years, he has traveled the world,
                    teaching in the United States, Europe, Australia, New
                    Zealand, and South America. He has led hundreds of diverse
                    human beings – seekers, students, teachers, and artists – to
                    discover their deepest nature and to step into their freedom
                    and aliveness. His teachings are gradually being shared all
                    around the planet due to the extreme impact of the wisdom
                    that he communicates to students of various backgrounds.
                    Many travel to learn at the Sattva Retreat, where the Sattva
                    Yoga Academy is located.
              </p>
              <br />
              <p className='revamp-para text-center'>
              As intended by Anand, Yoga in its purest form is meant to
                    transform one’s life. There is no halfway point and no
                    return, only a one-way ticket to freedom and liberation. To
                    him, Yoga is not just a practice. It is a way of life, a
                    continuing experience of transformation where an individual
                    can step into his or her real nature and pure freedom.
                    Anand’s teachings are for those who are not afraid to find
                    the answers to challenging questions. “Who am I?” “What is
                    the meaning of this life?” “What is the nature of the
                    reality?” “Am I willing to live a free life?” and “What is
                    beyond the obvious?”
              </p>
              <br />
              <p className='revamp-para text-center'>
              Deep self-inquiry is required to approach the teachings of
                    Sattva Yoga with passion, joy, and a love for life in all
                    its forms. Anand’s teachings are not puritanical, but whole,
                    inclusive, and all-embracing. His teachings have been
                    developed fully for the age in which we live, so that we can
                    be connected with the grace of the heart, learn to master
                    the Self, and master the mystery of existence. Anand’s
                    teachings make you humble, make you understand that there is
                    so much more to learn and to explore. They bring you to
                    surrender that which no longer serves and eventually find
                    your true Self.
              </p>
              </div>
              
            </div>
          </section>
          {/* <section className='sec about-anandji-sec2 text-white'>
            <div className='container'>
              <div className='row'>
                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'></div>
                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                  <h4>Anand’s Teachings</h4>
                  <p className='revamp-para text-center'>
                    Anand is a world citizen who is fluent in many languages.
                    For the last fifteen years, he has traveled the world,
                    teaching in the United States, Europe, Australia, New
                    Zealand, and South America. He has led hundreds of diverse
                    human beings – seekers, students, teachers, and artists – to
                    discover their deepest nature and to step into their freedom
                    and aliveness. His teachings are gradually being shared all
                    around the planet due to the extreme impact of the wisdom
                    that he communicates to students of various backgrounds.
                    Many travel to learn at the Sattva Retreat, where the Sattva
                    Yoga Academy is located.
                  </p>
                  <br />
                  <p className='revamp-para text-center'>
                    As intended by Anand, Yoga in its purest form is meant to
                    transform one’s life. There is no halfway point and no
                    return, only a one-way ticket to freedom and liberation. To
                    him, Yoga is not just a practice. It is a way of life, a
                    continuing experience of transformation where an individual
                    can step into his or her real nature and pure freedom.
                    Anand’s teachings are for those who are not afraid to find
                    the answers to challenging questions. “Who am I?” “What is
                    the meaning of this life?” “What is the nature of the
                    reality?” “Am I willing to live a free life?” and “What is
                    beyond the obvious?”
                  </p>
                  <br />
                  <p className='revamp-para text-center'>
                    Deep self-inquiry is required to approach the teachings of
                    Sattva Yoga with passion, joy, and a love for life in all
                    its forms. Anand’s teachings are not puritanical, but whole,
                    inclusive, and all-embracing. His teachings have been
                    developed fully for the age in which we live, so that we can
                    be connected with the grace of the heart, learn to master
                    the Self, and master the mystery of existence. Anand’s
                    teachings make you humble, make you understand that there is
                    so much more to learn and to explore. They bring you to
                    surrender that which no longer serves and eventually find
                    your true Self.
                  </p>
                </div>
              </div>
            </div>
          </section> */}
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
             <section className='sec sec-inabout py-5'>
            <div className='myContainer'>
              <div className="inabout-content margin-auto w-90">
                <h3 className='revamp-heading text-center mb '>Anand’s Presence</h3>
              <p className='revamp-para text-center'>
              It is very limiting to attempt to explain Anand Mehrotra in
                    words. He is to be experienced. Being in his presence, one
                    can easily feel the field of the bliss in life and connect
                    with the pure field of potentiality that an individual can
                    experience beyond the limited mind. Meeting Anand Mehrotra
                    is meeting life with all that fully means to you. Meeting
                    him will change your life and bring you to be the most
                    authentic version of your true Self in its deepest meaning.
                    Are you ready to meet yourself where you are not, yet where
                    you have been eternally? There also is where you will meet
                    Anand and the practices of Sattva Yoga.
              </p>
              </div>
              
            </div>
          </section>
          {/* <section>
          <div className="sec-6 inabout-scrollover-2"></div>
          </section> */}
          <section>
          <div className="sec-6 inabout-scrollover-2"></div>
          </section>
          {/* <section className='sec text-white about-anandji-sec3'>
            <div className='container'>
              <div className='row'>
                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                  <h4>Anand’s Presence</h4>
                  <p className='revamp-para text-center'>
                    It is very limiting to attempt to explain Anand Mehrotra in
                    words. He is to be experienced. Being in his presence, one
                    can easily feel the field of the bliss in life and connect
                    with the pure field of potentiality that an individual can
                    experience beyond the limited mind. Meeting Anand Mehrotra
                    is meeting life with all that fully means to you. Meeting
                    him will change your life and bring you to be the most
                    authentic version of your true Self in its deepest meaning.
                    Are you ready to meet yourself where you are not, yet where
                    you have been eternally? There also is where you will meet
                    Anand and the practices of Sattva Yoga.
                  </p>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'></div>
              </div>
            </div>
          </section> */}
                       <section className='sec sec-inabout py-5'>
            <div className='myContainer'>
              <div className="inabout-content margin-auto w-90">
                <h3 className='revamp-heading text-center mb '>Anand’s Initiatives</h3>
              <p className='revamp-para text-center'>
              Anand is not only a sublime Master and teacher of Yoga. He is an
                artist and a creative volcano of ideas! He has an eclectic
                approach to existence and a deep desire to share and realize his
                vision in many different ways. His creativity and passion for
                bringing people together, creating opportunity for growth and
                evolution, has pushed him to birth other projects that engage
                the participation of both local people, charitable
                organizations, and worldwide businesses. He is the founder of
                the Sattva Organic Farm, Khushi Foundation, Sattva Foundation,
                the Sattva Collection, and Yogini Ayurveda. These are conscious
                companies that work with awareness in many different fields to
                inspire and touch many lives. They now include a line of
                conscious jewelry and personal care products from the ancient
                tradition of Ayurveda.
              </p>
              <br />
              <p className='revamp-para text-center'>
              Anand is also a visionary, a conscious entrepreneur, and the
                founder of Sattva Yoga, Sattva Yoga Academy, Sattva Retreat – a
                retreat paradise that is listed as one of the top ten in the
                world – and Sattva Connect, an online portal for giving the
                teachings of Yoga to the world. Another powerful peak experience
                that has come through his vision and brilliant intuition is the
                Sattva Summit, a unique conscious gathering. Every year for one
                week in November, he takes a large group of yogis through a
                transformative experience of practices. It is a life-changing
                time at the Sattva Retreat.
              </p>
              <br />
              <p className='revamp-para text-center'>
              In the Himalayas, Anand enjoys leading yogis on transformative
                journeys with great impact, riding motorcycles and testing the
                limits of the mind, pushing the participants to get in touch
                with their alive nature. One of his Himalayan motorcycle
                journeys is depicted in the documentary, “The Highest Pass.” It
                is another of the so-called peak experiences of Sattva. The
                journey is an invitation to absolutely break the patterns of
                limitation and access fully the limitless experience of life.
                These initiatives not only bring the teachings of Yoga as
                intended from its source, but are expressions of the full
                experience and lifestyle of Yoga.
              </p>
              </div>
              
            </div>
          </section>
          <section>
          <div className="sec-6 inabout-scrollover-3"></div>
          </section>
          {/* <section className='sec'>
            <div className='container'>
              <h4>Anand’s Initiatives</h4>
              <p className='revamp-para'>
                Anand is not only a sublime Master and teacher of Yoga. He is an
                artist and a creative volcano of ideas! He has an eclectic
                approach to existence and a deep desire to share and realize his
                vision in many different ways. His creativity and passion for
                bringing people together, creating opportunity for growth and
                evolution, has pushed him to birth other projects that engage
                the participation of both local people, charitable
                organizations, and worldwide businesses. He is the founder of
                the Sattva Organic Farm, Khushi Foundation, Sattva Foundation,
                the Sattva Collection, and Yogini Ayurveda. These are conscious
                companies that work with awareness in many different fields to
                inspire and touch many lives. They now include a line of
                conscious jewelry and personal care products from the ancient
                tradition of Ayurveda.
              </p>
              <p className='revamp-para'>
                Anand is also a visionary, a conscious entrepreneur, and the
                founder of Sattva Yoga, Sattva Yoga Academy, Sattva Retreat – a
                retreat paradise that is listed as one of the top ten in the
                world – and Sattva Connect, an online portal for giving the
                teachings of Yoga to the world. Another powerful peak experience
                that has come through his vision and brilliant intuition is the
                Sattva Summit, a unique conscious gathering. Every year for one
                week in November, he takes a large group of yogis through a
                transformative experience of practices. It is a life-changing
                time at the Sattva Retreat.
              </p>
              <p className='revamp-para'>
                In the Himalayas, Anand enjoys leading yogis on transformative
                journeys with great impact, riding motorcycles and testing the
                limits of the mind, pushing the participants to get in touch
                with their alive nature. One of his Himalayan motorcycle
                journeys is depicted in the documentary, “The Highest Pass.” It
                is another of the so-called peak experiences of Sattva. The
                journey is an invitation to absolutely break the patterns of
                limitation and access fully the limitless experience of life.
                These initiatives not only bring the teachings of Yoga as
                intended from its source, but are expressions of the full
                experience and lifestyle of Yoga.
              </p>
            </div>
          </section> */}
          <section className='sec sec-inabout py-5'>
            <div className='myContainer'>
              <div className="inabout-content margin-auto w-90">
                <h3 className='revamp-heading text-center mb '>Anand’s Students</h3>
              <p className='revamp-para text-center'>
              Anand Mehrotra guides his students with an immense passion
                    and fearlessness. He is recognized and loved for his ability
                    to speak truthfully. He guides students intimately into a
                    deep and transformative process of self-revelation and
                    growth. He breaks the wall of the mind with its limitations,
                    fears, and self-sabotaging conditioned patterns of each
                    individual.
              </p>
              <br />
              <p className='revamp-para text-center'>
              Anand is an explorer of all dimensions of life. There is no
                    one who is unaffected by his teachings. He is an author of
                    scripts and poetry. He expresses the teachings with a strong
                    sense of humor and deep passion for life, with dancing,
                    singing, and the music of the gong, hang drum, and the
                    Indian harmonium.
              </p>
              <br />
              <p className='revamp-para text-center'>
              Thanks to Anand’s personal experience of Self-realization,
                    the teachings are sacred and ancient, rooted in the original
                    Himalayan Yoga. Students with an honest and sincere interest
                    who decide to follow his guidance on the path of life are
                    carrying those authentic teachings forward. After
                    experiencing the powerful and unique practices that Anand
                    shares, many students are inspired to become teachers of
                    Sattva Yoga themselves. Teaching is simply a consequence of
                    experiencing the power of the practices of Sattva Yoga that
                    combine Sattva meditation, Tantric kriyas, Vinyasa flows to
                    channel the movement of energy, Kundalini practices,
                    pranayamas, chi and laya movements, mantra and partner work.
                    The practices gradually become life itself as the ultimate
                    and never-ending evolution of the Self.
              </p>
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
          {/* <section className='sec about-anandji-sec4 text-white'>
            <div className='container'>
              <div className='row'>
                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                  <h4>Anand’s Students</h4>
                  <p className='revamp-para'>
                    Anand Mehrotra guides his students with an immense passion
                    and fearlessness. He is recognized and loved for his ability
                    to speak truthfully. He guides students intimately into a
                    deep and transformative process of self-revelation and
                    growth. He breaks the wall of the mind with its limitations,
                    fears, and self-sabotaging conditioned patterns of each
                    individual.
                  </p>
                  <p className='revamp-para'>
                    Anand is an explorer of all dimensions of life. There is no
                    one who is unaffected by his teachings. He is an author of
                    scripts and poetry. He expresses the teachings with a strong
                    sense of humor and deep passion for life, with dancing,
                    singing, and the music of the gong, hang drum, and the
                    Indian harmonium.
                  </p>
                  <p className='revamp-para'>
                    Thanks to Anand’s personal experience of Self-realization,
                    the teachings are sacred and ancient, rooted in the original
                    Himalayan Yoga. Students with an honest and sincere interest
                    who decide to follow his guidance on the path of life are
                    carrying those authentic teachings forward. After
                    experiencing the powerful and unique practices that Anand
                    shares, many students are inspired to become teachers of
                    Sattva Yoga themselves. Teaching is simply a consequence of
                    experiencing the power of the practices of Sattva Yoga that
                    combine Sattva meditation, Tantric kriyas, Vinyasa flows to
                    channel the movement of energy, Kundalini practices,
                    pranayamas, chi and laya movements, mantra and partner work.
                    The practices gradually become life itself as the ultimate
                    and never-ending evolution of the Self.
                  </p>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'></div>
              </div>
            </div>
          </section> */}
        </main>
      </Layout>
    </Fragment>
  );
};

export default AboutAnandji;
