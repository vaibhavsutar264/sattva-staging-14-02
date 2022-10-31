const https = require('https');
const next = require('next');
const fs = require('fs');
const cors = require('cors');
const express = require('express');
const http = require('http');

const {addUser, removeUser, getUser, getUsersInRoom,} = require('./user');  


const dev = false;
const app = next({ dev });
const handle = app.getRequestHandler();
const httpsPort = 443;
const httpPort = 80;
var credentials = {
  key: fs.readFileSync('/etc/apache2/ssl/final-copy/server.key'),
  cert: fs.readFileSync('/etc/apache2/ssl/final-copy/sattvastaging_website.crt'),
  ca: [fs.readFileSync('/etc/apache2/ssl/final-copy/sattvastaging_website.ca-bundle')],
//  password:'1234',
};

app.prepare().then(() => {
  const server = express();

  server.use(cors());

  server.get('/app', (req, res) => {
    res.writeHead(301, { Location: '/app/index.html' });
    return res.end();
  });

  server.get('/iosapp', (req, res) => {
    res.writeHead(301, { Location: '/iosapp/index.html' });
    return res.end();
  });

  server.get('*', (req, res) => handle(req, res));

 https.createServer(credentials, server).listen(httpsPort, (err) => {
    if (err) throw err;
    console.log(`> HTTPS Ready on https://localhost:${httpsPort}`);
  });

  

}).catch(error => { console.log(error)});

http
  .createServer(function (req, res) {
    res.writeHead(301, {
      Location: 'https://' + req.headers['host'] + req.url,
    });
    res.end();
  })
  .listen(httpPort, (err) => {
    if (err) throw err;
    console.log(`> HTTP Ready on http://localhost:${httpPort}`);
  });
