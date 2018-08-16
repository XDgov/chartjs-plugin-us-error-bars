var browserify = require('browserify'),
  concat = require('gulp-concat'),
  eslint = require('gulp-eslint'),
  gulp = require('gulp'),
  insert = require('gulp-insert'),
  karma = require('karma'),
  package = require('./package.json'),
  path = require('path'),
  replace = require('gulp-replace'),
  source = require('vinyl-source-stream');
  streamify = require('gulp-streamify'),
  uglify = require('gulp-uglify'),
  yargs = require('yargs');

var srcDir = './src/';
var srcFiles = srcDir + '**.js';
var buildDir = './';
var docsDir = './docs/';

var header = "/*!\n\
 * chartjs-plugin-us-error-bars\n\
 * Version: {{ version }}\n\
 *\n\
 * This project, excluding its dependencies, is in the worldwide public domain.\n\
 * Released under the CC0 1.0 Universal public domain dedication.\n\
 * https://github.com/XDgov/chartjs-plugin-us-error-bars/blob/master/LICENSE.md\n\
 */\n";

gulp.task('default', ['build', 'watch']);
gulp.task('build', buildTask);
gulp.task('lint', lintTask);
gulp.task('watch', watchTask);
gulp.task('test', ['lint', 'unittest']);
gulp.task('unittest', unittestTask);

var argv = yargs
  .option('force-output', {default: false})
  .option('silent-errors', {default: false})
  .option('verbose', {default: false})
  .argv;

function buildTask() {
  var nonBundled = browserify('./src/plugin.js')
    .ignore('chart.js')
    .bundle()
    .pipe(source('US.ErrorBars.js'))
    .pipe(insert.prepend(header))
    .pipe(streamify(replace('{{ version }}', package.version)))
    .pipe(gulp.dest(buildDir))
    .pipe(gulp.dest(docsDir))
    .pipe(streamify(uglify()))
    .pipe(streamify(concat('US.ErrorBars.min.js')))
    .pipe(gulp.dest(buildDir));

  return nonBundled;

}

function lintTask() {
  var files = [
//    'docs/**/*.js',
    'src/**/*.js'
//    'test/**/*.js'
  ];

  // NOTE(SB) codeclimate has 'complexity' and 'max-statements' eslint rules way too strict
  // compare to what the current codebase can support, and since it's not straightforward
  // to fix, let's turn them as warnings and rewrite code later progressively.
  var options = {
    rules: {
      'complexity': [1, 10],
      'max-statements': [1, 30]
    }
  };

  return gulp.src(files)
    .pipe(eslint(options))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function startTest() {
  return [
    './node_modules/moment/min/moment.min.js',
    './test/jasmine.index.js',
    './src/**/*.js',
  ].concat(
    ['./test/specs/**/*.js']
  );
}

function unittestTask(done) {
  var server = new karma.Server({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: !argv.watch,
    files: startTest(),
    args: {
      coverage: !!argv.coverage
    }
  });

  server.on('browser_error', function (browser, err){
    gutil.log('Karma Run Failed: ' + err.message);
    throw err;
  });

  server.on('run_complete', function (browsers, results){
    if (results.failed) {
      throw new Error('Karma: Tests Failed');
    }
    done();
  });
}

function watchTask() {
  return gulp.watch(srcFiles, ['build']);
}