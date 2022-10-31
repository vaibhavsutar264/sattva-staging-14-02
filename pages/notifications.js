import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiRoute, getApiHeader, imagePath } from '../utils/helpers';


const notifications = () => {
const[notifications,setNotifications]=useState([]);
const[id,setId]=useState();
const[count,setCount]=useState();

    const readNotification=()=>{
        console.log(id);
        axios.post(apiRoute('unread'), {
            user_id: id,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    useEffect(()=>{
        const requestOptions = {
            headers: getApiHeader(),
        };
        axios
            .get(apiRoute('notifications'), requestOptions)
            .then((res) => {
                setNotifications(res.data);
                setId(res.data[0].user_id);
            });

            axios
            .get(apiRoute('getcount'), requestOptions)
            .then((res) => {
                setCount(res.data);
            });

    });
    return (
        <div>
            <h3>{count}</h3>
           {notifications.map((notification,index)=>(
               <div className="container mb-5">
                   <div class="card ml-5" onClick={readNotification}>
            <div class="card-body">
            {notification.message}
            </div>
            </div>   
                   </div>
           ))}
        </div>
    );
};

export default notifications;