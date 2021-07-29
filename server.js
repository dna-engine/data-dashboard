// DataDashboard ~~ MIT License
// Web Server
// Options: NODE_ENV, webFolder, webPort

// Imports
import open             from 'open';
import { browserReady } from 'puppeteer-browser-ready';
import { readFileSync } from 'fs';

// Configuration
const config = {
   development: { web: 'build/step2-staging/web-app' },
   production:  { web: 'dist/web-app', port: 7531 },
   };

// Setup
const mode =      process.env.NODE_ENV  ?? 'development';
const webFolder = process.env.webFolder ?? config[mode].web;
const webPort =   process.env.webPort   ?? config[mode].port ?? 0;
const pkg =       JSON.parse(readFileSync('./package.json'));
const browser =   mode === 'development';

// Start
console.log(pkg.name);
console.log(pkg.name.replace(/./g, '='));
console.log(pkg.description);
console.log('Mode:    ', mode);
console.log('Web root:', webFolder);
const startWebServer = async () => {
   const http = await browserReady.startWebServer({ folder: webFolder, port: webPort });
   if (browser)
      open(http.url);
   };
startWebServer();
