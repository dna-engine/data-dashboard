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
console.info(pkg.name);
console.info(pkg.description);
console.info('Web root:', path.resolve(webFolder));
const startWebServer = async () => {
   const http = await browserReady.startWebServer({ folder: webFolder, port: webPort });
   console.info('URL:', http.url);
   if (openBrowser)
      open(http.url);
   };
startWebServer();
