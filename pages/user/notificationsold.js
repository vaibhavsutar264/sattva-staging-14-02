import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import Link from 'next/link';
import { apiRoute, getLocalStorageAuth } from '../../utils/helpers';
import Layout from '../../components/user/Layout';
import constants from '../../constants';


const notifications = () => {

    const[notifications,setNotifications]= useState([]);
    const[show,setShow]=useState(false);
    const[data_date,setData_date] = useState();
    const[id,setId] = useState();
    const[isLoading,setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const userData = getLocalStorageAuth();
        const date = userData.userDetails.created_at;
        setData_date(date);
        setId(userData.userDetails.id)

        axios.post(apiRoute('notifications'), {
            user_id: [id,'forall'],
          })
          .then(  (response) => {
          setNotifications(response.data)
          setIsLoading(false);
          })
          .catch( (error) => {
            console.log(error);
          });

    }, [])

    
   const deleteNotification=(n_id)=>{
        setShow(true)
          axios.post(apiRoute('delete-notification'), {
            id: n_id,
          })
          .then( (response) => {
            if(response){
              setShow(false); 
            }
          })
          .catch( (error) => {
            console.log(error);
          });
      }

     const notify=setInterval(() => {
        //get notifications
              axios.post(apiRoute('notifications'), {
            user_id: [id,'forall'],
          })
          .then(  (response) => {
           
            setNotifications(response.data)
             
          })
          .catch( (error) => {
            console.log(error);
        
            //getcount 
        
           
          });}, 6000);

          

    return (

    <>

{isLoading && (
                    <div className='preloader-background'>
                      <div className='big sattva_loader active'>
                        <img src={constants.SITE_URL + '/images/loader.png'} />
                      </div>
                    </div>
                  )}

        
      <div class="notify-content text-left">
      <div class="notfy_head"><h4>Notifications</h4>
    <span aria-hidden="true" className="notification-btn">×</span></div>      
    { show && <p>please wait...</p>}
      {notifications.map((notification,index)=>(
        notification.created_at > data_date &&
      (<>
      
      <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <strong class="mr-auto">Sattva Connect</strong>
            <small class="text-muted"><Moment fromNow>{notification.created_at}</Moment></small>
            <button type="button" onClick={()=>deleteNotification(notification.id)} class="ml-2 mb-1 close"  aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body mr-5">{notification.master_notification.message}
        
        </div>
        <div class="toast-header">
            <strong class="mr-auto">
            {notification.link !=null ?

            notification.message_id == 1 ? 
            <span>
              <Link href={notification.link}>
              <a >Update Card Now</a>
              </Link>
              </span>
            : notification.message_id == 2 || notification.message_id == 3 ? 
            <span>
              <Link href={notification.link}>
              <a>Click here</a>
              </Link>
              </span>
            : notification.message_id == 5 ?
            <span>
              <Link href={notification.link}>
              <a>Join Now</a>
              </Link>
              </span>
            : notification.message_id == 4 || notification.message_id == 9 ? 
            <span>
              <Link href={notification.link} >
              <a>Check Now</a>
              </Link>
              </span>
            :
            <span>
              <Link href={notification.link}>
              <a>View more</a>
              </Link>
              </span>
            :<></>
       }
            </strong>
           
        </div>
      </div>
      </>)

      ))}
    </div>
    </>
    )
}

export default notifications
