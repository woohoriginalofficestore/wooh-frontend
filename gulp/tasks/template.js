//this is the file for the gulp template tasks

// call the gulp library
// The streaming build system
// https://www.npmjs.com/package/gulp
// https://github.com/gulpjs/gulp
var gulp = require('gulp');

// call the gulp-rename library
// Rename files
// https://www.npmjs.com/package/gulp-rename
// https://github.com/hparra/gulp-rename
var rename = require('gulp-rename');

var template = require('gulp-template');

var config = require('../../config/config.js')
gulp.task('template',function(){
	return gulp.src('./server/**/_*.js')
        .pipe(template(config))
        .pipe(rename(function (path) {
      		path.basename = path.basename.substr(1);
    	}))
        .pipe(gulp.dest('./dist/server'));
})