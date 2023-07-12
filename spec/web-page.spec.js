// Mocha Specification Suite

// Imports
import puppeteer from 'puppeteer';
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { browserReady } from 'puppeteer-browser-ready';

// Setup
const webFolder = process.env.webFolder || 'build/2-dev/web-app/';
let http;  //fields: server, terminator, folder, url, port, verbose
let web;   //fields: browser, page, response, status, location, title, html, $
before(async () => {
   http = await browserReady.startWebServer();
   web =  await puppeteer.launch().then(browserReady.goto(http.url + webFolder));
   });
after(async () => {
   await browserReady.close(web);
   await browserReady.shutdownWebServer(http);
   });

////////////////////////////////////////////////////////////////////////////////
describe('The web page', () => {

   it('has the correct URL', () => {
      const actual =   { status: web.status, url: web.location.href };
      const expected = { status: 200,        url: http.url + webFolder };
      assertDeepStrictEqual(actual, expected);
      });

   it('has the correct title -> "DataDashboard"', () => {
      const actual =   { title: web.title };
      const expected = { title: 'DataDashboard' };
      assertDeepStrictEqual(actual, expected);
      });

   it('body has exactly one header, main, and footer', () => {
      const actual =   web.$('body >*').toArray().map(elem => elem.name);
      const expected = ['header', 'main', 'footer', 'app-widget-templates'];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The document content', () => {

   it('has no 🚀 traveling to 🪐!', () => {
      const actual =   { '🚀': !!web.html.match(/🚀/g), '🪐': !!web.html.match(/🪐/g) };
      const expected = { '🚀': false,                   '🪐': false };
      assertDeepStrictEqual(actual, expected);
      });

   });
