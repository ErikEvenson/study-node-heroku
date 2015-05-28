var 
  gulp = require('gulp'),
  mocha = require('gulp-mocha'),
  shell = require('gulp-shell');

gulp.task('test', ['test:e2e', 'test:unit'], function() {
});

gulp.task('test:e2e', shell.task([
  'xvfb-run protractor test/e2e/protractor.conf.js',
]));

gulp.task('test:unit', function () {
  return gulp.src(['src/server/**/*.spec.js'], {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha());
});
