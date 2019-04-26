// DataDashboard Web Server

// Imports
const express = require('express');

// Setup
const target =     process.env.target || 'docs';
const port =       process.env.port || 6868;  //DataDashboard -> DD -> 68 68 -> 6868
const startupMsg = '--- Server listening on port:';

// Server
const disableKeepAlive = { setHeaders: (response) => response.setHeader('Connection', 'close') };
const server = express().use(express.static(target, disableKeepAlive)).listen(port);
server.on('listening', () => console.log(startupMsg, server.address().port, target));

// Integration
module.exports = server;
