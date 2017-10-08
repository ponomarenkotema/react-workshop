'use strict';

var Cucumber = require('cucumber');
var timeouts = require('./timeouts');

Cucumber.defineSupportCode(function (context) {
  context.setDefaultTimeout(timeouts.defaultTimeout);
});