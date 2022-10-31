import axios from 'axios';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import AllSeries from '../../components/user/audioseries/AllSeries';
import Header from '../../components/user/common/Header';
import { ContextSearch, SearchContext } from '../../components/user/ContextSearch';
import Layout from '../../components/user/Layout';
import constants from '../../constants';
import { apiRoute, getLocalStorageAuth } from '../../utils/helpers';

const SearchComponent = dynamic(
  () => import('../../components/user/audioseries/SeriesSearch'),
  {
    ssr: false,
  }
);

const audioseries=()=> {

  const context = useContext(SearchContext);

  const[isloading,setIsLoading]=useState(true);

    const[series,setSeries]=useState([]);
    const[recent,setRecent]=useState([]);  
    const[read,setRead]=useState([]); 


  const searchSeries = (response) => {
    axios.post(apiRoute('search-audio-series'), {
      data: response,
    })
    .then((response) => {
      setSeries(response.data);
      // context.setResults(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  }

    useEffect(()=>{

      searchSeries(context.si);

        axios.get(apiRoute('recent-series-videos'))
        .then( (response) => {
               setRecent(response.data);

      
           })
           .catch( (error) => {
               console.log(error);
           })


           const getId = getLocalStorageAuth();
           let userId = getId.userDetails.id;
         
           axios.get(apiRoute('recent-read-series/'+userId))
           .then( (response) => {
             setRead(response.data);
             console.log(response.data);
             setIsLoading(false);

              })
              .catch( (error) => {
                  console.log(error);
              })


    },[]);

    const handleCallback = (childdata) => {
      searchSeries(childdata);
  }

  let ids = '';

    return (
      <>
                <Header/>
             <main className='admin-content'>
             <section
            className='inner-banner'
            style={{
              background: 'url(/../images/seriessection.jpeg)',
              backgroundSize: 'cover',
              minHeight: '500px',
            }}
          >
            <div className='container text-center text-white'>
              <h1>
              Explore a wide variety of yogic lifestyle Audio classes to bring balance, harmony and positivity into your life. Live life consciously!
              </h1>
            </div>
          </section>
          
                  <SearchComponent  parentcallback={handleCallback}/>
                  
            <div className='sec sec-style secSeriesInner series_page'>
              <div className='container'>
                <div className='class-block mt-0'>
                  
            <div className="row">
            {series.map((element,index)=>{

                for(let i=0;i<read.length;i++){
                  if(element.id == read[i]){
                      ids = read[i];
                  }
                 
                }

                return(
                    <div className="col-lg-3 col-md-3 col-sm-12 seriseVideos">
                    <AllSeries data ={element} recent={ids}/>
                    </div>
                );
            })}
            </div>
            </div>
            </div>
            </div>
            </main>
            {isloading && (
                    <div className='preloader-background'>
                      <div className='big sattva_loader active'>
                        <img src={constants.SITE_URL + '/images/loader.png'} />
                      </div>
                    </div>
                  )}
        </>
    )
}

export default audioseries;