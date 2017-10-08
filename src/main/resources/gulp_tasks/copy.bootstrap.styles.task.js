'use strict';

var gulp = require('gulp');

var taskFunction = function () {

  gulp.src('node_modules/bootstrap/dist/css/*.css')
    .pipe(gulp.dest('../webapp/assets/css'));

  gulp.src('node_modules/bootstrap/dist/fonts/*.{ttf,woff,woff2,eof,svg,eot}')
    .pipe(gulp.dest('../webapp/assets/fonts'));
};

module.exports = taskFunction;