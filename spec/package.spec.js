// Pretty Print JSON
// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { readdirSync } from 'fs';

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The "docs" folder', () => {

   it('contains the correct files', () => {
      const removeHash = (filename) => filename.replace(/[.][0-9a-f]{8}[.]/, '.');
      const actual = readdirSync('docs').sort().map(removeHash);
      const expected = [
         'CNAME',
         'app.bundle.css',
         'app.bundle.js',
         'graphics',
         'index.html',
         'libraries.js',
         'libraries.css',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   });
