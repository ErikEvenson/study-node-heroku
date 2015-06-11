var
  argv = require('yargs').argv,
  browserify = require('browserify'),
  config = require('../config'),
  gulp = require('gulp'),
  path = require('path'),
  rename = require('gulp-rename'),
  source = require('vinyl-source-stream');

var lib = {
  browserify: function(options, done) {
    return browserify(options.main)
      .bundle()
      .pipe(source(path.basename(options.bundle)))
      .pipe(gulp.dest(path.dirname(options.bundle)))
      .on('end', done);
  }
};

module.exports = lib;

gulp.task('browserify', function(done) {
  var options = {
    bundle: argv.bundle || path.join(
      config.instances,
      'development/app/public/app.js'
    ),
    main: argv.main || path.join(config.basepath, 'src/app/public/app.js')
  };

  lib.browserify(options, function() {
    done();
  });
});
