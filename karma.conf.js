module.exports = function(config) {
  config.set({
    frameworks: ['browserify', 'jasmine'],
    reporters: ['progress'],
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: true
  });
};
