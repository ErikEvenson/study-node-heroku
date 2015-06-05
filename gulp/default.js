var
  argv = require('yargs').argv,
  build = require('./build'),
  gulp = require('gulp'),
  server = require('./server');

gulp.task('default', function() {
  var options = {
    clean: argv.clean || false,
    instance: argv.instance || 'development',
    source: argv.source || 'src'
  }

  build.buildInstance(options, function(err) {
    server.serverStart(options.instance);
  });
});
