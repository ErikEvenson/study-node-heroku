var
  debug = require('debug')(__filename),
  gulp = require('gulp'),
  path = require('path'),
  server = require('gulp-develop-server');

var config = require('../config');
var app = path.join(config.basepath, 'src/bin/www');

gulp.task('server:start', function() {
  server.listen({path: app});
});
