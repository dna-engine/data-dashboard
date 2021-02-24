// DataDashboard
// Web Server

import express from 'express';

const webServer = {
   start() {
      const webFolder = () => process.env.webFolder || 'docs';
      const port = () =>      process.env.port || 7531;
      const devMode = {
         setHeaders: (response) => response.setHeader('Connection', 'close'),  //disable Keep-Alive for jsdom
         etag:       false  //always server fresh files (avoids 304 Not Modified for html files)
         };
      const webServerInst = express().use(express.static(webFolder(), devMode)).listen(port());
      const msg = { start: '  --- server listening on port:', close: '  --- server shutdown' };
      webServerInst.on('listening', () => console.log(msg.start, webServerInst.address().port, webFolder()));
      webServerInst.on('close',     () => console.log(msg.close));
      return webServerInst;
      },
   };

export { webServer };
