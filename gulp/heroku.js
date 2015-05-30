var
  _ = require('lodash'),
  argv = require('yargs').argv,
  async = require('async'),
  config = require('../config'),
  gcallback = require('gulp-callback'),
  gzip = require('gulp-gzip'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  Heroku = require('heroku-client'),
  tar = require('gulp-tar');

var keys = require(path.join(config.secrets, 'keys'));
var heroku = new Heroku({token: keys.HEROKU_API_TOKEN});

var herokuAppsList = function(cb) {
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
}

var herokuDeploy = function(options, cb) {
  var instance = options.instance || 'development';
  var appsList;

  async.waterfall([
    function(cb) {
      herokuAppsList(function(err, result) {
        cb(err, result);
      });
    },
    function(result, cb) {
      appsList = result;
      gutil.log(appsList);
      cb();
    }
  ], cb);

  // var appList = herokuAppsList(function(err, appsList) {
  //   if (err) cb(err);

  //   if (!_.includes(appList, instance)) {
  //     gutil.log('App does not exist on heroku -- creating...')
  //     cb();
  //   } else {
  //     cb();
  //   }
  // });
}

var herokuTarball = function(options, cb) {
  var instance = options.instance || 'development';
  var tarballName = options.tarballName || instance
  var tarballPath = path.join(config.temp, tarballName, '.tar.gz');
  var files = path.join(config.instances, instance, '**/*');

  async.waterfall([
    function(cb) {
      del([tarballPath], cb);
    },
    function(err, cb) {
      gulp.src(files)
        .pipe(tar(tarballName + '.tar'))
        .pipe(gzip())
        .pipe(gulp.dest(config.temp))
        .pipe(gcallback(cb));
    }
  ], function(err, result) {
    cb(err, result);
  });
}

var lib = {
  herokuAppsList: herokuAppsList,
  herokuDeploy: herokuDeploy,
  herokuTarball: herokuTarball
};

module.exports = lib;

gulp.task('heroku:apps:list', function(cb) {
  herokuAppsList(cb);
});

gulp.task('heroku:deploy', function(cb) {
  var options = {
    instance: argv.instance || 'development'
  }

  herokuDeploy(options, cb);
});

gulp.task('heroku:tarball', function(cb) {
  var options = {};
  herokuTarball(options, cb);
});
