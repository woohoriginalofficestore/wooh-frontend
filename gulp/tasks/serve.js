var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('serve', function () {
  nodemon({ script: './dist/server/index.js',
          ext: 'js',
           tasks: ['lintServerJS'],
          ignore:['./gulp','./build','./src','./bower_components','./node_modules']
    	})
    .on('restart', function () {
      console.log('restarting')
    })
});