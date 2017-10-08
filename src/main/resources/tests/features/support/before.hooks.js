'use strict';

var Cucumber = require('cucumber');

Cucumber.defineSupportCode(function (context) {
  context.Before(function (scenario, callback) {
    callback();
  });
});