'use strict';

var env = process.env.NODE_ENV;
var isDevelopmentMode = (env === 'development' || env === 'dev');
var should = require('should');
var _ = require('lodash');
var timeouts = require('./timeouts');
var debug = require('debug')('ui-tests');

var tester = {

  isDevelopmentMode: isDevelopmentMode,

  setBrowser: function (browser) {

    this.browser = browser;
  },


  url: function (url) {
    var fullPath = this.getFullPageUrl(url);

    debug(' tester url called ');
    var promise = new Promise(function (resolve, reject) {
      this.browser
        .url(fullPath)
        .waitForVisible('.workshop', timeouts.pageReadyTimeout)
        .then(function () {

          debug(' page loaded ');
          resolve();
        })
        .catch(function (error) {
          debug('page load catch ', arguments);
          reject(error);
        });
    }.bind(this));

    return promise;
  },

  visit: function (url, callback) {

    if (url && url.indexOf(' ') >= 0) {
      return callback(null, 'pending');
    }

    debug(' tester visit called ');

    this.promise = new Promise(
      this.initializeAndLoadPage.bind(this, url, callback)
    );

    return this.promise;
  },

  /**
   * @private
   */
  initializeAndLoadPage: function (url, callback, resolve, reject) {
    var fullPath = this.getFullPageUrl(url);

    this.resolve = resolve;

    this.browser
      .init()
      .url(fullPath)
      .then(function () {

        debug(' url done ');
      })
      .waitForVisible('.workshop', timeouts.pageReadyTimeout)
      .then(function () {

        debug(' page loaded ');
        resolve();
      })
      .catch(function (error) {

        debug('page load catch ', arguments);
        reject(error);
      });
  },

  compareGetTextResultWithrequiredText: function (results, requiredText) {

    if (isDevelopmentMode) {
      console.log(' getText ', results, _.isArray(results), ' requiredText ' + requiredText);
    }

    if (!_.isArray(results)) {
      should(results).equal(requiredText);
    } else {
      var index = results.indexOf(requiredText);
      should(results[index]).equal(requiredText);
    }

  },


  waitForVisible: function (selector) {
    var self = this;

    return new Promise(function (resolve, reject) {
      debug('waitForVisible ' + selector + ' with timeout ' + timeouts.uiElementsRenderDefaultTimeout);
      self.browser
        .waitForVisible(selector, timeouts.uiElementsRenderDefaultTimeout)
        .then(function (result) {
          debug('waitForVisible done');
          resolve(result);
        })
        .catch(function (error) {

          debug('waitForVisible catch ');
          reject(error);
        });
    });
  },

  waitForNoVisible: function (selector) {
    var self = this;

    return new Promise(function (resolve, reject) {
      debug('waitForNoVisible ' + selector + ' with timeout ' + timeouts.uiElementsNotVisibleDefaultTimeout);
      self.browser
        .waitForVisible(selector, timeouts.uiElementsNotVisibleDefaultTimeout, true)
        .then(function (result) {
          debug('waitForNoVisible done');
          resolve(result);
        })
        .catch(function (error) {

          debug('waitForNoVisible catch ');
          reject(error);
        });
    });
  },

  assertText: function (selector, requiredText, callback) {
    var self = this;

    this.browser.getText(selector)
      .then(function (results) {

        self.compareGetTextResultWithrequiredText(results, requiredText);
        callback();
      });
  },

  assertValue: function (selector, requiredText, callback) {
    var self = this;

    this.browser.getValue(selector)
      .then(function (results) {

        self.compareGetTextResultWithrequiredText(results, requiredText);
        callback();
      });
  }
};


module.exports = tester;