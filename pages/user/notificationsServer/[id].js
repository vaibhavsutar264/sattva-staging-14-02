import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import Link from 'next/link';
import Layout from '../../../components/user/Layout';
import { getLocalStorageAuth,apiRoute,getApiHeader } from '../../../utils/helpers';


const notifications = () => {
    const[notifications,setNotifications]= useState([]);
    const[show,setShow]=useState(false);
    const[data_date,setData_date] = useState();
    const[id,setId] = useState();

    useEffect(() => {
        const userData = getLocalStorageAuth();
        const date = userData.userDetails.created_at;
        setData_date(date);
        setId(userData.userDetails.id)

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
        
           
          });}, 2000);

          

    return (

      <div class="notify-content text-left notifyMobile">
      <div class="notfy_head"><h4>Notifications</h4>
      <Link href="/user/me">
    <span aria-hidden="true" className="notification-btn">
      <i class="fas fa-chevron-left"></i>
      </span>
</Link>
      </div>
    {/*<span aria-hidden="true" className="notification-btn"><i class="fas fa-long-arrow-alt-left"></i></span></div>*/}
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
    )
}


// export const getServerSideProps= async (context) =>{

//   const requestOptions = {
//     method: 'POST',
//     'User-Agent': '*',
//     headers: { 'Content-Type': 'application/json' },
//     user_id: JSON.stringify([context.params.id,'forall']),
// };
// const res = await fetch(apiRoute('notifications'), requestOptions);


//   const notificationss = await res.text();

// return{
//     props:{
//         notificationss
//     }
// }

// }


export default notifications
