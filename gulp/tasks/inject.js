//this is the file for the gulp inject task

// call the gulp library
// The streaming build system
// https://www.npmjs.com/package/gulp
// https://github.com/gulpjs/gulp
var gulp = require('gulp');

// call the gulp-inject library
// A javascript, stylesheet and webcomponent injection plugin for Gulp, i.e. inject file references into your index.html
// https://www.npmjs.com/package/gulp-inject
// https://github.com/klei/gulp-inject
var inject = require('gulp-inject');

// call the stream-series library
// Waterfalls for streams
// https://www.npmjs.com/package/stream-series
// https://github.com/rschmukler/stream-series
var series = require('stream-series');

// the gulp inject task
gulp.task('inject',function(callback){
  //create a stream of the vendor js files
  var vendorJS = gulp.src('./dist/static/js/vendor-*.js',{read: false})
  
  //create a stream of the app js files
  var appJS = gulp.src('./dist/static/js/app-*.js', {read: false});
  
  //create a stream of the vendor css files
  var vendorCSS = gulp.src('./dist/static/css/vendor-*.css', {read: false});
  
  //create a stream of app css files
  var appCSS = gulp.src('./dist/static/css/app-*.css', {read: false});
  
  //load the index.html from src
  return gulp.src('./modules/core/layout.server.view.jade')
    //inject the previously created streams with relative paths and ignoring the '..' in the path
    .pipe(inject(series(vendorCSS,appCSS,vendorJS,appJS),{relative:true,ignorePath:'../../dist/static'}))
    //we copy the index.html to the destination directory
    .pipe(gulp.dest('./dist/views'));
})