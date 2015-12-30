//this is the file for the gulp copy tasks

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

// call the gulp-rename library
// Rename files
// https://www.npmjs.com/package/gulp-rename
// https://github.com/hparra/gulp-rename
var rename = require('gulp-rename');

// the main gulp copy task
gulp.task('copy',function(callback){
   //this task calls the fonts and images copy tasks in parralel
  runSequence(['copy:config','copy:server','copy:server:views','copy:modules','copy:fonts','copy:images'],callback)
});

gulp.task('copy:server:views',function(){
  gulp.src(['./modules/**/*.server.view.jade'])
  .pipe(rename(
      function (path) {
        if (path.dirname.indexOf('partials') === -1) {
          path.dirname = "";
        } else {
          path.dirname = "partials"
        }
        
      }
    ))
  .pipe(gulp.dest('./dist/views/'));
})

gulp.task('copy:config',function(){
  return gulp.src('./config/**/*')
  .pipe(gulp.dest('./dist/config'))
})

//the gulp task to copy server js files
gulp.task('copy:server',function(){
  //we load the server js files
  return gulp.src(['./server/**/*.js','!./server/**/_*.js'])
    .pipe(gulp.dest('./dist/server'))
})

//the gulp task to copy server route js files
gulp.task('copy:modules',function(){
  //we load the server js files
  return gulp.src(['./modules/**/*.server.*.js'])
    .pipe(gulp.dest('./dist/modules'))
})

//the gulp task to copy fonts
gulp.task('copy:fonts',function(){
  //we prepare a filter to only take the font files from bower main files
	var fontsFilter = gulpFilter(['**/*.eot','**/*.svg','**/*.ttf','**/*.woff','**/*.woff2','**/*.otf']);
  //we load all the bower dependencies main files
  return gulp.src(bowerFiles())
   //we filter to only take the font files
	.pipe(fontsFilter)
  //we copy the files to the destination directory
  .pipe(gulp.dest('./dist/static/fonts'))
});

//the gulp task to copy the images
gulp.task('copy:images',function(){
  //we load all the jpg png and gif files from the content folder
  return gulp.src('./media/**/*.+(jpg|png|gif|svg)')
    //we copy the files to the destination directory
    .pipe(gulp.dest('./dist/static/media'));
});