import React, { useEffect, useRef } from 'react'
import ReactTooltip from 'react-tooltip';
import ReadMoreAndLess from 'react-read-more-less';

const SeriesVideo =(series)=> {
    console.log(series);
      
    const ReadMore = useRef();
    const readref = useRef()


   const read = (item) => {
      
     series.parentcallback(item);

     console.log(item);
    }


    return (
      <>
                 <div
                    id='courseVIdeo'
                    className='hoverable card mt-3'
                    data-toggle='modal'
                    data-target='#cardVideoModal'
                    data-backdrop='static'
                    data-keyboard='false'
                    data-title={series.seriesvideo.title}
                    data-description={series.seriesvideo.description}
                    data-src={series.seriesvideo.audio_file}
                    onClick={() =>read(series.seriesvideo.description)}
                  >
                                          
                    <img
                      src={series.seriesvideo.thumbnail}
                      className='img-fluid seriesimg'
                    />
                    <div className='card-content'>
                      <span 
                      data-html={true}
                      data-for='custom-color-no-arrow'
                      data-tip={series.seriesvideo.title}
                      >{series.seriesvideo.title}</span>
                      <ReactTooltip
                        id='custom-color-no-arrow'
                        className='react-tooltip card-title-tooltip'
                        delayHide={1000}
                        textColor='#FFF'
                        backgroundColor='#5c1b72'
                        effect='solid'
                      />
                      <div className='courseVideoContent'
                      >
                        {/* <p>{series.seriesvideo.description}</p> */}
                        
                        <p
                        dangerouslySetInnerHTML={{
                          __html: `${series.seriesvideo.description.substring(0, 300)}...`,
                        }}
                      ></p>
                        {' '}
                      </div>
                    </div>
                  </div>
        
     </>
      
    )
}
export default SeriesVideo;
