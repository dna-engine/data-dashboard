const a = () => {

   const express = require('express');
   const server = express().use(express.static('web-target/dist')).listen(0);
   server.on('listening', () => console.log('--- Web server listening on port:', server.address().port));
   const url = 'http://localhost:' + server.address().port + '/';
   console.log('\n$ curl -I -X GET ' + url);

   };

const b = () => {

   const express = require('express');
   const staticOptions = { setHeaders: (response) => response.setHeader('Connection', 'close') };  //disable keep-alive
   const server = express().use(express.static('web-target/dist', staticOptions)).listen(0);
   server.on('listening', () => console.log('--- Web server listening on port:', server.address().port));
   const url = 'http://localhost:' + server.address().port + '/';
   console.log('\n$ curl -I -X GET ' + url);

   };

const c = () => {

   const http =    require('http');
   const express = require('express');
   const server = http.createServer(express().use(express.static('web-target/dist'))).listen(0);
   server.on('listening', () => console.log('--- Web server listening on port:', server.address().port));
   const url = 'http://localhost:' + server.address().port + '/';
   console.log('\n$ curl -I -X GET ' + url);

   };

a();
b();
c();
