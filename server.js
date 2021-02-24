// DataDashboard
// Web Server

import { webServer } from './build/step0-tsc/web-server/index.js';

const webServerInst = webServer.start();
console.log('open http://localhost:' + webServerInst.address().port);
