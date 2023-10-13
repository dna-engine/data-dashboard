// DataDashboard ~~ MIT License
// Web Server
// Options: NODE_ENV, webFolder, webPort

// Imports
import { browserReady } from 'puppeteer-browser-ready';
import fs   from 'fs';
import open from 'open';
import path from 'path';

// Configuration
const config = {
   webFolder:   'docs',
   webPort:     7531,
   openBrowser: false,
   };

// Setup
const webFolder =   process.env.webFolder ?? config.webFolder;
const webPort =     process.env.webPort   ?? config.webPort;  //set to 0 to automatically select open port
const openBrowser = process.env.openBrowser ? process.env.openBrowser === 'true' : config.openBrowser;
const pkg =         JSON.parse(fs.readFileSync('package.json', 'utf-8'));

// Start
console.log(pkg.name);
console.log(pkg.description);
console.log('Web root:', path.resolve(webFolder));
const startWebServer = async () => {
   const http = await browserReady.startWebServer({ folder: webFolder, port: webPort });
   console.log('URL:', http.url);
   if (openBrowser)
      open(http.url);
   };
startWebServer();
