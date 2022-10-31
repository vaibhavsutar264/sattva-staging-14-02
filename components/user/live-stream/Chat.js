import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { getLocalStorageAuth } from '../../../utils/helpers';
import Picker, {
  SKIN_TONE_MEDIUM_DARK,
  SKIN_TONE_MEDIUM_LIGHT,
} from 'emoji-picker-react';
import Moment from 'react-moment';
import ReactTooltip from 'react-tooltip';
import { animateScroll } from 'react-scroll';

let socket;

export default function Chat({ userType }) {
  const auth = getLocalStorageAuth();
  const user = auth.userDetails;
  const fillName = user.first_name + ' ' + user.last_name;
  const [name, setName] = useState(fillName);
  const [room, setRoom] = useState('Live stream');
  const [clearChatCode, setclearChatCode] = useState(
    'clearAllSattvaConnectChat108'
  );
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = '';
  const [showEmojies, setshowEmojies] = useState(false);
  const [showSettings, setshowSettings] = useState(false);
  const [autoScroll, setautoScroll] = useState(true);
  const messagesEndRef = useRef(null);
  const messagesInput = useRef(null);

  useEffect(() => {
    socket = io.connect(ENDPOINT, { transport: ['websocket'] });
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
    socket.on('disconnect', () => {
      socket.connect();
    });
  }, [ENDPOINT, name]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);

      console.log(messages);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const socketOpen = (ws) => {
    return ws.readyState === ws.OPEN;
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (!socketOpen(socket)) {
      socket.connect();
    }
    //  if (socketOpen(socket)){
    //     socket.disconnect();
    //  }
    setMessage('');
    const encodedMsg = btoa(unescape(encodeURIComponent(message)));
    if (message) {
      socket.emit('sendMessage', encodedMsg, () => console.log('Message sent'));
    }
    setshowEmojies(false);
  };

  const onEmojiClick = (event, emojiObject) => {
    event.preventDefault();
    setshowEmojies(false);
    const messageValue = messagesInput.current.value;
    const newMessage = messageValue + emojiObject.emoji;
    setMessage(newMessage);
  };

  const scrollToBottom = () => {
    if (autoScroll) {
      // messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
      animateScroll.scrollToBottom({
        containerId: 'chatMessages',
        duration: 500,
        smooth: true,
      });
    }
  };

  const getShortWord = (str) => {
    var matches = str.match(/\b(\w)/g);
    var acronym = matches.join('');
    return acronym;
  };

  const clearAllChat = (e) => {
    setMessages([]);
    socket.emit('sendMessage', clearChatCode, () =>
      console.log('Message sent')
    );
  };

  const hamdleEmoji = () => {
    setshowEmojies(!showEmojies);
  };

  const hamdleSetting = () => {
    setshowSettings(!showSettings);
  };

  const hamdleAutoScroll = () => {
    setautoScroll(!autoScroll);
  };

  const decodeMessage = (msg) => {
    try {
      const newMsg = decodeURIComponent(escape(window.atob(msg)));
      return newMsg;
    } catch (e) {
      return msg;
    }
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className='col-lg-3 col-md-4 broadcast-right pl-0'>
      <div className='broadcast-chat-header'>
        {userType == 1 ? (
          <div className='text-right my-2 btnClear'>
            <a className='btn btn-sm' onClick={clearAllChat}>
              <i className='far fa-trash-alt'></i> Clear
            </a>
          </div>
        ) : (
          ''
        )}
        <div className='settingBlock'>
          <a
            onClick={hamdleSetting}
            data-html={true}
            data-for='custom-color-no-arrow'
            data-tip='Settings'
          >
            <img src='../images/settings.svg' />
          </a>
          <ReactTooltip
            id='custom-color-no-arrow'
            className='react-tooltip'
            delayHide={1000}
            textColor='#FFF'
            backgroundColor='#000'
            effect='solid'
          />
        </div>
        {showSettings && (
          <div className='settingList'>
            <div className='checkbox'>
              <input
                onChange={hamdleAutoScroll}
                id='autoscroll'
                type='checkbox'
                name='autoscroll'
                value='autoscroll'
                checked={autoScroll}
              />
              <label htmlFor='autoscroll'>Auto Scroll</label>
            </div>
          </div>
        )}
        <h4>
          Sattva Connect <span>WISDOM. YOGA. MEDITATION.</span>
        </h4>
      </div>
      <div className='broadcast-chat-box'>
        <ul className='chat-ul' id='chatMessages'>
        <p>Namaste Members, Chat is under maintenance, It will be back soon.</p>
        <p>Thank you for your patience and support 🙏</p>
          {/* {messages.map((item, index) => {
            const decodedMsg = decodeMessage(item.text);
            if (decodedMsg == clearChatCode) {
              setMessages([]);
            } else {
              return (
                <li key={index}>
                  <div className='user-icon userP'>
                    {getShortWord(item.user)}
                  </div>
                  <div className='user-content'>
                    <h6>
                      {item.user}
                      <span className='chat-duration'>
                        {' '}
                        <Moment fromNow>{item.time}</Moment>
                      </span>
                    </h6>
                    <p>{decodedMsg}</p>
                  </div>
                </li>
              );
            }
          })} */}
          {/* <div  ref={messagesEndRef} /> */}
        </ul>
        <div className='chat-message'>
          {/* {showEmojies == true ? (
            <>
              <a
                onClick={hamdleEmoji}
                data-html={true}
                data-for='custom-color-no-arrow'
                data-tip='Close'
              >
                <i class='fa fa-close'></i>{' '}
              </a>
              <ReactTooltip
                id='custom-color-no-arrow'
                className='react-tooltip'
                delayHide={1000}
                textColor='#FFF'
                backgroundColor='#000'
                effect='solid'
              />
            </>
          ) : (
            <>
              <a
                onClick={hamdleEmoji}
                data-html={true}
                data-for='custom-color-no-arrow'
                data-tip='Emoticons'
              >
                <img src='../images/smiling.png' />
              </a>
              <ReactTooltip
                id='custom-color-no-arrow'
                className='react-tooltip'
                delayHide={1000}
                textColor='#FFF'
                backgroundColor='#000'
                effect='solid'
              />
            </>
          )} */}
          {/* <textarea
            ref={messagesInput}
            id='textarea1'
            className='materialize-textarea'
            rows='3'
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={(event) =>
              event.key === 'Enter' ? sendMessage(event) : null
            }
            value={message}
          ></textarea>
          <button
            type='button'
            className='btn'
            onClick={(event) => sendMessage(event)}
          >
            <i className='far fa-paper-plane'></i>
          </button> */}
          {/* <textarea id="textarea1" className="materialize-textarea" rows="3"  onChange={(event) => setMessage(event.target.value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}  value={message}></textarea>
                    <button type="button" className="btn" onClick={event => sendMessage(event)}><i className="far fa-paper-plane"></i></button> */}
        </div>
        {showEmojies && (
          <div className='emojiWrapper'>
            <Picker
              onEmojiClick={onEmojiClick}
              disableAutoFocus={true}
              disableSkinTonePicker={true}
              skinTone={SKIN_TONE_MEDIUM_LIGHT}
              groupNames={{ smileys_people: 'PEOPLE' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
