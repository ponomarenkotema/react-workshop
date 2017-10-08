'use strict';

var gulp = require('gulp');

var childProcess = require('child_process');
var environment = { env: process.env };
var options = ['node_modules/.bin/cucumber-js',
  'tests/features',
  '-f', 'pretty', '--no-strict', '--fail-fast'];

var taskFunction = function (callback) {
  var cucumber = childProcess.spawn('node', options, environment);

  cucumber.on('exit', function(code) {
    callback(null);
    process.exit(code);
  });

  cucumber.stdout.on('data', function(d) {
    console.log(String(d));
  });

  cucumber.stderr.on('data', function(d) {
    console.error(String(d));
  });

};

module.exports = taskFunction;
