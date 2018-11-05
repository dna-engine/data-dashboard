// Mocha Specification Cases

const assert =    require('assert').strict;
const express =   require('express');
const http =      require('http');
const { JSDOM } = require('jsdom');

const port = 6868 + 1;  //+1 to prevent conflict
const url  = 'http://localhost:' + port + '/web-target/dist/';
const webServer = http.createServer(express().use(express.static('.')));
let window, $;

function startWebServer(callback) {
   function handleServerReady() {
      console.log('   running on port #' + webServer.address().port);
      callback();
      }
   console.log('Starting web server for mocha...');
   webServer.listen(port, handleServerReady);
   }
function loadWebPage(done) {
   function handleWebPage(dom) {
      function waitForScripts() {
         window = dom.window;
         $ = window.jQuery;
         console.log('   done\n');
         done();
         }
      dom.window.onload = waitForScripts;
      }
   function load() {
      const options = { resources: 'usable', runScripts: 'dangerously' };
      console.log('Loading web page into jsdom...');
      JSDOM.fromURL(url, options).then(handleWebPage);
      }
   startWebServer(load);
   }
function closeWebPage() {
   window.close();
   webServer.close();
   }
before(loadWebPage);
after(closeWebPage);

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The web page', () => {

   it('has the correct URL: ' + url, () => {
      const actual =   { url: window.location.href };
      const expected = { url: url };
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
