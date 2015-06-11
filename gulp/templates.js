var
  argv = require('yargs').argv,
  config = require('../config'),
  gulp = require('gulp'),
  jade = require('gulp-jade'),
  path = require('path'),
  templateCache = require('gulp-angular-templatecache');

var lib = {
  templates: function(options, cb) {
    var templatesPath = path.join(
      config.instances,
      options.instance,
      'app/public'
    );

    var instancePath = path.join(config.instances, options.instance);

    var files = [
      path.join(instancePath, 'app/public/views/*.jade'),
      path.join(instancePath, 'core/public/views/*.jade'),
      path.join(instancePath, 'organizations/public/views/*.jade')
    ];

    return gulp.src(files)
      .pipe(jade())
      .pipe(templateCache('templates.js', {
        module: 'app',
        moduleSystem: 'Browserify',
        standalone: false
      }))
      .pipe(gulp.dest(templatesPath))
      .on('end', cb);
  }
};

module.exports = lib;

gulp.task('templates', function(done) {
  var options = {
    instance: argv.instance || 'development'
  };

  lib.templates(options, done);
});
