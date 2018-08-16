module.exports = function(karma) {
  var config = {
    browsers: ['Chrome'],
    failOnEmptyTestSuite: false,
    files: ['./node_modules/chart.js/dist/Chart.js', './US.ErrorBars.js', './test/**/*.js'],
    frameworks: ['browserify', 'jasmine'],
    preprocessors: {
      './test/jasmine.index.js': ['browserify'],
      './src/**/*.js': ['browserify']
    },
    browserify: {
      debug: true
    }
  };

  karma.set(config);
};