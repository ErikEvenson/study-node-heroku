var
  config = require('./config'),
  gulp = require('gulp'),
  Heroku = require('heroku-client');

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
  }
};

module.exports = lib;

gulp.task('heroku:apps:list', function(cb) {
  lib.herokuAppsList(cb);
});
