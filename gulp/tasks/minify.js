//this is the file for the gulp minify tasks

// call the gulp library
// The streaming build system
// https://www.npmjs.com/package/gulp
// https://github.com/gulpjs/gulp
var gulp = require('gulp');

// call the run-sequence library
// Run a series of dependent gulp tasks in order
// https://www.npmjs.com/package/run-sequence
// https://github.com/OverZealous/run-sequence
var runSequence = require('run-sequence');

// call the stream-series library
// Waterfalls for streams
// https://www.npmjs.com/package/stream-series
// https://github.com/rschmukler/stream-series
var series = require('stream-series');

// call the local utility for loading html templates in angular $templateCache
var templateStream = require('../utilities/templateStream.js')

// call the gulp-sourcemaps library
// Source map support for Gulp.js
// https://www.npmjs.com/package/gulp-sourcemaps
// https://github.com/floridoo/gulp-sourcemaps
var sourcemaps = require('gulp-sourcemaps');

// call the gulp-angular-filesort library
// Automatically sort AngularJS app files depending on module definitions and usage
// https://www.npmjs.com/package/gulp-angular-filesort
// https://github.com/klei/gulp-angular-filesort
var angularFilesort = require('gulp-angular-filesort');

// call the gulp-concat library
// Concatenates files
// https://www.npmjs.com/package/gulp-concat
// https://github.com/wearefractal/gulp-concat
var concat = require('gulp-concat');

// call the gulp-ng-annotate library
// add, remove and rebuild angularjs dependency injection annotations with gulp
// https://www.npmjs.com/package/gulp-ng-annotate
// https://github.com/Kagami/gulp-ng-annotate
var ngAnnotate = require('gulp-ng-annotate');

// call the gulp-rename library
// Rename files
// https://www.npmjs.com/package/gulp-rename
// https://github.com/hparra/gulp-rename
var rename = require('gulp-rename');

// call the gulp-bytediff library
// Compare file sizes before and after your gulp build process.
// https://www.npmjs.com/package/gulp-bytediff
// https://github.com/ben-eb/gulp-bytediff
var bytediff = require('gulp-bytediff');

// call the gulp-uglify library
// Minify files with UglifyJS.
// https://www.npmjs.com/package/gulp-uglify
// https://github.com/terinjokes/gulp-uglify
var uglify = require('gulp-uglify');

// call the main-bower-files library
// Get main files from your installed bower packages.
// https://www.npmjs.com/package/main-bower-files
// https://github.com/ck86/main-bower-files
var bowerFiles = require('main-bower-files');

// call the gulp-filter library
// Filter files in a vinyl stream
// https://www.npmjs.com/package/gulp-filter
// https://github.com/sindresorhus/gulp-filter
var gulpFilter = require('gulp-filter');

// call the gulp-rev library
// Static asset revisioning by appending content hash to filenames: unicorn.css => unicorn-d41d8cd98f.css
// https://www.npmjs.com/package/gulp-rev
// https://github.com/sindresorhus/gulp-rev
var rev = require('gulp-rev');

// the main minify task
gulp.task('minify',function(callback){
  //this task calls the js minify tasks in parralel
  runSequence(['minify:app','minify:bower'],callback)
})

// the app js minify task
gulp.task('minify:app',function(){
  //we load the generated $templateCache and all the app js files
  return series(templateStream(),gulp.src('./modules/**/*.client.*.js'))
    //we prepare the creation of sourcemaps permiting to know from wich source file each part of the generated file is concatenated and minified
    .pipe(sourcemaps.init())
    //we sort the angular files depending on the dependency injection declarations
    .pipe(angularFilesort())
    //we concat the js files add a ; and an new line between them and name them App.js
    .pipe(concat('App.js', {newLine: ';\n'}))
    //we annotate the angular function to be safe for minification
    .pipe(ngAnnotate({
      add: true
    }))
    //we add a .min to the file name
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    //we check the file size before minification
    .pipe(bytediff.start())
    //we minify the file and mangle the variables
    .pipe(uglify({mangle: true}))
    //we check the file size after minification
    .pipe(bytediff.stop())
    //we add a hash to the file name to leverage browser caching and still push our renewed files to the client
    .pipe(rev())
    //we write the generated sourcemap to the same directory
    .pipe(sourcemaps.write('./'))
    //we copy the files to the destination directory
    .pipe(
      gulp.dest('./dist/static/js')
    )
});

// the bower js minify task
gulp.task('minify:bower',function(){
  //we prepare a filter to only take the js files from bower main files
  var jsFilter = gulpFilter('**/*.js');
  
  //we load all the bower dependencies main files
  return gulp.src(bowerFiles())
    //we filter to only take the js files
    .pipe(jsFilter)
    //we prepare the creation of sourcemaps permiting to know from wich source file each part of the generated file is concatenated
    .pipe(sourcemaps.init())
    //we concatenate the js and name it vendor.js
    .pipe(concat('vendor.js'))
    //we add a .min to the file name
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    //we check the file size before minification
    .pipe(bytediff.start())
    //we minify the file and mangle the variables
    .pipe(uglify({mangle: true}))
    //we check the file size after minification
    .pipe(bytediff.stop())
    //we add a hash to the file name to leverage browser caching and still push our renewed files to the client
    .pipe(rev())
    //we write the generated sourcemap to the same directory
    .pipe(sourcemaps.write('./'))
    //we copy the files to the destination directory
    .pipe(gulp.dest('./dist/static/js'));
});