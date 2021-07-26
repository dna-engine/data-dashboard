// DataDashboard ~~ MIT License
// Rollup Configuration

// Imports
import { babel }  from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg        from './package.json';

// Settings
const libraryModules = ['chart.js', 'dna.js', 'fetch-json', 'pretty-print-json', 'web-ignition'];
const ignoreList =     ['CIRCULAR_DEPENDENCY', 'MISSING_NAME_OPTION_FOR_IIFE_EXPORT'];

// Utilities
const banner =    `//! ${pkg.name} v${pkg.version} ~~ ${pkg.homepage} ~~ ${pkg.license} License`;
const globalize = (map, mod) => { map[mod] = 'globalThis'; return map; };
const globals =   libraryModules.reduce(globalize, {});
const onWarn =    (warning, warn) => ignoreList.includes(warning.code) || warn(warning);

const rollup = [
   {
      input:    'build/step1-tsc/web-app/ts/app.js',
      external: libraryModules,
      onwarn:   onWarn,
      plugins:  [babel({ babelHelpers: 'bundled' })],
      output: [
         {
            file:    'build/step2-staging/web-app/app.bundle.js',
            globals: globals,
            format:  'iife',
         },
         {
            file:    'build/step3-minified/web-app/app.bundle.js',
            globals: globals,
            format:  'iife',
            banner:  banner,
            plugins: [terser({ format: { comments: 'all' } })],
         },
      ],
   },
];

export default rollup;
