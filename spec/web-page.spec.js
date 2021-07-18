// Mocha Specification Suite

// Imports
import puppeteer from 'puppeteer';
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { browserReady } from 'puppeteer-browser-ready';

// Setup
const webFolder = process.env.webFolder || 'build/step1-staging/';
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

////////////////////////////////////////////////////////////////////////////////////////////////////
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

   it('has exactly one header, main, and footer', () => {
      const actual =   {
         header: web.$('body >header').length,
         main:   web.$('body >main').length,
         footer: web.$('body >footer').length,
         };
      const expected = { header: 1, main: 1, footer: 1 };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The document content', () => {

   it('has no 🚀 traveling to 🪐!', () => {
      const actual =   { '🚀': !!web.html.match(/🚀/g), '🪐': !!web.html.match(/🪐/g) };
      const expected = { '🚀': false,                   '🪐': false };
      assertDeepStrictEqual(actual, expected);
      });

   });
