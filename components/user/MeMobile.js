import React from 'react';
import Link from 'next/link';
import VideoDetailsMobile from './VideoDetailsMobile';
import OwlCarousel from 'react-owl-carousel';

export default function MeMobile({ myClasses }) {
  return (
    <section className='sec sec-mobile pb-0'>
      <div className='class-block'>
        <div className='container class-block-header'>
          <h4>My Classes</h4>
          {myClasses.length > 1 ? (
            <Link href='/user/my-classes'>
              <a className='btn btn-sm'>View All</a>
            </Link>
          ) : null}
        </div>
        {myClasses.length == 0 ? (
          <div className='container'>
            <div className='card-panel valign-wrapper grey lighten-4'>
              <div className='row'>
                <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center'>
                  Tap the My Classes button and you’ll see your Classes videos
                  here.
                </div>
                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 text-center mt-3'>
                  <Link href='/user/search'>
                    <a className='btn btn-sm'>Discover Now</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <OwlCarousel
            className='owl-theme'
            margin={10}
            nav={false}
            items={2}
            stagePadding={15}
            dots={false}
          >
            {myClasses.map((item, index) => {
              return (
                <VideoDetailsMobile item={item.video} key={item.video.id} />
              );
            })}
          </OwlCarousel>
        )}
      </div>
    </section>
  );
}
