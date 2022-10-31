import React, { Fragment } from 'react';
import Link from 'next/link';
import ReactTooltip from 'react-tooltip';
import { encode } from 'js-base64';

function CourseList({ course }) {
  var avgStars = '';
  for (var i = 0; i < course.rating; i++) {
    avgStars += '<i class="fa fa-star" aria-hidden="true"></i>';
  }
  var courseDetails = '/course_details/' + encode(course.id.toString());
  console.log(course)
  return (
    <Fragment>
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
                      pathname: courseDetails,
                      state: { scroll: 'true' },
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
              <div className='course-rating'>
                {course.id=='31' || course.id=='53' ?(
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
            <ul className='course-feature'>
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
              <Link href={courseDetails}>
                <a className='btn btn-sm alt-btn'>Read more</a>
              </Link>
              <Link
                href={
                  '/buy-course/' +
                  encode(course.page_id.toString()) +
                  '/' +
                  encode(course.id.toString())
                }
              >
                <a className='btn btn-sm alt-btn'>Buy Now</a>
              </Link>
              <Link
                href={
                  '/gift-course/' +
                  encode(course.page_id.toString()) +
                  '/' +
                  encode(course.id.toString())
                }
              >
                <a className='btn btn-sm alt-btn'>Gift A Friend</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default CourseList;
