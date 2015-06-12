module.exports = function(config) {
  config.set({
    autoWatch: true,
    files: [
      'node_modules/angular/angular.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/**/public/**/*.js'
    ],
    frameworks: ['browserify', 'jasmine'],
    reporters: ['progress'],
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: false,
    preprocessors: {
      'src/**/public/**/*.js': ['browserify']
    },
    browserify: {
      debug: true
    },
    watchify: {
      poll: true
    }
  });
};
