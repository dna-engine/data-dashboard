// data-dashboard
// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { revWebAssets } from 'rev-web-assets';
import fs from 'fs';

////////////////////////////////////////////////////////////////////////////////
describe('The "docs" folder', () => {

   it('contains the correct files', () => {
      const actual = fs.readdirSync('docs').map(revWebAssets.removeHash).sort();
      const expected = [
         'CNAME',
         'assets',
         'index.html',
         'libraries.css',
         'libraries.js',
         'web-app.css',
         'web-app.js',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   });
