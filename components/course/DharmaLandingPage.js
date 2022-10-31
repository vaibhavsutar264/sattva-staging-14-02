import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { setLocalStorage, removeLocalStorage } from '../../utils/helpers';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';
import { Reveal } from 'react-reveal';

const DharmaLandingPage = ({ courseId, affiliateId }) => {
  const [pageId, setPageId] = useState('NDg=');
  return (
    <main className='roadDharmaPage'>
      <div className='secBanner'>
        <div className='container-fluid text-right mt-5'>
          <div className='row'>
            <div className='col-xl-6 col-lg-5 col-md-5 col-sm-6 col-8'>
              <div className='roadLogo'>
                <img
                  src={'/images/roadtodharma/logo.png'}
                  className='img-fluid'
                />
                 
              </div>
              
            </div>
            <div className='col-xl-6 col-lg-7 col-md-7 col-sm-6 col-12 text-left'>
              <Reveal effect='fadeInUp'>
                <div className='bannerDetails'>
                  <h4>"I've done many courses over the years, and this is </h4>
                  <h2>BY FAR THE MOST REMARKABLE."</h2>
                  <p>– Bonnie Evoy</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
      <div className='secForm'>
        <div className='container'>
          <div className='secFormBox'>
            <Reveal effect='fadeInUp'>
              <div className='formLeft'>
                {/* <iframe src="https://player.vimeo.com/video/199604630?title=0&amp;app_id=122963" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="" title="The Road To Dharma - Trailer" data-ready="true"></iframe> */}
                <iframe
                  src='https://player.vimeo.com/video/199604630?title=0&amp;app_id=122963'
                  width='426'
                  height='240'
                  frameborder='0'
                  allow='autoplay; fullscreen'
                  allowfullscreen=''
                  title='The Road To Dharma - Trailer'
                  data-ready='true'
                ></iframe>
              </div>
            </Reveal>
            <div className='formRight'>
              <h5>WATCH 3 EPISODES</h5>
              <h5>AND 3 LESSONS</h5>
              <h5>- FREE NOW! -</h5>
              <div className='container mt-5'>
                <Link href={'/buy-free-course/' + pageId + '/' + courseId}>
                  <button type='button' class='btn btnRegister'>
                    <a>Try For Free Now</a>
                  </button>
                </Link>
              </div>
              <div className='mt-3'>
                <Link href={'/buy-course/' + pageId + '/' + courseId}>
                  <button type='button' class='btn btnRegister '>
                    <a>Buy Complete Course Now</a>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='secInfo'>
        <div className='container'>
          <Reveal effect='fadeInUp'>
            <div className='infoTop'>
              <h2 className='text-center textTheme'>
                "INCREDIBLY CAPTIVATING.{' '}
              </h2>
              <h5 className='text-center textTheme'>
                Charting Paths Away from the Prisons in Their Minds"
              </h5>
              <h4 className='text-center textTheme'>- GOOP </h4>
            </div>
          </Reveal>
          <div className='divider'></div>
          <div className='introLogo'>
            <img src={'/images/roadtodharma/pinkLogo.png'} />
          </div>
          <Reveal effect='fadeInUp'>
            <h2 className='text-center'>
              ONLINE COURSE <br></br>FOR LIVING A LIFE OF FREEDOM
            </h2>
            <p className='mb-3'>
              Now, through the power of the entertaining and visually stunning
              Road To Dharma DocuSeries combined with the companion Online
              Course full of lessons, bonus videos, and audio meditations, we
              can fully engage in this quest of LIVING A LIFE OF FREEDOM. The
              ten-episode DocuSeries inspires us, like only a story can, with
              characters on an adventure to four sacred Himalayan sites that
              reveal secrets of freedom. Then the course goes deeper into the
              ten written wisdom chapters, the ten downloadable audio meditation
              practices, and ten deeply insightful full talks with Himalayan
              Master Anand Mehrotra... That's 10 half hour episodes, then 5 more
              Hours of Wisdom filmed during the journey but not shown in the
              series, Ten written chapters, and Ten 25-minute audio
              meditations...
            </p>
            <p className='text-center mb-0'>
              Read below to see what people are saying about this innovative
              course:
            </p>
            <p className='text-center mb-4'>
              "The Quest for Freedom is something all humanity shares!"{' '}
            </p>
            <div className='text-center'>
              <Link href={'/buy-free-course/' + pageId + '/' + courseId}>
                <button type='button' class='btn modal-trigger'>
                  <a> WATCH NOW - 3 FREE EPISODES & 3 FREE LESSONS</a>
                </button>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
      <div className='secIncluded'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-5 col-lg-6 col-md-8 col-sm-9 col-12'>
              <Reveal effect='fadeInUp'>
                <h3 className='secHeadings text-center'>WHAT'S INCLUDED</h3>
                <ul className='list-unstyled'>
                  <li>
                    <div>
                      <h6>
                        10 Deep Talks on Freedom -{' '}
                        <span>
                          filmed during the series (5 + Hours) by Anand Mehrotra
                        </span>
                      </h6>
                      <div className='includedIcons'>
                        <img src={'/images/roadtodharma/video.svg'} />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h6>
                        10 Chapters on Freedom -{' '}
                        <span>from creator Adam Schomer</span>
                      </h6>
                      <div className='includedIcons'>
                        <img src={'/images/roadtodharma/book.svg'} />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h6>
                        10 Audio Meditations for Freedom -{' '}
                        <span>from creator Adam Schomer</span>
                      </h6>
                      <div className='includedIcons'>
                        <img src={'/images/roadtodharma/speaker.svg'} />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h6>
                        THE COMPLETE SEASON ONE:{' '}
                        <span className='textBold'>
                          10 Stunning Episodes of The Road to Dharma!
                        </span>
                      </h6>
                      <div className='includedIcons'>
                        <img src={'/images/roadtodharma/video.svg'} />
                      </div>
                    </div>
                  </li>
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
      <div className='secLearned'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-xl-5 col-lg-6 col-md-7 col-sm-8 col-12'>
              <Reveal effect='fadeInUp'>
                <h3 className='secHeadings text-center'>
                  WHAT We <br></br> LEARN
                </h3>
                <ul className='list-unstyled'>
                  <li>
                    <div>
                      <h6>Find Freedom from the stories that hold us back. </h6>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h6>Find Courage to make leaps of Inspiration.</h6>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h6>
                        Learn to Overcome and use Challenges for Your Freedom.
                      </h6>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h6>
                        Reveal your Inner Power and your True Inner Freedom.
                      </h6>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h6>And Much Much more...</h6>
                    </div>
                  </li>
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
      <div className='secTry'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-5 col-lg-6 col-md-7 col-sm-8 col-12'>
              <Reveal effect='fadeInUp'>
                <h3 className='secHeadings'>Try For Free Now</h3>
                <p>
                  With Just an Email Registration you can enjoy the First Three
                  Lessons of Ten:
                </p>
                <ul className='list-unstyled'>
                  <li>Watch Episode 1, 2 & 3</li>
                  <li>Access Chapters 1, 2 & 3</li>
                  <li>Experience Meditations 1, 2, & 3</li>
                </ul>
              </Reveal>
            </div>
          </div>
          <div className='text-center mt-3'>
            <Link href={'/buy-free-course/' + pageId + '/' + courseId}>
              <button type='button' class='btn btnRegister'>
                <a>Try For Free Now</a>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className='secSlide secSlideBefore'>
        <div className='slide-container'>
          <Fade indicators={true} duration={4000}>
            <div className='each-fade'>
              <img src={'/images/roadtodharma/slide3.jpg'} />
              <div className='slideBox'>
                <div className='container pt-5'>
                  <div className='row row justify-content-center'>
                    <div className='col-xl-8 col-lg-9 col-md-9 col-sm-10 col-10'>
                      <div className='slideContent text-center'>
                        <h4>"A REVOLUTIONARY DOCUSERIES</h4>
                        <h4>& Online Course format that takes you on the</h4>
                        <h4>JOURNEY OF A LIFETIME!"</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='each-fade'>
              <img src={'/images/roadtodharma/slide6.jpg'} />
              <div className='slideBox'>
                <div className='container pt-5'>
                  <div className='row row justify-content-center'>
                    <div className='col-xl-9 col-lg-11 col-md-10 col-sm-10 col-10'>
                      <div className='slideContent text-center animated fadeInRight'>
                        <h4>
                          "I BINGE- WATCHED{' '}
                          <span className='textLight'>the episodes.</span>
                        </h4>
                        <h4>
                          <span className='textLight'>
                            The meditations by Adam are
                          </span>{' '}
                          BEAUTIFULLY GUIDED,{' '}
                        </h4>
                        <h4>
                          <span className='textLight'>he is a</span> NATURAL
                          TEACHER."{' '}
                        </h4>
                        <p className='mt-3'>– Brooke Martin</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='each-fade'>
              <img src={'/images/roadtodharma/slide4.jpg'} />
              <div className='slideBox'>
                <div className='container pt-5'>
                  <div className='row row justify-content-center'>
                    <div className='col-xl-7 col-lg-7 col-md-7 col-sm-8 col-10'>
                      <div className='slideContent text-center animated fadeInRight'>
                        <h4>
                          <span className='textLight'>
                            "I've done many courses over the years, and this is
                          </span>{' '}
                          BY FAR THE MOST REMARKABLE."
                        </h4>
                        <p className='mt-3'>– Bonnie Evoy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
      <div className='secFreedom'>
        <div className='container'>
          <h3 className='secHeadings textTheme'>YOUR JOURNEY TO FREEDOM</h3>
          <div className='secFormBox'>
            <div className='formLeft'>
              <iframe
                src='https://player.vimeo.com/video/442878374?title=0&amp;app_id=122963'
                width='426'
                height='240'
                frameborder='0'
                allow='autoplay; fullscreen'
                allowfullscreen=''
                title='Road to Dharma Online Course - Explained by Creator Adam Schomer'
                data-ready='true'
              ></iframe>
              <p>
                Creator and Director, Adam Schomer talks about empowering you
                through this innovative course and docuseries.
              </p>
            </div>
            <div className='formRight'>
              <h5>ENTER EMAIL AND</h5>
              <h5>START WATCHING</h5>
              <h5>EPISODES 1,2,3 TODAY! </h5>
              <div className='container mt-5'>
                <Link href={'/buy-free-course/' + pageId + '/' + courseId}>
                  <button type='button' class='btn btnRegister ml-4'>
                    <a>Try For Free Now</a>
                  </button>
                </Link>
              </div>
              <div className='mt-3'>
                <Link href={'/buy-course/' + pageId + '/' + courseId}>
                  <button type='button' class='btn btnRegister'>
                    <a>Buy Complete Course Now</a>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <Accordion allowZeroExpanded={true}>
            <div className='row'>
              <div className='col-md-6'>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span>Lesson 1: Freedom Takes Quantum leaps</span>{' '}
                      <img src={'/images/roadtodharma/next2.svg'} />
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      We must be willing to burst out of the proverbial bubble
                      we continually inhabit. We can’t wait to be “ready”, and
                      much like nature, we must make big jumps in our evolution.
                      For some, just riding a motorcycle or being in India will
                      force this huge leap!{' '}
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span>Lesson 2: Freedom From our Stories</span>{' '}
                      <img src={'/images/roadtodharma/next2.svg'} />
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      We often have the Leap or the “Aha” moment… but then our
                      stories come in and try to pull us back. The stories will
                      try to justify a trigger or fear rather than liberate us
                      from that. We must watch out for these as we leave
                      Rishikesh into torrential rains…
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span>Lesson 3: Freedom From Ego</span>{' '}
                      <img src={'/images/roadtodharma/next2.svg'} />
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      The Ego is often misunderstood as identity. But while at
                      Kedarnath Peak we find a deeper understanding of the Ego
                      that reveals we do not need to negate the individual, but
                      rather find a deeper awareness of the Ego patterns and
                      rise above them to freedom.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span>Lesson 4: Freedom From Inner Violence</span>{' '}
                      <img src={'/images/roadtodharma/next2.svg'} />
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      We must be aware that it lurks inside, this violence,
                      ready to take arms and lash out when threatened. Do not be
                      so ignorant to think we don’t have it. We must become
                      aware of it and friends with it to liberate it.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span>Lesson 5: FREEDOM IN THE GAPS, THE SPACE</span>{' '}
                      <img src={'/images/roadtodharma/next2.svg'} />
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      “Pay attention not to my words but the space between
                      them.” We experience this Freedom in the space and gap at
                      the magical peak of Tungnath, high in the Himalayas where
                      we learn the power in the gap and how to not get pulled
                      into the sting of the scorpion.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
              </div>
              <div className='col-md-6'>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span>Lesson 6: FREEDOM IN RELATIONSHIPS</span>{' '}
                      <img src={'/images/roadtodharma/next2.svg'} />
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      The true masters know that we must sustain our practice or
                      fall prey to arrogance. Relationship is a perfect place to
                      constantly grow, in fact the focus should be on evolution,
                      not what one can give. We explore this at Badrinath Temple
                      with Jeff and Jen on the verge of a break through.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span>Lesson 7: FREEDOM WITH PERSONAL POWER</span>{' '}
                      <img src={'/images/roadtodharma/next2.svg'} />
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      We often misunderstand true power as power over something
                      or someone. Anand explains to Ryan that we often can fear
                      stepping into our true power, afraid of the responsibility
                      it will bring… but we must step into our power, the power
                      we have to control our freedom is a birth right we can’t
                      shy away from, especially here in the Hidden Valley of the
                      Flowers.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span>Lesson 8: FREEDOM IN PURPOSE & SERVICE</span>{' '}
                      <img src={'/images/roadtodharma/next2.svg'} />
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      Up to the peak of Hemkund Sahib, known for as a place to
                      honor service. It is through giving that we start to send
                      the message we are bigger than ourselves. And also as we
                      become freer, we are more available to be truly of help.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span>Lesson 9: FREEDOM IN PRINCIPLES</span>{' '}
                      <img src={'/images/roadtodharma/next2.svg'} />
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      As Anand says, “Forgive yourself 10 times a day, but hold
                      yourself to high principles.” Principles will not only set
                      you free, but will set those around you free. As we are
                      returning from the peaks, we must keep growing and
                      practicing and integrating.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span>
                        Lesson 10: Freedom IS EXPANSIVE. WE ARE GREATER THAN WE
                        KNOW
                      </span>{' '}
                      <img src={'/images/roadtodharma/next2.svg'} />
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      Yes, we are greater than we can even imagine. And true
                      freedom includes space for this mystery and unraveling of
                      a you that’s beyond your wildest dream or understanding.
                      Just having space for this mystery is a key to freedom.{' '}
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
              </div>
            </div>
          </Accordion>
        </div>
      </div>
      <div className='secSlide secSlideAfter'>
        <div className='slide-container'>
          <Fade indicators={true} duration={4000}>
            <div className='each-fade'>
              <img src={'/images/roadtodharma/slide1.jpg'} />
              <div className='slideBox forthSlide'>
                <div className='container pt-5'>
                  <div className='row row justify-content-center mb-5'>
                    <div className='col-xl-6 col-lg-7 col-md-8 col-sm-10 col-10'>
                      <div className='slideContent text-center'>
                        <h4 className='px-4'>
                          <span className='textLight'>"This series will</span>{' '}
                          MAKE YOU BELIEVE IN THE POWER OF THE HUMAN SPIRIT.{' '}
                          <span className='textLight'>
                            What else can you ask for in a TV Show."
                          </span>
                        </h4>
                        <p className='mt-2'>– San Francisco Yoga Magazine</p>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-6'>
                      <div className='slideContent slideContentSmall noLeftBorder text-center'>
                        <h4>"INCREDIBLY CAPTIVATING... </h4>
                        <p className='textBold textNormal'>
                          TOP 6 GRIPPING DOCS TO WATCH NOW
                        </p>
                        <p className='textLight textNormal'>
                          For Cultural Change."
                        </p>
                        <h3>- GOOP </h3>
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className='slideContent slideContentSmall sliderContentRight text-center'>
                        <h4>
                          "POWERFUL, ENLIGHTENING{' '}
                          <span className='textLight'>and </span>
                          ENTERTAINING{' '}
                          <span className='textLight'>
                            series with spiritual themes and
                          </span>{' '}
                          MESMERIZING{' '}
                          <span className='textLight'>
                            talent and storytelling!"
                          </span>
                        </h4>
                        <p>– Esalen Film Fest Director, Corinne Bourdeaux</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='each-fade'>
              <img src={'/images/roadtodharma/slide2.jpg'} />
              <div className='slideBox'>
                <div className='container pt-5'>
                  <div className='row justify-content-center'>
                    <div className='col-xl-6 col-lg-7 col-md-7 col-sm-8 col-10'>
                      <div className='slideContent text-center'>
                        <h4>
                          "A THRILLING SERIES{' '}
                          <span className='textLight'>coupled with the</span>{' '}
                          WISDOM & LESSONS TO ATTAIN FREEDOM."{' '}
                        </h4>
                        <p className='mt-2'>– Open Mind Body Soul</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='each-fade'>
              <img src={'/images/roadtodharma/slide5.jpg'} />
              <div className='slideBox'>
                <div className='container pt-5'>
                  <div className='row justify-content-center'>
                    <div className='col-xl-6 col-lg-7 col-md-7 col-sm-8 col-10'>
                      <div className='slideContent text-center'>
                        <h4>
                          "CHARTING PATHWAYS FROM THE PRISONS OF THEIR MINDS."{' '}
                        </h4>
                        <p className='mt-2'>– GOOP</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
      <div className='secGuide'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-xl-5 col-lg-6 col-md-6 col-12 guideLeft aboutPerson'>
              <Reveal effect='fadeInUp'>
                <div>
                  <h4>~Our Guide~</h4>
                  <h6>Himalayan Master</h6>
                  <h5>Anand Mehrotra</h5>
                  <p>
                    Born in the birthplace of yoga, Rishikesh, Anand has
                    unprecedented access to sacred historical and spiritual
                    destinations. Not your typical Indian yogi, he is young,
                    fearless and provokes us to push our boundaries, both
                    physical and mental. Despite a vedic prophecy that he would
                    die in an accident in his late twenties, he took a journey
                    on motorcycles over the highest road in the world (18,00ft.)
                    Having faced his own death head on, Anand now invites a
                    diverse group of adventurers to join him on a harrowing
                    journey of motorcycling sheer cliff roads and hiking trails
                    deep into the Himalayas to experience a powerful and unique
                    pilgrimage.
                  </p>
                  <p>
                    Anand is a Himalayan Master Teacher, having founded the
                    Sattva Yoga Academy, The Sattva Centre in Rishikesh,
                    Sattva’s Kushi Foundation for children, and the Sattva
                    Women’s Foundation. He has appeared in the acclaimed
                    documentaries{' '}
                    <span className='textBold'>
                      AWAKE: THE STORY OF YOGANANDA, THE HIGHEST PASS,
                    </span>{' '}
                    and the TV-Series{' '}
                    <span className='textBold'>YOGIC PATHS</span> and{' '}
                    <span className='textBold'>THE ROAD TO DHARMA.</span>
                  </p>
                </div>
              </Reveal>
            </div>
            <div className='col-xl-7 col-lg-6 col-md-6 col-12 guideRight'></div>
          </div>
        </div>
      </div>
      <div className='secCreater'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-xl-7 col-lg-6 col-md-6 col-12 createrLeft'></div>
            <div className='col-xl-5 col-lg-6 col-md-6 col-12 createrRight aboutPerson'>
              <Reveal effect='fadeInUp'>
                <div>
                  <h4>~ SerieS Creator~</h4>
                  <h6>Director, Writer</h6>
                  <h5>Adam Schomer</h5>
                  <p>
                    Adam and i2i Productions are known for going to extreme
                    places and lengths to follow heroic stories that empower us.
                    Adam is known for his feature documentaries THE{' '}
                    <span className='textBold'>
                      HIGHEST PASS (2012), THE POLYGON (2014), ONE LITTLE PILL
                      (2015). WOMEN OF THE WHITE BUFFALO (2020)
                    </span>{' '}
                    dives into dives into the missing and murdered indigenous
                    women of the Lakota Tribe. The recently released feature
                    documentary <span className='textBold'>HEAL (2017)</span> is
                    a #1 Best-Selling Documentary on iTunes and empowers us to
                    change one’s beliefs, thoughts, emotions and perceptions in
                    order to help the body heal (NETFLIX 2019.)
                  </p>
                  <p>
                    Adam is the creator and director of{' '}
                    <span className='textBold'>THE ROAD TO DHARMA (2020)</span>{' '}
                    series. He is the writer and the author of the course
                    chapters and audio meditations. He is a certified Master
                    Sattva Yoga Teacher, was a founder of SattvaYoga LA and has
                    been teaching yoga and meditation in Los Angeles for over 10
                    years.{' '}
                  </p>
                  <p className='text-center mb-0'>
                    i2i Production’s mission is to:
                  </p>
                  <p className='text-center mb-0'>
                    <span className='textBold'>
                      Unite Through Wisdom and Entertainment
                    </span>
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
      <div className='secRegister'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-xl-7 col-lg-7 col-md-8 col-sm-10 col-12 text-center'>
              <Reveal effect='fadeInUp'>
                <h4 className='mb-0'>
                  "YOU DO NOT COME ON THIS JOURNEY TO FEEL BETTER. YOU COME TO
                  TRANSCEND."
                </h4>
                <p>– Anandji</p>
              </Reveal>
              <Link href={'/buy-free-course/' + pageId + '/' + courseId}>
                <button type='button' class='btn btnRegister'>
                  <a>Try For Free Now</a>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className='container'>
          <div className='footerLogo'>
            <img src={'/images/roadtodharma/sattvaLogo.png'} />
          </div>
          <ul class='list-unstyled'>
            <li>
              <Link href={'/buy-course/' + pageId + '/' + courseId}>
                <a>Buy Complete Course Now</a>
              </Link>
            </li>
          </ul>
          <p>
            Your purpose here is to evolve, to transform, to experience your
            radical aliveness, to awaken to your true nature. You are the path.
            The path is you. The time is now Questions? Reach out:{' '}
            <a href='mailto:info@sattvaconnect.com' className='textTheme'>
              info@sattvaconnect.com
            </a>
          </p>
        </div>
      </footer>
      <div
        className='modal fade formModal'
        id='formModal'
        tabindex='-1'
        role='dialog'
        aria-labelledby='formModalTitle'
        aria-hidden='true'
      >
        <div
          className='modal-dialog modal-lg modal-dialog-centered'
          role='document'
        >
          <div className='modal-content'>
            <button
              type='button'
              className='close closeModal'
              data-dismiss='modal'
            >
              <img src={'/images/roadtodharma/close.svg'} />
            </button>
            <div className='modal-body'>
              <div className='modalLogo'>
                <img src={'/images/roadtodharma/pinkLogo.png'} />
              </div>
              <h3>LIVING</h3>
              <h3>A LIFE OF FREEDOM</h3>
              <h6>Get 3 episodes &</h6>
              <h6>3 Lessons Free - NOW</h6>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DharmaLandingPage;
