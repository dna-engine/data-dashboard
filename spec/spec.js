// Mocha Specification Cases

// Imports
const assert =          require('assert').strict;
const { JSDOM } =       require('jsdom');
const serverListening = require('server-listening');

// Setup
process.env.target = process.env.target || 'web-target/staging';
serverListening.setPort({ flush: require.resolve('../server') });
const server = require('../server');
const url = 'http://localhost:' + server.address().port + '/';
before(() => serverListening.ready(server)
   .then(() => JSDOM.fromURL(url, { resources: 'usable', runScripts: 'dangerously' }))
   .then(serverListening.handleDom)  //set window and $ for use in specification cases
   );
after(() => serverListening.close(server).then(serverListening.deleteDom));

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
