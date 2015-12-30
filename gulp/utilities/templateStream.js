var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var jade = require('gulp-jade');

module.exports = function genTemplateStream () {
  return gulp.src('./modules/**/*.client.view.jade')
  .pipe(jade())
  .pipe(templateCache({standalone:true,module:'woohApp.templates'}));
}