import React, { Component } from 'react';
import Link from 'next/link';
import ReactTooltip from 'react-tooltip';

function CourseListDetailsLanguage({ course, isPurchased }) {
  var avgStars = '';
  for (var i = 0; i < course.rating; i++) {
    avgStars += '<i class="fa fa-star" aria-hidden="true"></i>';
  }
  return (
    <div className='col-lg-12 col-md-12 col-sm-12'>
      <div className='card card-course'>
        <div className='card-course-img'>
          <img src={course.overview_image} className='img-fluid' />
          <img src={course.overview_image} className='img-fluid backImg' />
        </div>
        <div className='card-course-content ml-30'>
          <div className='course-heading'>
            <div className='ratingHeading'>
              <h6 className='revamp-blog-title'>{course.title}</h6>
              {isPurchased == '1' ? (
                <>
                  <div
                    className='courseRating'
                    data-html={true}
                    data-for='custom-color-no-arrow'
                    data-tip='Atsiliepimai'
                  >
                    <Link
                      href={{
                        pathname:
                          '/user/course-details/' +
                          btoa(course.page_id) +
                          '/' +
                          btoa(course.id),
                        query: { scroll: 'true' },
                      }}
                    >
                      <a dangerouslySetInnerHTML={{ __html: avgStars }}></a>
                    </Link>
                  </div>
                  <ReactTooltip
                    id='custom-color-no-arrow'
                    className='react-tooltip card-title-tooltip'
                    delayHide={1000}
                    textColor='#FFF'
                    backgroundColor='#5c1b72'
                    effect='solid'
                  />
                </>
              ) : (
                <>
                  <div
                    className='courseRating'
                    data-html={true}
                    data-for='custom-color-no-arrow'
                    data-tip='Atsiliepimai'
                  >
                    <Link
                      href={{
                        pathname:
                          '/user/course-landing/' +
                          btoa(course.page_id) +
                          '/' +
                          btoa(course.id),
                        query: { scroll: 'true' },
                      }}
                    >
                      <a dangerouslySetInnerHTML={{ __html: avgStars }}></a>
                    </Link>
                  </div>
                  <ReactTooltip
                    id='custom-color-no-arrow'
                    className='react-tooltip card-title-tooltip'
                    delayHide={1000}
                    textColor='#FFF'
                    backgroundColor='#5c1b72'
                    effect='solid'
                  />
                </>
              )}
            </div>

            {isPurchased !== '1' ? (
              <div className='course-rating'>
                <div className='price-tag'>
                  {course.course_type == '2' ? (
                    <span className='course-price'>
                      <h6>Aukojimas</h6> <small>Min. $10 USD</small>
                    </span>
                  ) : (
                    <span className='course-price'>
                      <h6>Kursų kaina</h6> ${course.price}
                      <small> USD</small>
                    </span>
                  )}
                </div>
              </div>
            ) : (
              ''
            )}
          </div>

          <p>{course.description}</p>
          <strong className=''>Nauda</strong>
          <ul className='course-benfits'>
            {course.benefits &&
              course.benefits.map((benefit, index) => {
                return (
                  <li
                    key={index}
                    dangerouslySetInnerHTML={{ __html: benefit }}
                  ></li>
                );
              })}
          </ul>
          <strong className=''>Į kursą įeina</strong>

          <ul class='course-feature'>
            {course.offering &&
              course.offering.map((offering, index) => {
                return (
                  <li
                    key={index}
                    dangerouslySetInnerHTML={{
                      __html: '<i class="fas fa-om"></i>' + offering,
                    }}
                  ></li>
                );
              })}
          </ul>
          <div className='card-course-btns'>
            {isPurchased == '1' ? (
              <>
                <Link
                  href={
                    '/user/course-details/' +
                    btoa(course.page_id) +
                    '/' +
                    btoa(course.id)
                  }
                >
                  <a className='btn btn-sm alt-btn' id={course.id}>
                    Pradėti kursą
                  </a>
                </Link>
                <Link
                  href={
                    '/user/gift-course/' +
                    btoa(course.page_id) +
                    '/' +
                    btoa(course.id)
                  }
                >
                  <a className='btn btn-sm alt-btn'>Padovanoti</a>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={
                    '/user/course-landing/' +
                    btoa(course.page_id) +
                    '/' +
                    btoa(course.id)
                  }
                >
                  <a className='btn btn-sm alt-btn' id={course.id}>
                    Skaityti daugiau
                  </a>
                </Link>
                <Link
                  href={
                    '/user/buy-course/' +
                    btoa(course.page_id) +
                    '/' +
                    btoa(course.id)
                  }
                >
                  <a className='btn btn-sm alt-btn' id={course.id}>
                    Įsigyti
                  </a>
                </Link>
                <Link
                  href={
                    '/user/gift-course/' +
                    btoa(course.page_id) +
                    '/' +
                    btoa(course.id)
                  }
                >
                  <a className='btn btn-sm alt-btn'>Padovanoti </a>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseListDetailsLanguage;
