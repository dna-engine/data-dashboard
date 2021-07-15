// DataDashboard
// Web Server

// Imports
import open from 'open';
import { browserReady } from 'puppeteer-browser-ready';
import { readFileSync } from 'fs';

// Setup
const defaultWebFolder = 'docs';
const webFolder = process.env.webFolder || defaultWebFolder;
const pkg =       JSON.parse(readFileSync('./package.json'));

// Start
console.log('  DataDashboard ~~ MIT License');
console.log('  ' + pkg.description);
browserReady.startWebServer({ folder: webFolder }).then(http => open(http.url));
