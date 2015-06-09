var
  argv = require('yargs').argv,
  async = require('async'),
  clean = require('./clean'),
  config = require('../config'),
  del = require('del'),
  gcallback = require('gulp-callback'),
  gulp = require('gulp'),
  jade = require('./jade'),
  mkdirp = require('mkdirp'),
  newer = require('gulp-newer'),
  path = require('path');

var lib = {
  buildInstance: function(options, done) {
    var instancePath = path.join(config.instances, options.instance);
    var sourcePath = path.join(config.basepath, options.source, '**/*');

    var sourceFiles = [
      sourcePath,
      path.join(config.basepath, 'package.json')
    ];

    // Remove source directory.
    sourceFiles.push(path.join('!' + config.basepath, options.source));

    // Remove client-side jade source files as these are processed into html
    // files.
    sourceFiles.push(path.join(
      '!' + config.basepath, options.source, '**/public/views/**/*.jade'
    ));

    // Remove test files.
    sourceFiles.push(path.join(
      '!' + config.basepath, options.source, '**/*.spec.js'
    ));

    async.series([
      function(cb1) {
        if (options.clean) {
          clean.cleanInstance(options.instance, cb1);
        } else {
          cb1();
        }
      },
      function(cb2) {
        async.parallel([
          function(cb3) {
            gulp.src(sourceFiles)
              .pipe(newer(instancePath))
              .pipe(gulp.dest(instancePath))
              .on('end', cb3);
          },
          function(cb4) {
            jade.jadeClient(options.instance, options.source, cb4);
          }
        ], cb2);
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
