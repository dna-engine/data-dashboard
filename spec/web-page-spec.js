// Mocha Specification Cases

// Imports
const assert =          require('assert').strict;
const serverListening = require('server-listening');
const { JSDOM } =       require('jsdom');

// Setup
process.env.webRoot = process.env.webRoot || 'build/step1-staging';
serverListening.setPort({ flush: require.resolve('../server') });
const server = require('../server');
const url = 'http://localhost:' + server.address().port + '/';
const jsdomOptions = { resources: 'usable', runScripts: 'dangerously' };
let dom;
const loadWebPage = () => JSDOM.fromURL(url, jsdomOptions)
   .then(serverListening.jsdomOnLoad)
   .then((jsdom) => dom = jsdom);
const closeWebPage = () => serverListening.jsdomCloseWindow(dom);
before(() => serverListening.ready(server));
after(() =>  serverListening.close(server));

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The web page', () => {
   before(loadWebPage);
   after(closeWebPage);

   it('has the correct URL -> ' + url, () => {
      const actual =   { url: dom.window.location.href };
      const expected = { url: url };
      assert.deepEqual(actual, expected);
      });

   it('has the correct title', () => {
      const actual =   { title: dom.window.document.title };
      const expected = { title: 'DataDashboard' };
      assert.deepEqual(actual, expected);
      });

   it('has exactly one header, main, and footer', () => {
      const $ = dom.window.$;
      const actual =   {
         header: $('body >header').length,
         main:   $('body >main').length,
         footer: $('body >footer').length,
         };
      const expected = { header: 1, main: 1, footer: 1 };
      assert.deepEqual(actual, expected);
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
      assert.deepEqual(actual, expected);
      });

   });
