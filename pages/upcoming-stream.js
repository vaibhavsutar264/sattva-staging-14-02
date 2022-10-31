import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { apiRoute } from '../utils/helpers';
import Layout from '../components/Layout';
import Moment from 'react-moment';
import moment from 'moment';
import { Calendar, momentLocalizer, Navigate } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useRouter } from 'next/router';

function UpcomingStream({ banner, allStream }) {
  console.log(allStream);
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const router = useRouter();
const upcomingEvents = [
  {  
    'title': `7:00 pm | ${allStream[0].event}`,
    'allDay': false,
    'start': new Date(2022, 2, 21, 10, 0), // 10.00 AM
    'end': new Date(2022, 2, 21, 14, 0), // 2.00 PM  
    'id' : 0
}, 
{
    'title': `8:00 pm | ${allStream[1].event}`,
    'allDay': false,
    'start': new Date(2022, 2, 16, 10, 0), // 10.00 AM
    'end': new Date(2022, 2, 16, 14, 0), // 2.00 PM
    'id' : 1
},
{
  'title': `4:00 am | ${allStream[2].event}`,
  'allDay': false,
  'start': new Date(2022, 2, 17, 10, 0), // 10.00 AM
  'end': new Date(2022, 2, 17, 14, 0), // 2.00 PM 
  'id' : 2
},
{
  'title': `8:00 pm| ${allStream[3].event}`,
  'allDay': false,
  'start': new Date(2022, 2, 17, 10, 0), // 10.00 AM
  'end': new Date(2022, 2, 17, 14, 0), // 2.00 PM
  'id' : 3
},  
{
  'title': `8:00 pm| ${allStream[3].event}`,
  'allDay': false,
  'start': new Date(2022, 2, 17, 10, 0), // 10.00 AM
  'end': new Date(2022, 2, 17, 14, 0), // 2.00 PM
  'id' : 3
},  
{
'title': `8:00 am | ${allStream[4].event}`,
'allDay': false,
'start': new Date(2022, 2, 19, 10, 0), // 10.00 AM
'end': new Date(2022, 2, 19, 14, 0), // 2.00 PM 
'id' : 4
},
{
  'title': `7:00 pm | ${allStream[4].event}`,
  'allDay': false,
  'start': new Date(2022, 2, 26, 10, 0), // 10.00 AM
  'end': new Date(2022, 2, 26, 14, 0), // 2.00 PM 
  'id' : 4
  },
  {
    'title': `8:00 pm | ${allStream[4].event}`,
    'allDay': false,
    'start': new Date(2022, 2, 20, 10, 0), // 10.00 AM
    'end': new Date(2022, 2, 20, 14, 0), // 2.00 PM 
    'id' : 4
    },
];
const [selected, setSelected] = useState('');
useEffect(() => {
  if(selected === ''){
    // router.push(`#${selected}`);
    return
  }else{
    router.push(`#${selected}`);
  }
}, [selected]);
const handleSelectSlot = (e) => {
  console.log(e.id);
  setSelected(e.id);
  // setTimeout(() =>{
  //   router.push(`#${selected}`);
  // },500)
  // router.push(`#${selected}`);
}

useEffect(() => {
  let tempEvents = [];
  allStream?.map((item, index) => {

    console.log(item);
     
  });

console.log();

}, [allStream])



  return (
    <Fragment>
      <Head>  
        <meta charSet='utf-8' />
        <title>
          Live Streaming Yoga Classes, Satsang with Anand Mehrotra | Sattva
          Connect Broadcast Channel
        </title>
        <meta
          name='description'
          content='Join us Live Streaming Yoga Classes, Satsang with Anand Mehrotra @ Sattva Connect Live Stream Channel. Register to join an ongoing live stream event.'
        />
        <meta
          name='keywords'
          content='Live Streaming Yoga, Live yoga classes online, Live Stream Yoga Classes, Live Satsang with Anand Mehrotra'
        />
      </Head>
      <Layout isHome={true}>
        {banner &&

<div className='view intro-2'>
          <section
            className='inner-banner'
            style={{
              backgroundImage: `url(/images/banner/meetUsImg.jpg)`,
            }}
          >
            <div className='container text-center text-white'>
              {banner.title ? <h1 className='revamp-signature-heading mb-0'>{banner.title}</h1> : ''}
              {banner.description ? (
                <h2 className='sp-posttitle animated-two fadeInUp sp-animation-2 revamp-banner-para'>
                  {banner.description}
                </h2>
              ) : (
                ''
              )}
              {banner.link ? (
                <div className='read-more-wrapper animated-four fadeInUp'>
                  <a
                    href={banner.link}
                    className='btn waves-effect waves-light btn-lg'
                  >
                    Learn more
                  </a>
                </div>
              ) : (
                ''
              )}
            </div>
          </section>
        </div>
        }
        
        <main>
        <section className='sec sec-inabout'>
        <div className='myContainer'>
              <div className='row mb-5'>  
                <div className='col-md-12'>
                  <p className='revamp-para text-center w-90 margin-auto' >
                  International master teachers share their love for the yogic teachings and practices with you through daily live classes. Broadcast from all over the world. Check out your local time and join us live! Let's liberate and celebrate!
                  </p>
                </div>
              </div>
              </div>
          </section>
          <section className='sec sec-inabout light-purplebg'>
              <div className="container">
                <div className="calendar--block mb-5">
                <Calendar
                  selected={selected}
                  popup
                  selectable
                  localizer={localizer}
                  views={['month']}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{height:'80vh', marginLeft: '15px', marginRight: '15px', backgroundColor: 'white' }}
                  className='training__calendar p-4'
                  onSelectEvent={handleSelectSlot}
                  // onNavigate={handleSelectSlot}
                />
                <p className='link-text p-4 text-right'>All times are listed in IST (Indian Standard Time). Check out your local time <a href="https://www.worldtimebuddy.com/">here</a> and join us live.</p>
                </div>
                
              </div>           
              <div className='container'>
              {allStream && allStream.map((item, index) => {
                return (
                  <div className='upcminglivestream up-anchor' id={index} key={index}>
                    <div className='card'>
                      <div className='row mb-5 mt-5'>
                        <div className='col-xl-4 clo-lg-4 col-md-4 col-sm-6'>
                          <div className='card-image'>
                            <img
                              src={item.image}
                              className='img-fluid'
                              alt=''
                            />
                          </div>
                        </div>
                        <div className='col-xl-8 clo-lg-8 col-md-8 col-sm-6 mt-sm-0 mt-3'>
                          <div className='stamTitle'>
                            <h4 className='h4-style revamp-blog-title'>{item.event}</h4>
                            <p className='streamTeacherName'>
                              with <span className='quote-writer-text black-text'>{item.name}</span>
                            </p>
                          </div>

                          <p
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          ></p>
                          <p className='underline'>
                            <span>
                              <strong>Schedule:</strong>
                            </span>{' '}
                          </p>

                          {item.schedule.length > 0 ? (
                            <div className='singleSchedule'>
                              <p><Moment format="DD MMM YYYY HH:mm">{item.schedule[0]}</Moment></p>
                            </div>
                          ) : (
                            ''
                          )}
                          {item.schedule.length > 1 ? (
                            <a className=' showMoreSchedule scheduleBtn'>
                              VIEW MORE
                              <i
                                class='fa fa-angle-down'
                                aria-hidden='true'
                              ></i>
                            </a>
                          ) : (
                            ''
                          )}
                          <div className='allSchedule'>
                            {item.schedule.map((items, index) => {
                              return index !== 0 ? <p><Moment format="DD MMM YYYY HH:mm">{items}</Moment></p> : '';
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          {/* <section className='sec upcoming-last-sec'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12 text-white text-center'>
                  <h2>
                    You have to be a member in order to join a Live Stream
                    event.
                  </h2>
                  <Link href='/plans'>
                    <a className='btn btn-lg mt-3'>Sign Up</a>
                  </Link>
                </div>
              </div>
            </div>
          </section> */}
        </main>
      </Layout>
    </Fragment>
  );
}

export async function getStaticProps() {
  const getBanner = await fetch(apiRoute('cms-page-banner/MTg='));
  const banner = await getBanner.json();

  const getStreams = await fetch(apiRoute('get-upcomming-streams'));
  const allStream = await getStreams.json();
  return {
    props: {
      banner,
      allStream,
    },
    revalidate: 1,
  };
}

export default UpcomingStream;
