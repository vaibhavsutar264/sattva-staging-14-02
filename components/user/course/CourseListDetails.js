import React, { Component } from 'react';
import Link from 'next/link';
import ReactTooltip from 'react-tooltip';

function CourseListDetails({ course, isPurchased }) {
  var avgStars = '';
  
  for (var i = 0; i < course.rating; i++) {
    avgStars += '<i class="fa fa-star" aria-hidden="true"></i>';
  }

console.log(course.purchaed);
  if (course.id == '1') {
    if (course.purchaed == '1') {
      var startUrl = '/user/dharma-full-course';
    } else {
      var startUrl = '/user/dharma-free-trail';
    }
  } else {
    var startUrl =
      '/user/course-details/' + btoa(course.page_id) + '/' + btoa(course.id);
  }

  const detailUrl =
    course.id == '1'
      ? '/user/dharma-free-trail'
      : '/user/course-landing/' + btoa(course.page_id) + '/' + btoa(course.id);
  return (
<>
{
  isPurchased == '1' ? (
    <div className='col-lg-4 col-md-4 col-sm-12 mb-5' >
    <div className='card card-course flex-dir-col' id='no-margin' style={{height: '100%'}}>
      <div className='card-course-img mb-2'>
        <img src={course.overview_image} className='img-fluid' />
        <img src={course.overview_image} className='img-fluid backImg' />
      </div>
      <div className='card-course-content ml-0'>
        <div className=''>
          <div className='ratingHeading'>
            <h6 className='revamp-course-title'>{course.title}</h6>
          </div>
        </div>
        <div
                  className='mb-3'
                  data-html={true}
                  data-for='custom-color-no-arrow'
                  data-tip='Testimonials'
                >
                  <Link href={startUrl}>
                    <a className='rating-hover' dangerouslySetInnerHTML={{ __html: avgStars }}></a>
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
        <div className='card-course-btns'>
              <Link href={startUrl}>
                <a className='btn btn-sm px-3' id={course.id}>
                  Start Course
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
                <a className='btn btn-sm alt-btn px-3'>Gift A Friend </a>
              </Link>
        </div>
      </div>
    </div>
  </div>
  ) : ( 
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
                <div
                  className='courseRating'
                  data-html={true}
                  data-for='custom-color-no-arrow'
                  data-tip='Testimonials'
                >
                  <Link
                    href={{
                      pathname: detailUrl,
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
          </div>

          {isPurchased !== '1' ? (
            <div className='course-rating'>
              { course.id =='31' || course.id =='53' ?
              (
              <div className='price-tag'>
                {course.course_type == '2' ? (
                  <span className='course-price'>
                    <h6>Donation</h6> <small>Min. ${course.price} USD</small>
                  </span>
                ) : (
                  <span className='course-price'>
                    <h6>Course Price</h6> ${course.price}
                    <small> USD</small>
                  </span>
                )}
              </div>                )
              :(
            <div className='price-tag'>
                {course.course_type == '2' ? (
                  <span className='course-price'>
                    <h6>Donation</h6> <small>Min. $10 USD</small>
                  </span>
                ) : (
                  <span className='course-price'>
                    <h6>Course Price</h6> ${course.price}
                    <small> USD</small>
                  </span>
                )}
              </div>                )

              }
              
            </div>
          ) : (
            ''
          )}
        </div>

        <p>{course.description}</p>
        <strong className=''>Course Benefits</strong>
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
        <strong className=''>Course Offerings</strong>

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
              <Link href={detailUrl}>
                <a className='btn btn-sm alt-btn' id={course.id}>
                  Read More
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
                  {' '}
                  Buy Now
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
                <a className='btn btn-sm alt-btn'>Gift A Friend </a>
              </Link>
        </div>
      </div>
    </div>
  </div>
  )
}
    {/* <div className='col-lg-12 col-md-12 col-sm-12'>
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
                    data-tip='Testimonials'
                  >
                    <Link href={startUrl}>
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
                    data-tip='Testimonials'
                  >
                    <Link
                      href={{
                        pathname: detailUrl,
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
                { course.id =='31' || course.id =='53' ?
                (
                <div className='price-tag'>
                  {course.course_type == '2' ? (
                    <span className='course-price'>
                      <h6>Donation</h6> <small>Min. ${course.price} USD</small>
                    </span>
                  ) : (
                    <span className='course-price'>
                      <h6>Course Price</h6> ${course.price}
                      <small> USD</small>
                    </span>
                  )}
                </div>                )
                :(
              <div className='price-tag'>
                  {course.course_type == '2' ? (
                    <span className='course-price'>
                      <h6>Donation</h6> <small>Min. $10 USD</small>
                    </span>
                  ) : (
                    <span className='course-price'>
                      <h6>Course Price</h6> ${course.price}
                      <small> USD</small>
                    </span>
                  )}
                </div>                )

                }
                
              </div>
            ) : (
              ''
            )}
          </div>

          <p>{course.description}</p>
          <strong className=''>Course Benefits</strong>
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
          <strong className=''>Course Offerings</strong>

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
                <Link href={startUrl}>
                  <a className='btn btn-sm alt-btn' id={course.id}>
                    Start Course
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
                  <a className='btn btn-sm alt-btn'>Gift A Friend </a>
                </Link>
              </>
            ) : (
              <>
                <Link href={detailUrl}>
                  <a className='btn btn-sm alt-btn' id={course.id}>
                    Read More
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
                    {' '}
                    Buy Now
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
                  <a className='btn btn-sm alt-btn'>Gift A Friend </a>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div> */}
    </>
  );
}

export default CourseListDetails;
