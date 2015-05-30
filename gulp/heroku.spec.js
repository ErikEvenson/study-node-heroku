var
  config = require('../config'),
  exec = require('child_process').exec,
  expect = require('chai').expect,
  heroku = require('./heroku');

describe('gulp heroku:apps:list', function() {
  it('provides a list of apps', function(done) {
    this.timeout(1000);
    heroku.herokuAppsList(function(err, apps) {
      expect(apps).to.be.an('array');
      done();
    });
  });
});

describe('gulp heroku:deploy', function() {
  it('should check that built instance exists');
});

describe('gulp heroku:tarball', function() {
  it('creates a tarball');
});
