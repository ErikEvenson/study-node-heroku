var
  // exec = require('child_process').exec,
  gulp = require('gulp'),
  karma = require('gulp-karma'),
  karmaServer = require('karma').server,
  mocha = require('gulp-mocha'),
  path = require('path'),
  shell = require('gulp-shell');

var lib = {
};

module.exports = lib;

// Run everything serially
gulp.task('test', shell.task([
  'gulp lint:jshint',
  'gulp lint:gjslint',
  'gulp test:gulp',
  'gulp test:unit'
]));

gulp.task('test:unit', shell.task([
  'gulp test:server:unit',
  'gulp test:client:unit'
]));

gulp.task('test:unit', function() {
  process.env.NODE_ENV = 'test';

  return gulp.src([])
    .pipe(karma({
      action: 'run',
      configFile: path.join(__dirname, '../karma.conf.js')
    }))
    .on('error', function(err) {
      throw err;
    });
});

// Experimental
gulp.task('test:karma', function(done) {
  process.env.NODE_ENV = 'test';

  karmaServer.start({
    configFile: path.join(__dirname, '../karma.conf.js')
  }, done);
});

gulp.task('test:gulp', function() {
  process.env.NODE_ENV = 'test';

  return gulp.src(['gulp/**/*.spec.js'], {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha());
});
