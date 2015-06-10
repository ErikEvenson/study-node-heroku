var
  argv = require('yargs').argv,
  config = require('../config'),
  del = require('del'),
  gcallback = require('gulp-callback'),
  gulp = require('gulp'),
  jade = require('gulp-jade'),
  path = require('path');

var lib = {
  jadeClient: function(instance, source, cb) {
    var instancePath = path.join(config.instances, instance);
    
    var files = [
      path.join(config.basepath, source, '**/public/views/**/*.jade')
    ];

    return gulp.src(files)
      .pipe(jade())
      .pipe(gulp.dest(instancePath))
      .on('end', cb);
  }
};

module.exports = lib;

gulp.task('jade', ['jade:client'], function() {});

gulp.task('jade:client', function(done) {
  var instance = argv.instance || 'development';
  var source = argv.source || 'src';
  lib.jadeClient(instance, source, done);
});
