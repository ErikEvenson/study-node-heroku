var
  argv = require('yargs').argv,
  config = require('../config'),
  gcallback = require('gulp-callback'),
  gzip = require('gulp-gzip'),
  gulp = require('gulp'),
  Heroku = require('heroku-client'),
  tar = require('gulp-tar');

var keys = require(path.join(config.secrets, 'keys'));
var heroku = new Heroku({token: keys.HEROKU_API_TOKEN});

var lib = {
  herokuAppsList: function(cb) {
    heroku.apps().list(function(err, apps) {
      var appsList = [];

      if (err) {
        return cb(err);
      } else {
        apps.forEach(function(app) {
          appsList.push(app.name);
        });

        return cb(null, appsList);
      }
    });  
  },
  herokuTarball: function(options, cb) {
    var instance = options.instance || 'development';
    var tarballName = options.tarballName || instance
    var files = path.join(config.instances, instance, '**/*');

    gulp.src(files)
      .pipe(tar(tarballName + '.tar'))
      .pipe(gzip())
      .pipe(gulp.dest(config.temp))
      .pipe(gcallback(cb));
  }
};

module.exports = lib;

gulp.task('heroku:apps:list', function(cb) {
  lib.herokuAppsList(cb);
});

gulp.task('heroku:tarball', function(cb) {
  options = {};
  lib.herokuTarball(options, cb);
});
