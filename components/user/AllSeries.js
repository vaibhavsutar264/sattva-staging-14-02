import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip';
import { apiRoute, getLocalStorageAuth } from '../../utils/helpers';


const AllSeries = (series) => {


const[read,setRead]=useState([]); 
const[id,setId]=useState(); 

useEffect(()=>{
  const getId = getLocalStorageAuth();
  let userId = getId.userDetails.id;
  setId(userId);

  axios.get(apiRoute('recent-read-series/'+userId))
  .then( (response) => {
    setRead(response.data);
    console.log(response.data);
     })
     .catch( (error) => {
         console.log(error);
     })

},[])

const handleRecentseries = (seriesId) => {
  const getId = getLocalStorageAuth();
  let userId = getId.userDetails.id;

  axios.get(apiRoute('recent-series/'+userId+'/'+seriesId))
  .then( (response) => {
    console.log(response);
     })
     .catch( (error) => {
         console.log(error);
     })

}


    return (
        <div>
            
         { <div onClick={()=>handleRecentseries(series.data.id)} >
         <Link href={'/user/series-videos/' + series.data.id}>
              <a>
             <div className='hoverable card'>
              <img className='img-fluid' src={series.data.thumbnail} />

              { series.recent && series.recent==series.data.id ?
              ('')
              :
              <span class="notify-badge">Newly Added</span>

              }


              <div className='card-content'>
                <span
                  className='revamp-course-title'
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