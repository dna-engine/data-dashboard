// DataDashboard
// Web Server

// Imports
const express = require('express');

// Setup
const webRoot = process.env.webRoot || 'docs';
const port =    process.env.port || 7531;

// Server
const devMode = {
   setHeaders: (response) => response.setHeader('Connection', 'close'),  //disable Keep-Alive for jsdom
   etag:       false  //always server fresh files (avoids 304 Not Modified for html files)
   };
const server = express().use(express.static(webRoot, devMode)).listen(port);

server.on('listening', () => console.log('  --- server listening on port:', server.address().port, webRoot));
server.on('close',     () => console.log('  --- sever shutdown'));

// Module
module.exports = server;
