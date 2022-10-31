import Link from 'next/link';
import React from 'react'
import ReactTooltip from 'react-tooltip';


const AllSeries = (series) => {
    return (
        <div>
            
{ <div >
         <Link href={'/user/series-videos/' + series.data.id}>
              <a>
            <div className='hoverable card'>
              <img className='img-fluid' src={series.data.thumbnail} />
              <div className='card-content'>
             
                <span
                  className='card-title'
                  data-html={true}
                  data-for='custom-color-no-arrow'
                  data-tip={series.data.title}
                  style={{ overflow: 'hidden'}}
                >
                  {series.data.title}
                </span>
                <ReactTooltip
                  id='custom-color-no-arrow'
                  className='react-tooltip card-title-tooltip'
                  delayHide={1000}
                  textColor='#FFF'
                  backgroundColor='#5c1b72'
                  effect='solid'
                />
              
              <p>{series.data.description}</p>
               
               
              </div>
            </div>
            </a>
        </Link>
      </div>}        </div>
    )
}

export default AllSeries;