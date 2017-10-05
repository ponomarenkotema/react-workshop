'use strict';

var gulp = require('gulp');


var componentsTask = require('./gulp_tasks/components');
var concatAllTask = require('./gulp_tasks/concat.all');
var jshintTask = require('./gulp_tasks/jshint');
var lessTask = require('./gulp_tasks/less.task');
var ejsTask = require('./gulp_tasks/ejs.templates');



gulp.task('componentsTask', componentsTask);
gulp.task('concatAllTask', ['ejsTask', 'componentsTask'], concatAllTask);
gulp.task('concatAllComponents', ['componentsTask'], concatAllTask);


gulp.task('lessTask', lessTask);
gulp.task('jshintTask', jshintTask);
gulp.task('ejsTask', ejsTask);

gulp.task('default', ['jshintTask', 'concatAll', 'lessTask', 'copyfonts', 'copyimgs', 'copylib', 'copycss']);
gulp.task('concatAll', ['componentsTask', 'concatAllTask']);
gulp.task('rebuildJSX', ['componentsTask', 'concatAllTask']);


gulp.task('watch', ['default'], function () {
  // start server for testing
  require('./app');

  gulp.watch(['assets/js/**/*.jsx'], ['concatAllComponents']);
  gulp.watch(['assets/js/**/*.js', 'messages/**/*.js'], ['concatAll']);
  gulp.watch(['assets/css/**/*.{less,css}'], ['lessTask']);
  gulp.watch(['templates/*.ejs'], ['ejsTask']);
});


gulp.task('copyfonts', function () {
  gulp.src('assets/fonts/**/*.{ttf,woff,eof,svg,eot}')
    .pipe(gulp.dest('../webapp/assets/fonts'));

  // copy ubuntu fonts
  gulp.src('bower_components/ubuntu-fontface/fonts/**/*.{ttf,woff,woff2,eof,svg,eot}')
    .pipe(gulp.dest('../webapp/assets/fonts'));

  // copy bootstrap fonts
  gulp.src('bower_components/bootstrap/fonts/**/*.{ttf,woff,woff2,eof,svg,eot}')
    .pipe(gulp.dest('../webapp/assets/fonts'));

  // copy material icons fonts
  gulp.src('bower_components/bootstrap-material-design-icons/fonts/**/*.{ttf,woff,woff2,eof,svg,eot}')
    .pipe(gulp.dest('../webapp/assets/fonts'));

  // copy react widgets fonts
  gulp.src('node_modules/react-widgets/lib/fonts/**/*.{ttf,woff,woff2,eof,svg,eot}')
    .pipe(gulp.dest('../webapp/assets/fonts'));
});

gulp.task('copyimgs', function () {
  gulp.src('assets/img/**/*.{png,gif,jpg,mp4,ogv,webm}')
    .pipe(gulp.dest('../webapp/assets/img'));
});

gulp.task('copycss', function () {
  // copy material icons css
  gulp.src('bower_components/bootstrap-material-design-icons/css/**/*.css')
    .pipe(gulp.dest('../webapp/assets/css'));
});
