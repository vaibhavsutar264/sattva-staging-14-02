import Link from 'next/link';

function HomeBanner({ banner, getImage }) {
  const banners = [
    {
      image: 'slider1.c5dbe1df_1577254476.jpg',
      title: 'Yoga, Wisdom, Meditation',
      description:
        'Yogic Wisdom and Technologies to Elevate Your Consciousness and Transform Your Life. Sattva Connect – Your support to an Awakened Life!',
      link: 'plans',
    },
    {
      image: '1-kopiNew.jpg',
      title: 'Membership',
      description:
        'Unlimited Access to 1000+ Classes on all aspects of Yoga – Asana, Pranayama, Kriya, Mantra, Meditation and more. New classes uploaded weekly. Yoga where you are!',
        link: 'about-us',
    },
    {
      image: 'shutterstock_676632New.jpg',
      title: 'Online Courses',
      description:
        'Deepen your knowledge of Yoga through a variety of courses. Lifetime Access. Study at your own pace. Be inspired. Live inspired. Sattva Connect – because you are Interested in living an Inspired Life!',
      link: 'courses',
      // link: 'plans',
    },
    // {
    //   image: 'ban3.png',
    //   title: 'Learn from the source',
    //   description: 'Study with Himalayan Master, Anand Mehrotra.',
    //   link: 'about-anandji',
    // },
    {
      image: 'meetUsImg.jpg',
      title: 'Meet Us Live!',
      description:
        'Daily Live Sessions on Meditation, Kriya, Pranayama, Vinyasa Flow and more. Broadcast from all over the World. Let’s practice together and rise as one!',
      link: 'upcoming-stream',
      // link: 'plans',
    },
    // {
    //   image: 'slider5.913610b6_1576834506.jpg',
    //   title: 'Be Inspired & Live Inspired! ',
    //   description:
    //     'Connect with a global, vibrant and living community of inspired yogis.',
    //   link: 'about-sangha',
    // },
    {
      image: 'RishikeshNew.jpg',
      title: "Learn from the Source",
      title2:"",
      description: 'The only Yoga Platform originating from Rishikesh, India, Yoga Capital of the World. Practice Yoga as it was intended!',
      link: 'about-us',
      // link: 'plans',
    },
  ];
  return (
    <div className='view intro-2'>
      
        <div id='carousel-example-2' className='carousel slide carousel-fade homeCarousel' data-ride='carousel' data-interval="false" >
          <div className='carousel-inner yoga_slider' role='listbox'>
            {banners.map((item, index) => {
              var classes = '';
              var btnText = 'Learn More';
              if (index == 0) {
                classes += ' active';
                btnText = 'Start Your Free Trial Now';
              }
            
              if (index == 3) {
                classes += ' overlay';
              }
              if (index == 4) {
                classes += ' overlay';
              }
              let image = '/images/banner/' + item.image;
              return (
                <div
                  className={'carousel-item ' + classes}
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundRepeat: `no-repeat`,
                    backgroundPosition: `center`,
                  }}
                  key={index}
                >
                  <div className={`${index == 0 ? '' : 'gradient'}`}>
                  <div className='home_banner_caption'>
                    <div className="myContainer">
                      <div className="homeBanner_cations centre-banner">
                        {/* <div className='animated fadeInUp img_logo display-none'>
                          <img src={'/images/ban-logo.png'} className='img-fluid'/>
                        </div> */}
                        <div className="captoin_content text-align-center">
                          <h1 className='sp-title animated fadeInUp'>{item.title}</h1>
                          <h1 className='rishikesh sp-title animated fadeInUp'>{item.title2 && item.title2}</h1>

                          <p className='sp-posttitle animated-two fadeInUp'>{item.description}</p>
                        </div>
                        <div className='read-more-wrapper animated-four fadeInUp'>
                        <Link href='/about-us'><a className='btn waves-effect waves-light btn-lg more yoga_btn'>Learn More</a></Link>
                        <Link href="/plans"><a className='btn waves-effect waves-light btn-lg ml-3'>Start Your Free Trial</a></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
          <a
            className='carousel-control-prev'
            href='#carousel-example-2'
            role='button'
            data-slide='prev'
          >
            <span
              className='carousel-control-prev-icon'
              aria-hidden='true'
            ></span>
            <span className='sr-only'>Previous</span>
          </a>
          <a
            className='carousel-control-next'
            href='#carousel-example-2'
            role='button'
            data-slide='next'
          >
            <span
              className='carousel-control-next-icon'
              aria-hidden='true'
            ></span>
            <span className='sr-only'>Next</span>
          </a>
        </div>
      </div>
      

  );
}

export default HomeBanner;
