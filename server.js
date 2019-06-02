// DataDashboard Web Server

// Imports
const express = require('express');

// Setup
const webRoot = process.env.webRoot || 'docs';
const port =    process.env.port || 6868;  //DataDashboard -> DD -> 68 68 -> 6868

// Server
const disableKeepAlive = { setHeaders: (response) => response.setHeader('Connection', 'close') };
const server = express().use(express.static(webRoot, disableKeepAlive)).listen(port);
server.on('listening', () => console.log('  --- server listening on port:', server.address().port, webRoot));
server.on('close',     () => console.log('  --- sever shutdown'));

// Module
module.exports = server;
