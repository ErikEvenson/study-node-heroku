exports.config = {
  baseUrl: 'http://localhost:3001',
  beforeLaunch: function() {
    console.log("TBD delete test output.")
  },
  directConnect: true,
  multiCapabilities: [
    {
      browserName: 'chrome'
    }
    // {
    //   browserName: 'phantomjs',
    //   'phantom.binary.path': '/usr/local/node/node-default/bin/phantomjs'
    // }
  ],
  onPrepare: function() {
    // Inspired by
    // http://ng-learn.org/2014/02/Protractor_Testing_With_Angular_And_Non_Angular_Sites/
    global.isAngularSite = function(flag){
        browser.ignoreSynchronization = !flag;
    };

    process.env.PORT = 3001
    require('../../index')
  },
  specs: [
    '*.spec.js'
  ]
}