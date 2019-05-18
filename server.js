// DataDashboard Web Server

// Imports
const express = require('express');

// Setup
const target =     process.env.target || 'docs';
const port =       process.env.port || 6868;  //DataDashboard -> DD -> 68 68 -> 6868

// Server
const disableKeepAlive = { setHeaders: (response) => response.setHeader('Connection', 'close') };
const server = express().use(express.static(target, disableKeepAlive)).listen(port);
server.on('listening', () => console.log('  --- server listening on port:', server.address().port, target));
server.on('close',     () => console.log('  --- sever shutdown'));

// Module
module.exports = server;
