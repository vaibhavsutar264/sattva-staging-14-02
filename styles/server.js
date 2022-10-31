const https = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = false;
const app = next({ dev });
const handle = app.getRequestHandler();

var options = {
  key: fs.readFileSync('/etc/apache2/ssl/sattvaconnect.key'),
  cert: fs.readFileSync('/etc/apache2/ssl/655f9d8553614987.crt'),
  ca: [fs.readFileSync('/etc/apache2/ssl/gd_bundle-g2-g1.crt')],
};

app.prepare().then(() => {
  https
    .createServer(options, (req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === '/user') {
        res.writeHead(301, { Location: '/user/index.html' });
        return res.end();
      } else if (pathname === '/app') {
        res.writeHead(301, { Location: '/app/index.html' });
        return res.end();
      } else {
        handle(req, res, parsedUrl);
      }
    })
    .listen(443, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
});
