import React, { Component } from 'react';
import Link from 'next/link';
import ReactTooltip from 'react-tooltip';

function CourseOverViewMobile({ item, index, isPurchased }) {
  if (index == 1) {
    var classname = 'carousel-item active';
  } else {
    var classname = 'carousel-item';
  }
  let url ='';
  if (isPurchased == '1') {

    url =
      item.id == '1' && item.purchaed == '1'
        ? '/user/dharma-full-course'
        : item.id == '1'
        ? '/user/dharma-free-trail'
        : '/user/course-details/' + btoa(item.page_id) + '/' + btoa(item.id);

    return (
      <div className={classname}>
        <Link
          href={url}
        >
          <a>
            <div className='hoverable card' key={item.id}>
              <img className='img-fluid' src={item.image} />
              <div className='card-content'>
                <span
                  className='card-title'
                  data-html={true}
                  data-for='custom-color-no-arrow'
                  data-tip={item.title}
                >
                  {item.title}
                </span>
                <ReactTooltip
                  id='custom-color-no-arrow'
                  className='react-tooltip card-title-tooltip'
                  delayHide={1000}
                  textColor='#FFF'
                  backgroundColor='#5c1b72'
                  effect='solid'
                />
                <p
                  className='pop'
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></p>
              </div>
            </div>
          </a>
        </Link>
      </div>
    );
  } else {
    url =
      item.id == '1'
        ? '/user/dharma-free-trail'
        : '/user/course-landing/' + btoa(item.page_id) + '/' + btoa(item.id);
    return (
      <div className={classname}>
        <Link
          href={url}
        >
          <a>
            <div className='hoverable card' key={item.id}>
              <img className='img-fluid' src={item.image} />
              <div className='card-content'>
                <span
                  className='card-title'
                  data-html={true}
                  data-for='custom-color-no-arrow'
                  data-tip={item.title}
                >
                  {item.title}
                </span>
                <ReactTooltip
                  id='custom-color-no-arrow'
                  className='react-tooltip card-title-tooltip'
                  delayHide={1000}
                  textColor='#FFF'
                  backgroundColor='#5c1b72'
                  effect='solid'
                />
                <p
                  className='pop'
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></p>
              </div>
            </div>
          </a>
        </Link>
      </div>
    );
  }
}

export default CourseOverViewMobile;
