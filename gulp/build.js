var
  argv = require('yargs').argv,
  async = require('async'),
  config = require('../config'),
  del = require('del'),
  gcallback = require('gulp-callback'),
  gulp = require('gulp'),
  jade = require('./jade'),
  mkdirp = require('mkdirp'),
  newer = require('gulp-newer'),
  path = require('path');

var lib = {
  buildInstance: function(instance, source, done) {
    var instancePath = path.join(config.instances, instance);
    var sourcePath = path.join(config.basepath, source, '**/*');

    var sourceFiles = [
      sourcePath,
      path.join(config.basepath, 'package.json')
    ];

    async.parallel([
      function(cb) {
        gulp.src(sourceFiles)
          .pipe(newer(instancePath))
          .pipe(gulp.dest(instancePath))
          .on('end', cb);
      },
      function(cb) {
        jade.jadeClient(instance, source, cb);
      }
    ], done);
  }
};

module.exports = lib;

gulp.task('build', function(done) {
  var instance = argv.instance || 'development';
  var source = argv.source || 'src';

  return lib.buildInstance(instance, source, done);
});
