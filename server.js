// DataDashboard
// Web Server

// Imports
import express from 'express';

// Setup
const webFolder = process.env.webFolder || 'docs';
const port =      process.env.port || 7531;

// Server
const devMode = {
   setHeaders: (response) => response.setHeader('Connection', 'close'),  //disable Keep-Alive for jsdom
   etag:       false  //always server fresh files (avoids 304 Not Modified for html files)
   };
const server = express().use(express.static(webFolder, devMode)).listen(port);

server.on('listening', () => console.log('  --- server listening on port:', server.address().port, webFolder));
server.on('close',     () => console.log('  --- sever shutdown'));

// Module
export { server };
