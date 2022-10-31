import Link from 'next/link';

function Banner(props) {
  var banner = {
    backgroundImage: `url(${props.banner.image})`,
  };
  return (
    <>
      <div className='view intro-2'>
        <section className='inner-banner courses_banner' style={banner}>
          <div className='myContainer text-center text-white banner-heading'>
          {/* <img src='https://wordpress.betadelivery.com/sattvaconnect/img/ban-logo.png' alt='' /> */}
          <h1 className='revamp-signature-heading mb-0'>Online Courses</h1>
          {props.banner.description ? (
              <p className='sp-posttitle animated-two fadeInUp sp-animation-2 revamp-banner-para w-60p'>
                {props.banner.description}
              </p>
            ) : (
              ''
            )}
            {/* {props.banner.title ? <h1>{props.banner.title}</h1> : ''} */}
            
            {props.banner.link ? (
              <div className='read-more-wrapper animated-four fadeInUp'>
                <Link href={props.banner.link}>
                  <a className='btn waves-effect waves-light btn-lg'>
                    Learn more
                  </a>
                </Link>
              </div>
            ) : (
              ''
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default Banner;
