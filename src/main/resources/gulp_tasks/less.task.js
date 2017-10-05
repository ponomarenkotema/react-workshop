'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');


var taskFunction = function () {


  var lessFile = path.join(__dirname, '../', files.less);

  return gulp.src(['client/templates/*.less'])
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('../webapp/assets/'))


};


module.exports = taskFunction;
