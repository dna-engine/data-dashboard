// DataDashboard
// Web Server

import { webServer } from './src/web-server/web-server.js';

const webServerInst = webServer.start();
console.log('open http://localhost:' + webServerInst.address().port);
