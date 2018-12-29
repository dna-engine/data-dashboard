// Mocha Specification Cases

// Imports
const assert =    require('assert').strict;
const express =   require('express');
const http =      require('http');
const { JSDOM } = require('jsdom');

// Setup
const port =      6868 + 1;  //+1 to prevent conflict
const url  =      'http://localhost:' + port + '/web-target/dist/';
const webServer = http.createServer(express().use(express.static('.')));
let window, $;  //jshint ignore:line
const start = Date.now();
const log = (msg) => console.log((Date.now() - start + '').padStart(4, '0'), msg);
const startWebServer = (callback) => {
   const handleServerReady = () => {
      log('Running on port #' + webServer.address().port);
      callback();
      };
   log('Starting web server for mocha');
   webServer.listen(port, handleServerReady);
   };
const loadWebPage = (done) => {
   const handleWebPage = (dom) => {
      const waitForScripts = () => {
         log('Scripts loaded\n');
         window = dom.window;
         $ = window.jQuery;
         done();
         };
      dom.window.onload = waitForScripts;
      };
   const load = () => {
      const options = { resources: 'usable', runScripts: 'dangerously' };
      log('Loading web page into jsdom');
      log(url);
      JSDOM.fromURL(url, options).then(handleWebPage);
      };
   startWebServer(load);
   };
const closeWebPage = () => {
   window.close();
   webServer.close();
   };
before(loadWebPage);
after(closeWebPage);

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The web page', () => {

   it('has the correct URL: ' + url, () => {
      const actual =   { url: window.location.href };
      const expected = { url: url };
      assert.deepEqual(actual, expected);
      });

   it('has the correct title', () => {
      const actual =   { title: window.document.title };
      const expected = { title: 'DataDashboard' };
      assert.deepEqual(actual, expected);
      });

   it('has exactly one header, main, and footer', () => {
      const actual =   {
         header: $('body >header').length,
         main:   $('body >main').length,
         footer: $('body >footer').length
         };
      const expected = { header: 1, main: 1, footer: 1 };
      assert.deepEqual(actual, expected);
      });

   });
