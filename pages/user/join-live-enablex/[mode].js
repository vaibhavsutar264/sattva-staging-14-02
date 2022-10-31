import React, { Component, useEffect, useState } from 'react';

import Header from '../../../components/user/common/Header';
import Footer from '../../../components/user/common/Footer';
import router, { Router } from 'next/router';
import axios from 'axios';
import { apiRoute, getApiHeader, getLocalStorageAuth } from '../../../utils/helpers';
import Link from 'next/link';

const JoinLiveEnablex = () => {
    const[name,setName]=useState();
    const[usertype,setUserType]=useState();
    const[mode,setMode]=useState();
    const[viewerUrl,setViewerUrl]=useState('');
    const[moderatorUrl,setModeratorUrl]=useState('');

    useEffect(()=>{

        const requestOptions = {
            headers: getApiHeader(true),
          };
          
          axios.get(apiRoute('enablex-get-iframe-url'), 
            requestOptions
          )
          .then(function (response) {
              setModeratorUrl(response.data.moderator);
              setViewerUrl(response.data.viewer);
          })
          .catch(function (error) {
            console.log(error);
          });


        const {mode} = router.query;
        setMode(mode);
        const users = getLocalStorageAuth();
        if(users){
            const userName = users.userDetails.first_name;
            const user_type = users.userDetails.user_type;
            setName(userName);
            setUserType(user_type);
        }

        var joinBtn = document.getElementById('joinRoomByPin');
        console.log(joinBtn);
    },[])
   
    return (
      <>
     
            <Header/>
           <div className='light-purplebg' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
           <div className='broadcast-header'>
            <h4 className='user-name mb-0' style={{color:'black'}}>
              Welcome to Sattva Connect Live Streaming, Please do not refresh this page.
            </h4>
            </div> 
       {/* <Link href='/user/join-live-enablex/viewer'>
            <a >
            <h4>Refresh</h4>
            </a>
            </Link> */}
       
       {/* {usertype === 1 && mode == 'moderator' &&
       <>
       
            <iframe id='enxScreen' height={600} width={1000}
            allow="camera;  microphone; fullscreen; speaker; display-capture"
            src={moderatorUrl+`?name=${name}`}>
            </iframe>

                    </>
                    }

            {usertype === 0 && mode === 'viewer' ?                 
        
                <iframe id='enxScreen' height={500} width={800}
                allow="camera;  microphone;fullscreen; speaker; display-capture"
                src={viewerUrl+`?video=no&audio=no&name=${name}`}>             
                </iframe>
            :  usertype === 1 && mode === 'viewer' ?
            <iframe id='enxScreen' height={580} width={1200}
                allow="camera;  microphone;fullscreen; speaker; display-capture"
                src={viewerUrl+`?video=no&audio=no&name=${name}`}>             
                </iframe>
        :<></>} */}

        <iframe id='enxScreen' height={580} width={1200}
                allow="camera;  microphone;fullscreen; speaker; display-capture"
                src={viewerUrl+`?video=no&audio=no&name=${name}`}>             
                </iframe>
</div>            
<Footer />
         </>
    );
  }
export default JoinLiveEnablex;
