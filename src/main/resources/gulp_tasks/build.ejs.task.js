'use strict';

var gulp = require('gulp');
var ejs = require('gulp-ejs');
var gutil = require('gulp-util');
var config = require('../config')[process.env.NODE_ENV];

var taskFunction = function () {

  return gulp.src(['templates/index.ejs'])
    .pipe(ejs(config, {}, {ext:'.html'}))
    .on('error', gutil.log)
    .pipe(gulp.dest('../webapp/'));
};

module.exports = taskFunction;