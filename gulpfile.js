// Gulp tasks

// Imports
import babel           from 'gulp-babel';
import concat          from 'gulp-concat';
import gap             from 'gulp-append-prepend';
import gulp            from 'gulp';
import header          from 'gulp-header';
import less            from 'gulp-less';
import order           from 'gulp-order';
import replace         from 'gulp-replace';
import size            from 'gulp-size';
import touch           from 'gulp-touch-cmd';

// Folders
const folder = {
   tsc:      'build/1-pre/web-app',
   staging:  'build/2-dev/web-app',
   minified: 'build/3-min/web-app',
   hashed:   'build/4-rev/web-app',
   };

// Setup
const srcFiles = {
   graphics: { glob: 'src/web-app/assets/graphics/**/*' },
   css:      { glob: 'src/web-app/**/*.less', order: ['src/web-app/css/base.less'] },
   html:     { glob: 'src/web-app/root/**/*.html' },
   widgets:  { glob: 'src/web-app/widgets/**/*.html' },
   js:       { glob: folder.tsc + '/**/*.js', order: ['!**/app.js'] },
   };
const libraryFiles = {
   css: [
      'node_modules/web-ignition/dist/reset.min.css',
      'node_modules/dna-engine/dist/dna-engine.css',
      // 'node_modules/select2/dist/css/select2.min.css',
      'node_modules/simple-datatables/dist/style.css',
      'node_modules/pretty-print-json/dist/pretty-print-json.css',
      ],
   js: [
      'node_modules/whatwg-fetch/dist/fetch.umd.js',  //polyfill
      ],
   jsOotbMinified: [
      'node_modules/fetch-json/dist/fetch-json.min.js',
      'node_modules/jquery/dist/jquery.min.js',
      // 'node_modules/select2/dist/js/select2.min.js',
      'node_modules/chart.js/dist/chart.min.js',
      'node_modules/dna-engine/dist/dna-engine.min.js',
      'node_modules/simple-datatables/dist/umd/simple-datatables.js',
      'node_modules/web-ignition/dist/lib-x.min.js',
      'node_modules/pretty-print-json/dist/pretty-print-json.min.js',
      ],
   };
const transpileES6 = ['@babel/env', { modules: false }];
const preserveImportant = comment => /licen[sc]e|copyright|@preserve|^!/i.test(comment);
const babelMinifyJs = { presets: [transpileES6, 'minify'], shouldPrintComment: preserveImportant };
babelMinifyJs.presets[1] = ['minify', { builtIns: false }];  //HACK: workaround "Couldn't find intersection" error, https://github.com/babel/minify/issues/904

// Tasks
const task = {
   packageLibCss() {
      return gulp.src(libraryFiles.css)
         .pipe(header('/*! 3rd party style: ${filename} */\n'))
         .pipe(concat('libraries.css'))
         .pipe(size({ showFiles: true }))
         .pipe(gulp.dest(folder.staging))
         .pipe(touch());
      },
   packageLibJsRaw() {
      const embeddedJsComment = /([^\n])(\/\/[*]?!)/g;
      return gulp.src(libraryFiles.js)
         .pipe(babel(babelMinifyJs))
         .pipe(replace(embeddedJsComment, '$1\n$2'))
         .pipe(header('//! 3rd party library: ${filename}\n'))
         .pipe(gap.appendText('\n'))
         .pipe(concat('libraries.min.js'))
         .pipe(size({ showFiles: true }))
         .pipe(gulp.dest(folder.staging))
         .pipe(touch());
      },
   packageLibJsOotb() {
      return gulp.src(libraryFiles.jsOotbMinified)
         .pipe(header('//! 3rd party library (minified): ${filename}\n'))
         .pipe(gap.appendText('\n'))
         .pipe(concat('libraries.ootb.js'))
         .pipe(size({ showFiles: true }))
         .pipe(gulp.dest(folder.staging))
         .pipe(touch());
         },
   bundleAppCss() {
      return gulp.src(srcFiles.css.glob)
         .pipe(order(srcFiles.css.order))
         .pipe(less())
         .pipe(concat('app.bundle.css'))
         .pipe(size({ showFiles: true }))
         .pipe(gulp.dest(folder.staging));
      },
   };

// Gulp
gulp.task('package-lib-css',     task.packageLibCss);     //build/2-dev/web-app/libraries.css
gulp.task('package-lib-js-raw',  task.packageLibJsRaw);   //build/2-dev/web-app/libraries.min.js
gulp.task('package-lib-js-ootb', task.packageLibJsOotb);  //build/2-dev/web-app/libraries.ootb.js
gulp.task('bundle-app-css',      task.bundleAppCss);      //build/2-dev/web-app/app.bundle.css
