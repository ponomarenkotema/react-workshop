'use strict';

var gulp = require('gulp');

var del = require('del');
var buildJsFiles = require('./gulp_tasks/build.js.task');
var buildEjsFiles = require('./gulp_tasks/build.ejs.task');
var buildLessFiles = require('./gulp_tasks/build.less.task');
var verifyJsCode = require('./gulp_tasks/jshint.task');
var copyBootstrap = require('./gulp_tasks/copy.bootstrap.styles.task');
var runIntegrationTests = require('./gulp_tasks/run.integration.tests.task');

gulp.task('verifyJsCode', verifyJsCode);
gulp.task('buildJsFiles', buildJsFiles);
gulp.task('buildEjsFiles', buildEjsFiles);
gulp.task('copyBootstrap', copyBootstrap);
gulp.task('buildLessFiles', buildLessFiles);
gulp.task('tests', runIntegrationTests);
gulp.task('cleanWebappDir', function () { return del(['webapp/']); });
gulp.task('concatAll', ['buildJsFiles', 'buildEjsFiles', 'buildLessFiles']);
gulp.task('default', ['cleanWebappDir', 'verifyJsCode', 'concatAll', 'copyBootstrap']);

gulp.task('watch', ['default'], function() {

  gulp.watch(['assets/js/**/*.jsx'], ['buildJsFiles']);
  gulp.watch(['assets/js/**/*.js'], ['buildJsFiles']);
  gulp.watch(['templates/*.ejs'], ['buildEjsFiles']);
  gulp.watch(['assets/css/**/*.{less,css}'], ['buildLessFiles']);

  // start server for testing
  require('./server');
});