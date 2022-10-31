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


class JoinLive extends Component {
  subscriberIntervalID = 0;
  sessionIntervalID = 0;

  constructor(props) {
    super(props);
    this.otSubscriber = React.createRef();
    this.state = {
      error: null,
      connection: 'Connecting',
      sessionId: '',
      token: '',
      teacherName: '',
      messageList: [],
      user: '',
      subcriberCount: 0,
      subscriberList: [],
      liveStatus: 0,
      audio: true,
      video: true,
      startStream: false,
    };

    this.sessionEventHandlers = {
      sessionConnected: () => {
        this.setState({ connection: 'Connected' });
      },
      sessionDisconnected: () => {
        this.setState({ connection: 'Disconnected' });
      },
      sessionReconnected: () => {
        this.setState({ connection: 'Reconnected' });
      },
      sessionReconnecting: () => {
        this.setState({ connection: 'Reconnecting' });
      },
      streamCreated: () => {
        const requestOptions = {
          headers: getApiHeader(true),
        };
        const details = {
          username: this.state.user,
        };
        //Update stream status
        axios.post(
          apiRoute('update_opentok_subscriber'),
          details,
          requestOptions
        );
      },
      streamDestroyed: () => {
        this.getSessionId();
        this.setState({ liveStatus: 0, sessionId: '', startStream: false });
        const requestOptions = {
          headers: getApiHeader(true),
        };
        //Update stream status
        axios
          .get(
            apiRoute('update_stream_status/' + this.state.sessionId + '/' + 0),
            requestOptions
          )
          .then((res) => {
            console.log('Status updated success');
          });
      },
      connectionCreated: (obj) => {
        console.log('stream created');
      },

      connectionDestroyed: (obj) => {
        console.log('stream Destroyed');
      },
    };

    this.publisherEventHandlers = {
      accessDenied: () => {
        console.log('User denied access to media source');
      },
      streamCreated: () => {
        console.log('Publisher stream created');
      },
      streamDestroyed: ({ reason }) => {
        console.log(`Publisher stream destroyed because: ${reason}`);
      },
    };

    this.subscriberEventHandlers = {
      videoEnabled: () => {
        console.log('Subscriber video enabled');
      },
      videoDisabled: () => {
        console.log('Subscriber video disabled');
      },
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    this.props.setLoading(true);

    const userData = getLocalStorageAuth();
    const requestOptions = {
      headers: getApiHeader(true),
    };
    if (userData.userDetails) {
      const firstName = userData.userDetails.first_name;
      const lastName = userData.userDetails.last_name;
      const fullName = firstName + ' ' + lastName;
      this.setState({ user: fullName });
      const details = {
        username: fullName,
      };
      //Add user in subscriber list
      axios.post(
        apiRoute('update_opentok_subscriber'),
        details,
        requestOptions
      );
    }
    //Get session id and token
    axios
      .get(apiRoute('get_opentok_token'), requestOptions)
      .then((res) => {
        if (res.data.status == 1) {
          this.setState({
            sessionId: res.data.sessionId,
            token: res.data.token,
            teacherName: res.data.name,
            liveStatus: res.data.status,
          });
        }
        this.props.setLoading(false);
        this.getSessionId();
      })
      .catch((error) => {
        this.getSessionId();
        this.props.setLoading(false);
      });

    this.subscriberIntervalID = setInterval(() => {
      const requestOptions = {
        headers: getApiHeader(true),
      };
      //Get all subscriber list
      axios
        .get(apiRoute('get_all_stream_subscriber'), requestOptions)
        .then((res) => {
          this.setState({ subscriberList: res.data.subscriers });
        });
    }, 5000);
  }

  onSessionError = (error) => {
    this.setState({ error });
  };

  onPublish = () => {
    console.log('Publish Success');
  };

  onPublishError = (error) => {
    this.setState({ error });
  };

  toggleVideo = () => {
    this.setState((state) => ({
      publishVideo: !state.publishVideo,
    }));
  };

  getSessionId() {
    //Check new stream status
    this.sessionIntervalID = setInterval(() => {
      if (!this.state.sessionId) {
        const requestOptions = {
          headers: getApiHeader(true),
        };
        axios.get(apiRoute('get_opentok_token'), requestOptions).then((res) => {
          if (res.data.status == 1) {
            this.setState({
              sessionId: res.data.sessionId,
              token: res.data.token,
              teacherName: res.data.name,
              liveStatus: res.data.status,
            });
          }
        });
      }
    }, 5000);
  }
  onSubscribe = () => {
    console.log('Subscribed sucessfully');
    this.setState({ startStream: true });
  };

  componentWillUnmount() {
    clearInterval(this.subscriberIntervalID);
    clearInterval(this.sessionIntervalID);
    const requestOptions = {
      headers: getApiHeader(true),
    };

    const details = {
      username: this.state.user,
    };
    axios.post(apiRoute('remove_opentok_subscriber'), details, requestOptions);
  }

  setAudio = (audio) => {
    this.setState({ audio });
  };

  setVideo = (video) => {
    this.setState({ video });
  };

  toggleFullSreen = () => {
    var elem = document.querySelector('video');
    if (!elem.fullscreenElement) {
      elem.webkitRequestFullScreen().catch((err) => {
        alert('Error attempting to enable full-screen mode');
      });
    }else if(!elem.webkitRequestFullscreen){
      elem.webkitRequestFullscreen().catch((err) => {
        alert('Error attempting to enable full-screen mode');
      });
    } else {
      elem.exitFullscreen();
    }
  };

  render() {
    const apiKey = '46066492';
    const { sessionId, token } = this.state;
    return (
      <>
        <div className='broadcast-header'>
          {this.state.liveStatus == 0 ? (
            <h4 className='user-name mb-0'>
              Welcome to Sattva Connect Live Streaming, Waiting for stream to
              start.
            </h4>
          ) : (
            <h4 className='user-name mb-0'>
              Welcome to Sattva Connect Live Streaming, {this.state.teacherName}{' '}
              is Online
            </h4>
          )}
        </div>
        <div className='row m-0'>
          <div className='col-lg-7 col-md-6 broadcast-left text-center'>
            <div className='broadcast-btns'></div>
            {sessionId ? (
              <OTSession
                apiKey={apiKey}
                sessionId={sessionId}
                token={token}
                onError={this.onSessionError}
                eventHandlers={this.sessionEventHandlers}
              >
                <OTStreams>
                  <OTSubscriber
                    properties={{
                      width: '100%',
                      height: '100%',
                      insertMode: 'append',
                    }}
                    retry={true}
                    onSubscribe={this.onSubscribe}
                    onError={this.onSubscribeError}
                    eventHandlers={this.subscriberEventHandlers}
                    ref={this.otSubscriber}
                    restrictFrameRate={true}
                  />
                </OTStreams>
              </OTSession>
            ) : null}
            <div className='subscriber-btns'>
              {this.state.startStream ? (
                <a onClick={this.toggleFullSreen}>
                  <i className='fas fa-expand-arrows-alt fullScreenBtn'></i>
                </a>
              ) : null}
            </div>
          </div>
          <div className='col-lg-2 col-md-2 broadcast-middle'>
            <div className='broadcast-logo my-2'>
              <img src='../images/footer_logo.png' alt='' />
            </div>
            <Accordion className='viwerList' allowZeroExpanded={true}>
              <AccordionItem>
                <AccordionItemHeading className='viwerListHeader'>
                  <AccordionItemButton>
                    Online viewers{' '}
                    <span className='new badge'>
                      {this.state.subscriberList.length}
                    </span>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {this.state.subscriberList.map((item, index) => {
                    return (
                      <p className='text-success' key={index}>
                        {item}
                      </p>
                    );
                  })}
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
            <h4 className='mb-0'>
              Online viewers{' '}
              <span className='new badge'>
                {this.state.subscriberList.length}
              </span>
            </h4>
            <div className='broadcastUserList'>
              {this.state.subscriberList.map((item, index) => {
                return (
                  <p className='text-success' key={index}>
                    {item}
                  </p>
                );
              })}
            </div>
          </div>
          <Chat userType='0' />
        </div>
      </>
    );
  }
}

export default JoinLive;
