var
  config = require('../config'),
  exec = require('child_process').exec,
  expect = require('chai').expect,
  heroku = require('./heroku'),
  yassert = require('yeoman-assert');

describe('gulp heroku:apps:list', function() {
  it('provides a list of apps', function(done) {
    this.timeout(5000);
    heroku.herokuAppsList(function(err, apps) {
      expect(apps).to.be.an('array');
      done();
    });
  });
});

describe('gulp heroku:deploy', function() {
  it('should check that built instance exists');
});

describe('gulp heroku:setup', function() {
  it('creates a setup');
});

describe('gulp heroku:tarball', function() {
  after('something', function(done) {
    files = path.join(config.temp, '**/*.tar.gz');
    del([files], done);
  });

  before('something', function(done) {
    files = path.join(config.temp, '**/*.tar.gz');
    del([files], done);
  });

  it('creates a tarball', function(done) {
    var options = {}
    heroku.herokuTarball(options, function(err, result) {
      expect(result).to.be.a('string');
      yassert.file(result);
      done();
    });
  });
});
