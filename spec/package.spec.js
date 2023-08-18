// Pretty Print JSON
// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import fs from 'fs';

////////////////////////////////////////////////////////////////////////////////
describe('The "docs" folder', () => {

   it('contains the correct files', () => {
      const removeHash = (filename) => filename.replace(/[.][0-9a-f]{8}[.]/, '.');
      const actual = fs.readdirSync('docs').map(removeHash).sort();
      const expected = [
         'CNAME',
         'graphics',
         'index.html',
         'libraries.css',
         'libraries.js',
         'web-app.css',
         'web-app.js',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   });
