var
  // exec = require('child_process').exec,
  gulp = require('gulp'),
  mocha = require('gulp-mocha'),
  shell = require('gulp-shell');

gulp.task(
  'test',
  ['lint', 'test:e2e', 'test:gulp', 'test:server:unit'],
  function() {}
);

gulp.task('test:e2e', shell.task([
  'xvfb-run protractor test/e2e/protractor.conf.js'
]));

gulp.task('test:client:unit', function() {
  return;
});

gulp.task('test:server:unit', function() {
  return gulp.src(['src/**/server/**/*.spec.js'], {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha());
});

gulp.task('test:gulp', function() {
  return gulp.src(['gulp/**/*.spec.js'], {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha());
});
