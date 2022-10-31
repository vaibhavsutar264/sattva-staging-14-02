import React, { Component } from 'react';
import io from 'socket.io-client';

let socket;
export default class ChatClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: '',
    };
  }
  componentDidMount() {
    const ENDPOINT = 'https://courses.sattvaconnect.com:9001';
    const name = 'Harshit singh';
    const room = 'Live stream';
    socket = io.connect(ENDPOINT, { transport: ['websocket'] });
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
    socket.on('disconnect', () => {
      socket.connect();
    });
    socket.on('message', (message) => {
      console.log(message);
      const allMessages = [...this.state.messages, this.state.message];
      this.setState({ messages: allMessages });
    });

    socket.on('roomData', ({ users }) => {
      console.log(users);
    });
  }
  onChange = (e) => {
    this.setState({ message: e.target.value });
  };

  socketOpen = (ws) => {
    return ws.readyState === ws.OPEN;
  };

  sendMessage = (event) => {
    console.log('Hello');
    event.preventDefault();
    if (!this.socketOpen(socket)) {
      socket.connect();
    }

    if (this.state.message) {
      socket.emit('sendMessage', this.state.message, () =>
        console.log('Message sent')
      );
    }
  };
  render() {
    return (
      <div>
        <input
          type='text'
          value={this.state.message}
          onChange={(e) => {
            this.onChange(e);
          }}
        />
        <button
          onClick={(e) => {
            this.sendMessage(e);
          }}
        >
          Send
        </button>
      </div>
    );
  }
}
