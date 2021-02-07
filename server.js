// DataDashboard
// Web Server

// Imports
import express from 'express';

// Server
const server = {
   start() {
      const webFolder = () => process.env.webFolder || 'docs';
      const port = () =>      process.env.port || 7531;
      const devMode = {
         setHeaders: (response) => response.setHeader('Connection', 'close'),  //disable Keep-Alive for jsdom
         etag:       false  //always server fresh files (avoids 304 Not Modified for html files)
         };
      const serverInst = express().use(express.static(webFolder(), devMode)).listen(port());
      const msg = { start: '  --- server listening on port:', close: '  --- server shutdown' };
      serverInst.on('listening', () => console.log(msg.start, serverInst.address().port, webFolder()));
      serverInst.on('close',     () => console.log(msg.close));
      return serverInst;
      },
   };

// Module
export { server };
