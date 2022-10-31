import React, { Component } from 'react';
import Link from 'next/link';
import ReactTooltip from 'react-tooltip';
import { getLocalStorageAuth } from '../../utils/helpers';
function VideoDetails({ item }) {
  const auth = getLocalStorageAuth();
  if (auth.userDetails.has_subscription == '1') {
    return (
      <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 serchVideo' key={item.id}>
        <Link href={'/user/video-details/' + item.id}>
          <a>
            <div className='hoverable card'>
              <img className='img-fluid' src={item.thumbnail} />
              <div className='card-content'>
                <span
                  className='card-title revamp-course-title'
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
    return (
      <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6' key={item.id}>
        <Link href={'/user/plans'}>
          <a>
            <div
              className='hoverable card mt-0 courseCard'
              data-toggle='modal'
              data-target='#cardVideoModal'
              data-backdrop='static'
              data-keyboard='false'
            >
              <div className='overlay'>
                <a href='#' class='icon'>
                  <img src='/../images/padlock.svg' />
                </a>
              </div>
              <img className='img-fluid' src={item.thumbnail} />
              <div className='card-content'>
                <span
                  className='card-title revamp-course-title'
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

export default VideoDetails;
