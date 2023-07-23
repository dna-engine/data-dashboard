// DataDashboard ~~ MIT License
// Rollup Configuration

// Settings
const libraryModules = ['chart.js', 'dna-engine', 'fetch-json', 'pretty-print-json', 'simple-datatables', 'web-ignition'];

// Utilities
const globalize = (map, mod) => { map[mod] = 'globalThis'; return map; };
const globals =   libraryModules.reduce(globalize, {});

const rollup = [
   {
      input:    'build/1-pre/web-app/app.js',
      external: libraryModules,
      output: [
         {
            file:    'build/2-dev/web-app/app.bundle.js',
            name:    'app',
            globals: globals,
            format:  'iife',
         },
      ],
   },
];

export default rollup;
