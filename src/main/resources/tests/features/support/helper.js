'use strict';

var debug = require('debug')('ui-tests');
var _ = require('underscore');
var Cucumber = require('cucumber');
var server = require('./../../../server');
var tester = require('./tester');
var webdriverio = require('webdriverio');
var seleniumServerIP = process.env.SELENIUM_IP;
var timeouts = require('./timeouts');
var options = {
  host: seleniumServerIP || 'localhost',
  desiredCapabilities: {
    browserName: 'chrome'
    // browserName: 'firefox'
  },
  maxInstances: 3,
  connectionRetryTimeout: timeouts.defaultTimeout * 2,
  connectionRetryCount: 5,
  logOutput: 'llogs',
  screenshotPath: './',
  screenshotOnReject: true
};
var capabilities = {
  rotatable: false,
  locationContextEnabled: false,
  applicationCacheEnabled: true
};

var ip = _.chain(require('os').networkInterfaces())
  .values()
  .flatten()
  .find({family: 'IPv4', internal: false})
  .value()
  .address;

if (seleniumServerIP) {
  debug(' ------------------ seleniumServerIP ' + seleniumServerIP);
}

var client = webdriverio.remote(options);
client.timeouts('page load', timeouts.pageLoadTimeout);
client.timeouts('implicit', timeouts.pageLoadTimeout);
// using global var to be able to close cilent after all scenarious
global.client = client;

function Helper() {

  this.browser = global.client;
  tester.setBrowser(client);
  this.tester = tester;
  this.getFullPageUrl = function (path) {
    return 'http://' + ip + ':' + server.server.address().port + path;
  };
  this.tester.getFullPageUrl = this.getFullPageUrl;
  this.tester.options = options;

}

Cucumber.defineSupportCode(function ({setWorldConstructor}) {
  setWorldConstructor(Helper);
});
