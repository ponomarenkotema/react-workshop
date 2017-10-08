'use strict';

var gulp = require('gulp');
var map = require('map-stream');
var jshint = require('gulp-jshint');
var jshintConfig = require('./jshint.config');


var exitOnJshintError = map(function (file, cb) {

    if (!file.jshint.success) {
        console.log('JSHINT fail in ' + file.path);
        file.jshint.results.forEach(function (report) {
            if (report) {
                console.log('line ' + report.error.line + ', ' + report.error.reason);
            }
        });
        process.exit(1);
    }
    cb(null, file);

});
var taskFunction = function() {

    return gulp.src('assets/js/**/*.js')
        .pipe(jshint(jshintConfig))
        .pipe(exitOnJshintError);
};

module.exports = taskFunction;

