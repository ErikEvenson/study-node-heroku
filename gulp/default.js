var
  argv = require('yargs').argv,
  build = require('./build'),
  gulp = require('gulp'),
  server = require('./server');

gulp.task('default', function() {
  var instance = argv.instance || 'development';
  var source = argv.source || 'src';

  build.buildInstance(instance, source, function(err) {
    server.serverStart(instance);
  });
});
