'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');

var taskFunction = function () {

  return gulp.src(['assets/css/workshop.less'])
    .pipe(less())
    .on('error', gutil.log)
    .pipe(gulp.dest('../webapp/assets/css/'));
};

module.exports = taskFunction;