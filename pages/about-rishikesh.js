import React, { Fragment } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/Layout';

export default function AboutRishikesh() {
  return (
    <Fragment>
      <Head>
        <meta charSet='utf-8' />
        <title>About Rishikesh.</title>
      </Head>
      <Layout>
        <div className='view intro-2'>
          <section className='inner-banner rishikeshBanner'>
            <div className='container text-center text-white'>
              <h1>Live from Rishikesh, the Yoga Capital of the World.</h1>
              <h5>
                Gain access to live satsangs, wisdom talks, guided meditations
                and other yogic practices through our live stream channel.
              </h5>
              <Link href='/upcoming-stream'>
                <a className='btn btn-lg'>Upcoming Live Streams</a>
              </Link>
            </div>
          </section>
        </div>
        <main>
          <section className='sec sec-inabout'>
            <div className='container'>
              <h4 className='h4-style'>ABOUT RISHIKESH</h4>
              <p>
                Profound teachings were born in the Himalayas. The yogic
                teachings all come from rishis, seers. The rishis went to the
                upper Himalayas and developed the great science of yoga. Then
                those rishis came down to the base of the Ganga and settled in
                the place now known as Rishikesh. The word “rishikesh” means the
                abode of the rishi, the one who sees, the seer.
              </p>
              <p>
                In a way, Rishikesh became the silicon valley of consciousness.
                Yogis came from all over the Indian subcontinent to exchange and
                share teachings and knowledge. Rishikesh became a powerful
                center for the development of the yogic tradition. In the 1960s
                and ‘70s, teachers from Rishikesh made a huge impact all over
                the world. The Beatles came to Maharishi Mahesh Yogi; people
                came to Sivananda Saraswati, to Swami Rama, and others. Over
                time, Rishikesh has become synonymous with yoga.
              </p>
              <p>
                Rishikesh and the surrounding Himalayan mountains are
                high-vibration places with strong vortexes of energy and deva
                consciousness. People from all walks of life and a variety of
                nationalities come to Rishikesh to study, practice, and learn.
                They come to experience a strong body with a clear mind and an
                elevated spirit.
              </p>
            </div>
          </section>
          <section className='sec rishikeshsec1 text-white'>
            <div className='container'>
              <div className='row'>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12'>
                  <h4>About Live Stream</h4>
                  <p>
                    The yogic tradition is fundamentally an oral tradition.
                    Anand delivers live streams on{' '}
                    <a
                      href='https://www.sattvaconnect.com/'
                      title='Sattva Connect'
                    >
                      Sattva Connect
                    </a>{' '}
                    that combine satsang, wisdom talks, and meditations You and
                    many others will be able to listen to Anand talk at the same
                    time, tapping into the same frequency to evolve together.
                    You will be able to ask questions, share thoughts, and be a
                    part of the vibrant sangha. Teachings and guided meditations
                    from
                    <a
                      href='https://www.sattvaconnect.com/about-anandji'
                      title='Anand'
                    >
                      Anand
                    </a>{' '}
                    help us all stay connected to our sangha, hearing wisdom
                    directly from an Indian Master Yogi. In addition,{' '}
                    <a
                      href='https://www.sattvaconnect.com/upcoming-stream'
                      title=''
                    >
                      live streams
                    </a>{' '}
                    will also be made during the annual Sattva Summit and be
                    given by dedicated Sattva teachers to offer a diverse range
                    of wisdom, guidance, and practices that support the
                    exclusive content available to you as a member.
                  </p>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12'></div>
              </div>
            </div>
          </section>
          <section className='sec rishikeshsec2'>
            <div className='container'>
              <div className='row'>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12'></div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 about-text'>
                  <h4>About Satsang and Wisdom Talks</h4>
                  <p>
                    On Sattva Connect, you will have the opportunity to join the
                    <a
                      href='https://www.sattvaconnect.com/about-sangha'
                      title='sangha'
                    >
                      sangha
                    </a>{' '}
                    (community) and have access to supreme knowledge through
                    satsangs and wisdom talks. One of the most important
                    teachings of the yogic science is Gyana Yoga, the yoga of
                    wisdom, supreme knowledge. The art of approaching satsang is
                    to drop any judgment and come from silence to hear truth and
                    experience wisdom. It is beyond information. It is about
                    transformation.
                  </p>
                  <p>
                    One of the reasons we experience conflict in life is due to
                    incorrect knowledge and incorrect application of that
                    knowledge. You will be able to correct your intellect,
                    refine and expand your consciousness, and gain access to
                    living knowledge, not just the static conceptual knowledge.
                    First, recognize the wisdom, then contemplate it deeply and
                    experiment with the truth of the wisdom. Experience the
                    great teachings of the sages and allow your view of the
                    world to alter and expand.
                  </p>
                  <p>
                    Awaken your own innate wisdom and gain access to supreme
                    knowledge that gives you clear understanding. You will find
                    wisdom to apply to all aspects of life. When we apply this
                    clear understanding, it sets us free from conditioning,
                    which is at the base of all suffering. We free ourselves
                    from limited thinking, limited perception, and
                    self-sabotaging patterns. When you have access to this
                    truth, you will forever be free.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section class='sec sec-join'>
            <div class='container'>
              <div class='row'>
                <div class='col-md-12 join-content text-white'>
                  <h2>Join Our Community</h2>
                  <Link href='/plans'>
                    <a class='btn btn-lg'>Start your free trial now</a>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </Fragment>
  );
}
