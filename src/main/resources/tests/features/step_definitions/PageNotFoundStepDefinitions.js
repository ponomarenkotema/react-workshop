'use strict';

var {defineSupportCode} = require('cucumber');

defineSupportCode(function ({Given, When, Then}) {

  Given(/^I am entering wrong hash (.*)$/, function (hash, done) {
    this.tester.visit('#' + hash).then(function () {
      done();
    });
  });

  Then(/^I should see "([^"]*)" text$/, function (text, done) {
    this.tester.assertText('.workshop h1', text, done);
  });

});
