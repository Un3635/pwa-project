const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const path = require('path');

const staticPath = './';
const options = {
  key: fs.readFileSync('ssh_key.pem'),
  cert: fs.readFileSync('ssh_cert.pem')
}
https.createServer(options, function(req, res){

  res.writeHead(200);

  res.end('hello https');

}).listen(1106);
// app.use(express.static(path.resolve(__dirname, staticPath)))
// app.listen('1106', () => {
//   // console.log(path.resolve(__dirname, staticPath));
//   // console.log(path.join(__dirname, staticPath));
//   console.log('1106 success');
// })
// const Koa = require('koa');
// const Static = require('koa-static');
// const path = require('path');  

// const app = new Koa();
// const staticPath = './';

// app.use(Static(path.resolve(__dirname, staticPath)));

// app.listen(1105);