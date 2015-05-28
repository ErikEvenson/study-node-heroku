var
  debug = require('debug')(__filename),
  gulp = require('gulp'),
  path = require('path'),
  server = require('gulp-develop-server');

var config = require('./config');
var app = path.join(config.basepath, 'src/server/index.js');

gulp.task('server:start', function() {
  server.listen({path: app});
});
