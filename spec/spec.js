// Mocha Specification Cases

const assert =    require('assert');
const { JSDOM } = require('jsdom');

const url  = 'http://localhost:7777/';
let window, $;
function loadWebPage(done) {
   function handleWebPage(dom) {
      function waitForScripts() {
         window = dom.window;
         $ = window.jQuery;
         console.log();
         done();
         }
      dom.window.onload = waitForScripts;
      }
   const options = { resources: 'usable', runScripts: 'dangerously' };
   console.log('Loading web page into jsdom...');
   JSDOM.fromURL(url, options).then(handleWebPage);
   }
function closeWebPage() {
   window.close();
   }
before(loadWebPage);
after(closeWebPage);

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The web page', () => {

   it('has the correct URL: ' + url, () => {
      assert.equal(window.location.href, url);
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
