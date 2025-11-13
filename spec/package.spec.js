// data-dashboard
// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { revWebAssets } from 'rev-web-assets';
import fs from 'fs';

////////////////////////////////////////////////////////////////////////////////
describe('The "docs" folder', () => {

   it('contains the correct files', () => {
      const actual = fs.readdirSync('docs').map(revWebAssets.stripHash).sort();
      const expected = [
         'CNAME',
         'about',
         'assets',
         'index.html',
         'libraries.css',
         'libraries.js',
         'robots.txt',
         'style.css',
         'web-app.css',
         'web-app.js',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   });
