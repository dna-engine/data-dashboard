// Mocha Specification Cases

// Imports
import assert from 'assert';
import { serverListening } from 'server-listening';
import { JSDOM } from 'jsdom';
import { webServer } from '../src/web-server/web-server.js';

// Setup
process.env.webFolder = process.env.webFolder || 'build/step1-staging';
serverListening.setPort();
const serverInst = webServer.start();
const url = 'http://localhost:' + serverInst.address().port + '/';
const jsdomOptions = { resources: 'usable', runScripts: 'dangerously' };
let dom;
const loadWebPage = () => JSDOM.fromURL(url, jsdomOptions)
   .then(serverListening.jsdomOnLoad)
   .then(jsdom => dom = jsdom);
const closeWebPage = () => serverListening.jsdomCloseWindow(dom);
before(() => serverListening.ready(serverInst));
after(() =>  serverListening.close(serverInst));

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The web page', () => {
   before(loadWebPage);
   after(closeWebPage);

   it('has the correct URL -> ' + url, () => {
      const actual =   { url: dom.window.location.href };
      const expected = { url: url };
      assert.deepStrictEqual(actual, expected);
      });

   it('has the correct title -> "DataDashboard"', () => {
      const actual =   { title: dom.window.document.title };
      const expected = { title: 'DataDashboard' };
      assert.deepStrictEqual(actual, expected);
      });

   it('has exactly one header, main, and footer', () => {
      const $ = dom.window.$;
      const actual =   {
         header: $('body >header').length,
         main:   $('body >main').length,
         footer: $('body >footer').length,
         };
      const expected = { header: 1, main: 1, footer: 1 };
      assert.deepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The document content', () => {
   before(loadWebPage);
   after(closeWebPage);

   it('has no 🚀 traveling to 🪐!', () => {
      const html = dom.window.document.documentElement.outerHTML;
      const actual =   { '🚀': !!html.match(/🚀/g), '🪐': !!html.match(/🪐/g) };
      const expected = { '🚀': false,               '🪐': false };
      assert.deepStrictEqual(actual, expected);
      });

   });
