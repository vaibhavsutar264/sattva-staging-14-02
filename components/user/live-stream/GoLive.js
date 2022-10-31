import React, { Component } from 'react';
import axios from 'axios';
import { apiRoute, getApiHeader } from '../../../utils/helpers';
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
import { getUserId } from '../../../utils/helpers';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

class GoLive extends Component {
  intervalID = 0;
  constructor(props) {
    super(props);
    this.OtPublisherRef = React.createRef();
    this.otSessionRef = React.createRef();
    this.state = {
      error: null,
      connection: 'Connecting',
      publishVideo: true,
      sessionId: '',
      token: '',
      startStream: false,
      showStatusBtn: false,
      messageList: [],
      id: '',
      subcriberCount: 0,
      subscriberList: [],
      audioInputs: null,
      currentIndex: 0,
      loading: true,
    };
    this.sessionEventHandlers = {
      sessionConnected: () => {
        this.setState({ connection: 'Connected', showStatusBtn: true });
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
      connectionCreated: (obj) => {
        console.log('Stream Created');
      },

      connectionDestroyed: (obj) => {
        console.log('Stream Destroyed');
      },
    };

    this.publisherEventHandlers = {
      accessDenied: () => {
        console.log('User denied access to media source');
      },
      streamCreated: () => {
        console.log('Publisher stream created');
        const requestOptions = {
          headers: getApiHeader(true),
        };
        axios
          .get(
            apiRoute('update_stream_status/' + this.state.sessionId + '/' + 1),
            requestOptions
          )
          .then((res) => {
            console.log('Status updated success');
            console.log('heiii');
            console.log(res);

          });
      },
      streamDestroyed: ({ reason }) => {
        console.log(`Publisher stream destroyed because: ${reason}`);
        const requestOptions = {
          headers: getApiHeader(true),
        };
        axios
          .get(
            apiRoute('update_stream_status/' + this.state.sessionId + '/' + 0),
            requestOptions
          )
          .then((res) => {
            console.log('Status updated success');
            console.log(res);
          });
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
    this.onSessionError = this.onSessionError.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const userId = getUserId();

    this.setState({ loading: true });

    const requestOptions = {
      headers: getApiHeader(true),
    };
    //Get sission and tokn
    axios
      .get(apiRoute('get_opentok_session/' + userId), requestOptions)
      .then((res) => {
        this.setState({ sessionId: res.data.sessionId, token: res.data.token });
        this.setState({ loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
    let audioDevices = JSON.parse(localStorage.getItem('audioVevices'));
    this.setState({ audioInputs: audioDevices });
    this.intervalID = setInterval(() => {
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

  componentWillUnmount() {
    clearInterval(this.intervalID);
    const requestOptions = {
      headers: getApiHeader(true),
    };
    //Update steam status
    axios
      .get(
        apiRoute('update_stream_status/' + this.state.sessionId + '/' + 0),
        requestOptions
      )
      .then((res) => {
        console.log('Status updated success');
      });
  }

  onSessionError(error) {
    this.setState({ error });
  }

  onPublish = () => {
    console.log(this.otSessionRef);
    console.log('Publish Success');
  };

  onPublishError = (error) => {
    console.log(error);
    //if (this.OtPublisherRef.current !== null) {
    //	this.OtPublisherRef.current.destroy();
    //	}
    this.setState({ error });
  };

  onSubscribe = () => {
    console.log('Subscribe Success');
  };

  onSubscribeError = (error) => {
    this.setState({ error });
  };

  toggleVideo = () => {
    this.setState((state) => ({
      publishVideo: !state.publishVideo,
    }));
  };

  toggleStream = () => {
    console.log(this.state);
    this.setState((state) => ({
      startStream: !state.startStream,
    }));
    if (this.state.startStream) {
      this.otSessionRef.sessionHelper.disconnect(this.state.sessionId);
      // this.OtPublisherRef.current.destroy();
      setTimeout(function () {
        window.location.reload();
      }, 3000);
    }
  };
  toggleCamera = () => {
    console.log(this.OtPublisherRef.current.state.publisher.cycleVideo());
    console.log(this.otSessionRef);
    console.log(this.OtPublisherRef);
    console.log('Publish Success');
  };

  toggleAudio = () => {
    this.setState({ currentIndex: this.state.currentIndex + 1 });

    console.log(this.state.currentIndex);
    let deviceId = this.state.audioInputs[
      this.state.currentIndex % this.state.audioInputs.length
    ].deviceId;
    this.OtPublisherRef.current.state.publisher.setAudioSource(deviceId);
  };
  recreateSeeeion = () => {
    this.setState({ loading: true });
    const requestOptions = {
      headers: getApiHeader(true),
    };
    //Recreate session
    axios.get(apiRoute('get_opentok_session'), requestOptions).then((res) => {
      this.setState({ sessionId: res.data.sessionId, token: res.data.token });
      this.setState({ loading: false });
      this.toggleStream();
    });
  };

  toggleFullSreen = () => {
    var elem = document.querySelector('video');

    if (!document.fullscreenElement) {
      elem.webkitRequestFullscreen().catch((err) => {
        alert('Error attempting to enable full-screen mode');
      });
    } else {
      document.exitFullscreen();
    }
  };

  render() {
    const apiKey = '46066492';
    const { sessionId, token, startStream, showStatusBtn } = this.state;
    const { error, connection, publishVideo } = this.state;

    return (
      <>
        <div className='col-lg-7 col-md-6 broadcast-left text-center'>
          {sessionId ? (
            <OTSession
              apiKey={apiKey}
              sessionId={sessionId}
              token={token}
              onError={this.onSessionError}
              eventHandlers={this.sessionEventHandlers}
              ref={(instance) => {
                this.otSessionRef = instance;
              }}
            >
              {startStream ? (
                <OTPublisher
                  properties={{
                    width: '100%',
                    height: '100%',
                    resolution: '1280x720',
                    insertMode: 'append',
                    name: 'Sattvaconnect stream',
                    frameRate: 30,
                  }}
                  onPublish={this.onPublish}
                  onError={this.onPublishError}
                  eventHandlers={this.publisherEventHandlers}
                  ref={this.OtPublisherRef}
                />
              ) : null}
            </OTSession>
          ) : null}
          <div className='broadcast-btns strm-ctrl-btn'>
            {showStatusBtn ? (
              <a
                className={
                  startStream
                    ? 'btn btn-sm btn-danger'
                    : 'btn btn-sm btn-success'
                }
                onClick={this.toggleStream}
              >
                {startStream ? 'Stop Stream' : 'Start Stream'}
              </a>
            ) : null}
            {/* {startStream ?<a className="btn btn-sm btn-primary"  onClick={this.recreateSeeeion}>New Room</a>: null}
					{startStream ?  <a className="btn btn-sm btn-danger" onClick={this.toggleVideo}>{publishVideo ? 'Disable' : 'Enable'}</a>: null} */}
            {startStream ? (
              <a className='btn btn-sm btn-primary' onClick={this.toggleCamera}>
                Switch camera{' '}
              </a>
            ) : null}
            {startStream ? (
              <a className='btn btn-sm btn-primary' onClick={this.toggleAudio}>
                Switch Microphone{' '}
              </a>
            ) : null}
            {startStream ? (
              <a onClick={this.toggleFullSreen}>
                <i className='fa fa-expand fullScreenBtn'></i>
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
      </>
    );
  }
}

export default GoLive;
