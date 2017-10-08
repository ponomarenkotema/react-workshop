'use strict';

var {defineSupportCode} = require('cucumber');

defineSupportCode(function ({Given, When, Then}) {

  Given(/^I am on workshop page$/, function (done) {
    this.tester.visit('#').then(function () {
      done();
    });
  });

  When(/^I enter property1 "([^"]*)" and property2 "([^"]*)" and property3 "([^"]*)" and status "([^"]*)"$/,
    function (property1, property2, property3, status, done) {

    this.browser
      .setValue('[name="property1"]', property1)
      .setValue('[name="property2"]', property2)
      .setValue('[name="property3"]', property3)
      .setValue('[name="status"]', status)
      .then(function(){
        done();
      });
  });

  When(/^I click add button$/, function (done) {
    var selector = '.workshop button';

    this.browser.click(selector)
      .then(function(){
        done();
      });
  });

  Then(/^I should see new row in grid$/, function (done) {
    done();
  });

});
