import React, { Component } from 'react';
import Link from 'next/link';
import ReactTooltip from 'react-tooltip';

function CourseOverView({ item, isPurchased }) {
  let url='';

  if(item.id=='1'){

    if(item.purchaed == '1'){

      url = '/user/dharma-full-course';

    }else{
      url = '/user/dharma-free-trail';
    }
    

  }else{
   url = '/user/course-details/' + btoa(item.page_id) + '/' + btoa(item.id);
  }


  if (isPurchased == '1') {

       
    return (
      <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6' key={item.id}>
        <Link href={url}>
          <a>
            <div className='hoverable card'>
              <img className='img-fluid' src={item.image} />
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
        <Link
          href={url}
        >
          <a>
            <div className='hoverable card'>
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

export default CourseOverView;
