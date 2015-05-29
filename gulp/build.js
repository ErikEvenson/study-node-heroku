argv = require('yargs').argv,
config = require('../config'),
del = require('del'),
gulp = require('gulp'),
mkdirp = require('mkdirp'),
newer = require('gulp-newer'),
path = require('path');

var lib = {
  buildInstance: function(instance, source) {
    var instancePath = path.join(config.instances, instance);
    var sourcePath = path.join(config.basepath, source, '**/*');

    var sourceFiles = [
      sourcePath,
      path.join(config.basepath, 'package.json')
    ]

    return gulp.src(sourceFiles)
      .pipe(newer(instancePath))
      .pipe(gulp.dest(instancePath));
  }
}

module.exports = lib;

gulp.task('build', function() {
  var instance = argv.instance || 'development';
  var source = argv.source || 'src';
  return lib.buildInstance(instance, source);
});
