var
  config = require('../config'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  keys = require('../secrets/keys'),
  path = require('path'),
  uuid = require('uuid');

var keys = require(path.join(config.secrets, 'keys'));

var getPutUrl = function(filename, done) {
  var AWS = require('aws-sdk');
  var key = path.join(uuid.v4(), filename);

  AWS.config.update({
    accessKeyId: keys.AWS_ACCESS_KEY_ID,
    region: config.aws.region,
    secretAccessKey: keys.AWS_SECRET_ACCESS_KEY
  });

  var s3 = new AWS.S3({computeChecksums:true});
  var params = {Bucket: config.aws.bucket, Key: key};

  s3.getSignedUrl('putObject', params, function(err, putUrl) {
    done(err, putUrl);
  });
}

var lib = {
  getPutUrl: getPutUrl
};

module.exports = lib;

gulp.task('aws', function(done) {
  gutil('TBD');
  done();
});
