argv = require('yargs').argv,
config = require('./config'),
del = require('del'),
gulp = require('gulp'),
mkdirp = require('mkdirp'),
path = require('path');

gulp.task('build', function(cb) {
  instancePath = path.join(config.basepath, 'instances', argv.instance);
  
  del([instancePath], function(cb) {
    mkdirp(instancePath, cb);  
  });
});
