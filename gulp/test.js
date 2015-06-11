var
  // exec = require('child_process').exec,
  gulp = require('gulp'),
  karma = require('gulp-karma'),
  mocha = require('gulp-mocha'),
  shell = require('gulp-shell');

var lib = {
};

module.exports = lib;

var e2eCommand = 'xvfb-run protractor test/e2e/protractor.conf.js';

// Run everything serially
gulp.task('test', shell.task([
  'gulp lint:jshint',
  'gulp lint:gjslint',
  'gulp test:gulp',
  'gulp test:server:unit',
  'gulp test:client:unit',
  e2eCommand
]));

gulp.task('test:unit', shell.task([
  'gulp test:server:unit',
  'gulp test:client:unit'
]));

gulp.task('test:e2e', shell.task([
  e2eCommand
]));

gulp.task('test:client:unit', function() {
  process.env.NODE_ENV = 'test';
  files = [
    'node_modules/angular/angular.js',
    'node_modules/angular-mocks/angular-mocks.js',
    'src/**/public/**/*.js'
  ];

  return gulp.src(files)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run',
      preprocessors: {
        'src/**/public/**/*.js': ['browserify']
      },
      browserify: {
        debug: true
      }
    }))
    .on('error', function(err) {
      throw err;
    });
});

gulp.task('test:server:unit', function() {
  process.env.NODE_ENV = 'test';

  return gulp.src(['src/**/server/**/*.spec.js'], {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha());
});

gulp.task('test:gulp', function() {
  process.env.NODE_ENV = 'test';

  return gulp.src(['gulp/**/*.spec.js'], {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha());
});
