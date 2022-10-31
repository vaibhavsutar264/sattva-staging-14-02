import React, { Component, useEffect, useState } from 'react';

import Header from '../../components/user/common/Header';
import Footer from '../../components/user/common/Footer';
import axios from 'axios';
import { apiRoute, getApiHeader, getLocalStorageAuth } from '../../utils/helpers';
import Link from 'next/link';

const JoinLiveModerator = () => {
  const [name, setName] = useState();
  const [moderatorUrl, setModeratorUrl] = useState('');
  const [moderator, setModerator] = useState('');


  useEffect(() => {

    const users = getLocalStorageAuth();
    if (users) {
      const userName = users.userDetails.first_name;
      setName(userName);
    }

    const requestOptions = {
      headers: getApiHeader(true),
    };

    axios.post(apiRoute('latest-moderator'), {
      name: users.userDetails.first_name,
    }, requestOptions)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });


    axios.get(apiRoute('enablex-get-iframe-url'),
      requestOptions
    )
      .then(function (response) {
        setModeratorUrl(response.data.moderator);
        setModerator(response.data.details)
      })
      .catch(function (error) {
        console.log(error);
      });




  }, [])

  return (
    <>

      <Header />
      <div className='light-purplebg' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className=''>
          <div className='d-flex align-items-center'>
            <h4 className='user-name revamp-subheading mb-0' style={{ color: 'black' }}>
              Welcome to Sattva Connect Live Classes with {moderator && moderator}
            </h4>
            {/* <Link>
              <button className='btn btn-sm'>
                Exit
              </button>
            </Link> */}
          </div>

        </div>

        <iframe id='enxScreen' width={1200}
          allow="camera;  microphone;fullscreen; speaker; display-capture"
          src={moderatorUrl + `?video=no&audio=no&name=${name}`}>
        </iframe>
      </div>
      <Footer />
    </>
  );
}
export default JoinLiveModerator;
