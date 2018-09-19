// DataDashboard
// Gulp tasks

// Imports
const babel =            require('gulp-babel');
const concat =           require('gulp-concat');
const css =              require('gulp-postcss');
const cssFontMagician =  require('postcss-font-magician');
const cssNano =          require('cssnano');
const cssPresetEnv =     require('postcss-preset-env');
const del =              require('del');
const fileInclude =      require('gulp-file-include');
const gulp =             require('gulp');
const header =           require('gulp-header');
const htmlHint =         require('gulp-htmlhint');
const less =             require('gulp-less');
const mergeStream =      require('merge-stream');
const RevAll =           require('gulp-rev-all');
const size =             require('gulp-size');
const w3cHtmlValidator = require('gulp-w3cjs');

// Folders
const folder = {
   staging:  'web-target/staging',
   minified: 'web-target/minified',
   dist:     'web-target/dist'
   };

// Setup
const pkg = require('./package.json');
const banner = `${pkg.name} v${pkg.version} ~~ ${pkg.homepage} ~~ ${pkg.license} License`;
const srcFiles = {
   images: ['src/images/**/*'],
   less:   ['src/style/base.less', 'src/**/*.less'],
   html:   ['src/web/**/*.html'],
   js:     ['src/scripts/data-dashboard.js', 'src/**/*.js']
   };
const libraryFiles = {
   css: [
      'node_modules/dna.js/dna.css',
      'node_modules/selectize/dist/css/selectize.default.css',
      'node_modules/vanilla-datatables/src/vanilla-dataTables.css'
      ],
   js: [
      'node_modules/fetch-json2/fetch-json.js',
      'node_modules/jquery/dist/jquery.js',
      'node_modules/moment/moment.js',
      'node_modules/chart.js/dist/Chart.js',
      'node_modules/dna.js/dna.js',
      'node_modules/selectize/dist/js/standalone/selectize.js',
      'node_modules/vanilla-datatables/src/vanilla-dataTables.js'
      ]
   };
const htmlHintConfig = { 'attr-value-double-quotes': false };
const cssPlugins = [
   cssFontMagician({ protocol: 'https:' }),
   cssPresetEnv(),
   cssNano({ autoprefixer: false })
   ];

// Tasks
const task = {
   cleanTarget: function() {
      return del(['web-target/', '**/.DS_Store']);
      },
   buildWebApp: function() {
      function buildGraphics() {
         return gulp.src(srcFiles.images)
            .pipe(gulp.dest(folder.staging + '/images'));
         }
      function buildCss() {
         return gulp.src(srcFiles.less)
            .pipe(less())
            .pipe(concat('data-dashboard.css'))
            .pipe(gulp.dest(folder.staging));
         }
      function buildHtml() {
         return gulp.src(srcFiles.html)
            .pipe(fileInclude({ basepath: '@root', indent: true }))
            .pipe(w3cHtmlValidator())
            .pipe(w3cHtmlValidator.reporter())
            .pipe(htmlHint(htmlHintConfig))
            .pipe(htmlHint.reporter())
            .pipe(gulp.dest(folder.staging));
          }
      function buildJs() {
         return gulp.src(srcFiles.js)
            .pipe(concat('data-dashboard.js'))
            .pipe(gulp.dest(folder.staging));
         }
      function packageCssLibraries() {
         return gulp.src(libraryFiles.css)
            .pipe(header('/*! 3rd party style */\n'))
            .pipe(concat('libraries.css'))
            .pipe(gulp.dest(folder.staging));
         }
      function packageJsLibraries() {
         return gulp.src(libraryFiles.js)
            .pipe(header('/*! 3rd party script */\n'))
            .pipe(concat('libraries.js'))
            .pipe(gulp.dest(folder.staging));
         }
      return mergeStream(
         buildGraphics(),
         buildCss(),
         buildHtml(),
         buildJs(),
         packageCssLibraries(),
         packageJsLibraries()
         );
      },
   minifyWebApp: function() {
      const transpileES6 = ['@babel/env', { modules: false }];
      return mergeStream(
         gulp.src(folder.staging + '/images/**/*')
            .pipe(gulp.dest(folder.minified + '/images')),
         gulp.src(folder.staging + '/*.html')
            .pipe(gulp.dest(folder.minified)),
         gulp.src(folder.staging + '/libraries.css')
            .pipe(css(cssPlugins))
            .pipe(gulp.dest(folder.minified)),
         gulp.src(folder.staging + '/libraries.js')
            .pipe(babel({ presets: ['minify'] }))
            .pipe(header('// 3rd party libraries\n'))
            .pipe(gulp.dest(folder.minified)),
         gulp.src(folder.staging + '/data-dashboard.css')
            .pipe(css(cssPlugins))
            .pipe(header('/*! ' + banner + ' */\n'))
            .pipe(gulp.dest(folder.minified)),
         gulp.src(folder.staging + '/data-dashboard.js')
            .pipe(babel({ presets: [transpileES6, 'minify'] }))
            .pipe(header('//! ' + banner + '\n'))
            .pipe(gulp.dest(folder.minified))
         );
      },
   resourcifyWebApp: function() {
      return gulp.src(folder.minified + '/**/*')
         .pipe(RevAll.revision({ dontRenameFile: ['.html'] }))
         .pipe(gulp.dest(folder.dist))
         .pipe(size({ showFiles: true }));
      }
   };

// Gulp
gulp.task('clean',      task.cleanTarget);
gulp.task('build',      task.buildWebApp);
gulp.task('minify',     task.minifyWebApp);
gulp.task('resourcify', task.resourcifyWebApp);
