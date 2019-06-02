// Mocha Specification Cases

// Imports
const assert =          require('assert').strict;
const { JSDOM } =       require('jsdom');
const serverListening = require('server-listening');

// Setup
process.env.webRoot = process.env.webRoot || 'build/1-staging';
serverListening.setPort({ flush: require.resolve('../server') });
const server = require('../server');
const url = 'http://localhost:' + server.address().port + '/';
let dom;
before(() => serverListening.ready(server)
   .then(() => JSDOM.fromURL(url, { resources: 'usable', runScripts: 'dangerously' }))
   .then(serverListening.jsdomOnLoad)
   .then((jsdom) => dom = jsdom)
   );
after(() => serverListening.jsdomCloseWindow(dom).then(() => serverListening.close(server)));

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The web page', () => {

   it('has the correct URL: ' + url, () => {
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
      const actual =   {
         header: dom.window.$('body >header').length,
         main:   dom.window.$('body >main').length,
         footer: dom.window.$('body >footer').length
         };
      const expected = { header: 1, main: 1, footer: 1 };
      assert.deepEqual(actual, expected);
      });

   });
