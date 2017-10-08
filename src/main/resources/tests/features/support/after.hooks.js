'use strict';

var Cucumber = require('cucumber');

Cucumber.defineSupportCode(function (context) {
  context.After(function (scenario, callback) {
    this.browser
      .end()
      .then(function () {
        callback();
      });
  });

});