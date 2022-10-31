import React, { Component } from 'react';
import axios from 'axios';
import {
  apiRoute,
  getApiHeader,
  getLocalStorageAuth,
} from '../../../utils/helpers';
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
import Chat from './Chat';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import { FullScreen, useFullScreenHandle } from "react-full-screen";


const JoinLive = () =>{
    return(
<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>

                    <h2 style={{marginTop: '100px'}}>EnableX Livestream Participants</h2>
    <iframe height={500} width={800}
    allow="camera; microphone; fullscreen; speaker; display-capture"
    src="https://sattvaconnect.yourvideo.live/6242ec7b5a280929f846c22c">
    </iframe>

</div>
    );
}

export default JoinLive;
