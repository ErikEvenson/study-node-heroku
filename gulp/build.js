var
  argv = require('yargs').argv,
  async = require('async'),
  browserify = require('./browserify'),
  clean = require('./clean'),
  config = require('../config'),
  del = require('del'),
  gcallback = require('gulp-callback'),
  gulp = require('gulp'),
  mkdirp = require('mkdirp'),
  newer = require('gulp-newer'),
  path = require('path'),
  templates = require('./templates');

var lib = {
  buildInstance: function(options, done) {
    var instancePath = path.join(config.instances, options.instance);
    var sourcePath = path.join(config.basepath, options.source, '**/*');

    var sourceFiles = [
      sourcePath
    ];

    // Remove source directory.
    sourceFiles.push(path.join('!' + config.basepath, options.source));

    // Remove test files.
    sourceFiles.push(path.join(
      '!' + config.basepath, options.source, '**/*.spec.js'
    ));

    async.series([
      // Clean if asked
      function(cb1) {
        if (options.clean) {
          clean.cleanInstance(options.instance, cb1);
        } else {
          cb1();
        }
      },
      // Move files
      function(cb3) {
        gulp.src(sourceFiles)
          // .pipe(newer(instancePath))
          .pipe(gulp.dest(instancePath))
          .on('end', cb3);
      },
      // Templates
      function(cb4) {
        templates.templates(options, cb4);
      },
      // Browserify
      function(cb5) {
        browserify.browserify({
          bundle: path.join(instancePath, 'js/app.js'),
          main: path.join(instancePath, 'app/app.js')
        }, cb5);
      },
      // Minify
      // ...
      // Remove extraneous files
      function(cb6) {
        delFiles = [
          path.join(instancePath, 'app/{/,*}'),
          path.join(instancePath, 'users/{/,*}')
        ];

        del(delFiles, cb6);
      }
    ], done);
  }
};

module.exports = lib;

gulp.task('build', function(done) {
  var options = {
    clean: argv.clean || false,
    instance: argv.instance || 'development',
    source: argv.source || 'src'
  };

  return lib.buildInstance(options, done);
});
