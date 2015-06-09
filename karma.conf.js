module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['progress'],
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: true
  });
};
