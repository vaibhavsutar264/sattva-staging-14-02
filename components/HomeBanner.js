import Link from 'next/link';

function HomeBanner({ banner, getImage }) {
  const banners = [
    {
      image: 'slider1.c5dbe1df_1577254476.jpg',
      title: 'Wisdom. Yoga. Meditation.',
      description:
        'Ancient Himalayan yogic teachings and practices to elevate your consciousness and transform your life.',
      link: 'plans',
    },
    ,
    {
      image: '1-kopi.jpeg',
      title: 'Authentic Teachings & Integrative Practices',
      description:
        'The only online yoga platform originating from Rishikesh, the Yoga Capital of the World. Yoga taught as it was intended!',
      link: 'about-us',
    },
    {
      image: 'slider2.223c64a7_1576833780.jpg',
      title: 'Learn from the source',
      description: 'Study with Himalayan Master, Anand Mehrotra.',
      link: 'about-anandji',
    },
    {
      image: 'module_1607409686.png',
      title: 'Meet Us Live!',
      description:
        ' Daily satsangs, kirtans, guided meditations and other yogic practices broadcasted from all over the world. Practice together and rise as one!',
      link: 'upcoming-stream',
    },
    {
      image: 'shutterstock_676632.jpg',
      title: 'Online Courses',
      description:
        'Refine and expand your consciousness. Deepen your understanding of the vast body of knowledge that is Yoga.',
      link: 'courses',
    },
    {
      image: 'slider5.913610b6_1576834506.jpg',
      title: 'Be Inspired & Live Inspired! ',
      description:
        'Connect with a global, vibrant and living community of inspired yogis.',
      link: 'about-sangha',
    },
    {
      image: 'Rishikesh.jpg',
      // title: 'Live from Rishikesh, the yoga capital of the world.',
      description: 'Your Support to an Awakened Life! ',
      link: 'about-uss',
    },
  ];
  return (
    <div className='view intro-2'>
      <div
        id='carousel-example-2'
        className='carousel slide carousel-fade homeCarousel'
        data-ride='carousel'
      >
        <div className='carousel-inner yoga_slider' role='listbox'>
          {banners.map((item, index) => {
            var classes = '';
            var btnText = 'Learn More';
            if (index == 0) {
              classes += ' active';
              btnText = 'Start Your Free Trial Now';
            }
            if (index == 4) {
              classes += ' overlay';
            }
            if (index == 7) {
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
                <div className='carousel-caption text-center'>
                  <div className='mx-auto animated fadeInUp'>
                    <img
                      src={'/images/ban-logo.png'}
                      className='img-fluid'
                    />
                  </div>
                  <a>
                    <h1 className='sp-title animated fadeInUp'>{item.title}</h1>
                  </a>
                  <h2 className='sp-posttitle animated-two fadeInUp lfts'>
                    {item.description}
                  </h2>
                  <div className='read-more-wrapper animated-four fadeInUp'>
                    <Link href={item.link}>
                      <a className='btn waves-effect waves-light btn-lg more yoga_btn'>
                        Learn More
                      </a>
                    </Link>
                    <Link href={item.link}>
                      <a className='btn waves-effect waves-light btn-lg ml-3'>
                        {' '}
                        Start Your Free Trail
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* <a
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
        </a> */}
        {/* <a
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
        </a> */}
      </div>
    </div>
  );
}

export default HomeBanner;
