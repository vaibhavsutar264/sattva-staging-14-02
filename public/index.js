const express = require('express');
const http = require('http');
const cors = require('cors');
const moment = require('moment'); 
const https = require('https');
const fs = require('fs');

const {addUser, removeUser, getUser, getUsersInRoom,} = require('./user');
PORT = process.env.POST || 9999;

const router = require('./router');

const app = express();

app.use(cors());

app.use(router);

const ssl = {
  key: fs.readFileSync('/etc/apache2/ssl/sattvaconnect.key'),
  cert: fs.readFileSync('/etc/apache2/ssl/655f9d8553614987.crt'),
  ca: [fs.readFileSync('/etc/apache2/ssl/gd_bundle-g2-g1.crt')],
};

const server = https.createServer(ssl, app).listen(9999, () => {
                console.log('Listening...')
              });

const io = require("socket.io")(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});
const allowedOrigins = ["https://sattvaconnect.com:80","https://sattvaconnect.com:443","http://localhost:*","https://sattvaconnect.com:*","https://sattvaconnect.com*"];
io.set('origins', allowedOrigins);
 io.on('connection', (socket) => {
  let currentTime = moment().format();
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
    
        if(error) return callback(error);
    
        socket.join(user.room);
        let currentTime = moment().format();
        socket.emit('message', {time: currentTime, user: 'Sattvaconnect', text: `${user.name}, welcome to room ${user.room}.`});
        socket.broadcast.to(user.room).emit('message', {time:currentTime, user: 'admin', text: `${user.name} has joined!` });
    
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    
        callback();
      });
      
      socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        let currentTime = moment().format();
        io.to(user.room).emit('message', {time:currentTime, user: user.name, text: message });
    
        callback();
      });
    
      socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    
        if(user) {
          io.to(user.room).emit('message', { time:currentTime, user: 'Admin', text: `${user.name} has left.` });
          io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
      });
 });
