// DataDashboard
// Web Server

import express from 'express';
import { Server } from 'http';
import { AddressInfo } from 'net';

const webServerDefault = {
   folder: 'docs',
   port:   7531,
   };

const webServer = {
   start(): Server {
      const folder = () => process.env.webFolder || webServerDefault.folder;
      const port = () =>   process.env.port || webServerDefault.port;
      const devMode = {
         setHeaders: (response: express.Response) => response.setHeader('Connection', 'close'),  //disable Keep-Alive for jsdom
         etag:       false  //always server fresh files (avoids 304 Not Modified for html files)
         };
      const webServerInst = express().use(express.static(folder(), devMode)).listen(port());
      const msg = { start: '  --- server listening on port:', close: '  --- server shutdown' };
      const getInfo = () => <AddressInfo>webServerInst.address();
      webServerInst.on('listening', () => console.log(msg.start, getInfo().port, folder()));
      webServerInst.on('close',     () => console.log(msg.close));
      return webServerInst;
      },
   };

export { webServer };
