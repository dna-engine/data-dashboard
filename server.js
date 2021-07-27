// DataDashboard ~~ MIT License
// Web Server

// Imports
import open             from 'open';
import { browserReady } from 'puppeteer-browser-ready';
import { readFileSync } from 'fs';

// Setup
const prodMode =  process.env.NODE_ENV === 'production';
const webFolder = process.env.webFolder || 'build/step2-staging/web-app';
const webPort =   process.env.webPort || 0;
const pkg =       JSON.parse(readFileSync('./package.json'));

// Start
console.log(pkg.name);
console.log(pkg.name.replace(/./g, '='));
console.log(pkg.description);
console.log('Mode:    ', process.env.NODE_ENV ?? 'development');
console.log('Web root:', webFolder);
const startWebServer = async () => {
   const http = await browserReady.startWebServer({ folder: webFolder, port: webPort });
   if (!prodMode)
      open(http.url);
   };
startWebServer();
