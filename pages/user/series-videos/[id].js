import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useRef } from "react";
import { useEffect, useState } from "react";
import Layout from "../../../components/user/Layout";
import SeriesVideo from "../../../components/user/SeriesVideo";
import constants from "../../../constants";
import { apiRoute, getApiHeader, getLocalStorageAuth } from "../../../utils/helpers";
import ReadMoreAndLess from 'react-read-more-less';
import { SearchContext } from "../../../components/user/ContextSearch";

const videoDetails = ({videos}) =>{
const[title,setTitle]=useState();
const[desc,setDesc]=useState();
const[isloading,setIsLoading]=useState(true);
const[videsc,setViDesc]=useState();
const[error,setError]=useState(false);
const[alertMsg,setAlertMsg]=useState();
const ReadMore = useRef();

  const [isReadMore, setIsReadMore] = useState(true);
  const [favoriteStatus,setFavoriteStatus] = useState(false);
 
  const router = useRouter()
  const {id} = router.query

const value = useContext(SearchContext);
  useEffect(()=>{
    const requestOptions = {
      headers: getApiHeader(true),
    };
    const auth = getLocalStorageAuth();
    const userDetails = auth.userDetails;
    axios
    .get(
      apiRoute(
        'user-dashboard/get-video-details/' +
          id +
          '/' +
          userDetails.id
      ),
      requestOptions
    )
    .then((res) => {
      setFavoriteStatus(res.data.favoriteStatus)
    })
    .catch((error) => {
      setIsLoading(false);
    });
  });



  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

    
    axios.get(apiRoute(`get-series-info/${id}`))
    .then((response)=> {
      setTitle(response.data[0].title);
      setDesc(response.data[0].description);
      setIsLoading(false);
      
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })

    // const read = (data) => {
    //   setViDesc(data)

    //   console.log(data);
    // } 
   const handleCallback = (childdata) => {
      setViDesc(childdata)

  }

  const changeFavoriteStatus=(e)=>{
    const auth = getLocalStorageAuth();
    const userDetails = auth.userDetails;

      const requestOptions = {
        headers: getApiHeader(true),
      };
      setIsLoading(true)
      var details = {
        user_id: userDetails.id,
        video_id: id,
        type:1,
      };
      if (!favoriteStatus) {
        axios
          .post(
            apiRoute('user-dashboard/add-user-favorite'),
            details,
            requestOptions
          )
          .then((res) => {

            setFavoriteStatus(true);
            setIsLoading(false);
          })
          .catch((error) => {
            window.scrollTo(0, 0);
            setError(true);
            setAlertMsg('Something went wrong please try again.');
            setIsLoading(false);
          });
      } else {
        axios
          .post(
            apiRoute('user-dashboard/remove-user-favorite'),
            details,
            requestOptions
          )
          .then((res) => {
            this.setState({ favoriteStatus: false, loading: false });

            setFavoriteStatus(false);
            setIsLoading(false);
          })
          .catch((error) => {
            window.scrollTo(0, 0);
             setIsLoading(false);
          setError(true);
          setAlertMsg('Something went wrong please try again.');
          });
         
    };
  }
    return (
            <>
        <Layout>
        <main className='admin-content light-purplebg'>
            <div className='sec sec-style secSeriesInner'>
              <div className='container'>
                <div className='class-block mt-0'>
                  <div className='row'>
                    <div class="col-md-6 col"><h4 className="revamp-subtitle">{title}</h4></div>
                    <div className='col-md-6 col text-right'>
                      <Link href='/user/series'>
                        <a className='btn btn-sm'>Back</a>
                      </Link>
                    </div>
                  </div>
                  <div className='media-btns text-right my-4'>
                  <a
                          title={
                            favoriteStatus === false
                              ? 'Add to Favorite'
                              : 'Remove fromFavorite'
                          }
                          className={
                            favoriteStatus === false
                              ? 'btn btn-sm favorited'
                              : 'btn btn-sm'
                          }
                          onClick={changeFavoriteStatus}
                        >                  
                        {favoriteStatus === false ? (
                            <>
                              <i className='fas fa-heart' />
                              <> Add to My Series</>
                            </>
                          ) : (
                            <>
                              <i class='fa fa-heart-o' aria-hidden='true'></i>
                              <> Remove from My Series</>
                            </>
                          )}                
                          </a>
                           </div>
                  <div class="card card-view mb-4">
                    <div class="card-content p-3">
                      <p className="revamp-para-small">{desc}</p>
                    </div>
                  </div>
                 

        <div className="row">
               
            {
                videos.map((video)=>{
            return(
                <div
                className='col-sm-12 col-lg-4 col-md-4 seriesVideoSingle'
              >
            <SeriesVideo seriesvideo={video}  parentcallback = {handleCallback}/>
            </div>
            );
                })
            }
            <div
          id='cardVideoModal'
          className='modal fade cardVideoModal seriesVideoModal '
          role='dialog'
        >
          
          <div className='modal-dialog'>
            <div className='modal-content light-purplebg'>
              <div className='container'>
                <div className='card card-view'>
                  <button
                    type='button'
                    className='closeVideo'
                    data-dismiss='modal'
                  >
                    <img src='/images/cancel.svg' />
                  </button>
                  <div className='card-content p-3'>
                    <div className='media-header'>
                      <h4
                        className='media-media-title mt-0 revamp-videotitle'
                        id='courseVidTitle'
                      ></h4>
                    </div>
                    <div className='media-content'>
                      <iframe
                        allowfullscreen='true'
                        className='ifmplayer'
                        id='courseVidUrl'
                        src=''
                        frameborder='0'
                        width='100%'
                        height='430'
                      ></iframe>
                      
                     { videsc !=null ?
                     <ReadMoreAndLess
                        ref={ReadMore}
                        className="read-more-content"
                        charLimit={400}
                        readMoreText={<a className='view-more'>View More</a>}
                        readLessText={<a className='view-more'>  View Less</a>}
                    >
                  {videsc}          
                        </ReadMoreAndLess>
                  
                        :('')
}
{/* <p className="text" dangerouslySetInnerHTML={ {__html: videsc} }>
      {isReadMore ? videsc.slice(0, 500) : videsc}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
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
        </Layout>
        
            </>
    )

}

export const getServerSideProps= async (context) =>{
    const res = await fetch(apiRoute(`get-series-videos/${context.params.id}`));
    const videos = await res.json();

  return{
      props:{
          videos
      }
  }

}

export default videoDetails;