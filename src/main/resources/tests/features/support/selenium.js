'use strict';

var selenium = require('selenium-standalone');
var env = process.env.NODE_ENV;
var isDevelopmentMode = (env === 'development' || env === 'dev');

var seleniumServerVersion = '3.5.0';
var fs = require('fs');
var seleniumLogFile = fs.createWriteStream(__dirname + '/../../../logs/selenium.log', {flags: 'w'});
var seleniumDrivers = {
  chrome: {
    version: '2.32',
    arch: process.arch,
    baseURL: 'https://chromedriver.storage.googleapis.com'
  },
  firefox: {
    version: '0.14.0',
    arch: process.arch,
    baseURL: 'https://github.com/mozilla/geckodriver/releases/download'
  }
};
var seleniumOption = {
  version: seleniumServerVersion,
  drivers: seleniumDrivers,
  seleniumArgs: [],
  javaArgs: []
};


var testsCallback = null;
var seleniumInstalled = function () {

  selenium.start(seleniumOption, seleniumStartedCallback);
};
var seleniumStartedCallback = function (err, spawnSelenium) {

  if (err) {
    throw new Error(err);
  }

  spawnSelenium.stdout.pipe(seleniumLogFile);
  spawnSelenium.stderr.pipe(seleniumLogFile);

  testsCallback();
};


var seleniumStarter = {
  setTestsCallback: function (callbackToStartTests) {
    testsCallback = callbackToStartTests;
  },
  install: function () {

    selenium.install({
      version: seleniumServerVersion,
      baseURL: 'https://selenium-release.storage.googleapis.com',
      drivers: seleniumDrivers,
      logger: function (message) {

        console.log(message);
      }
    }, seleniumInstalled);
  },
  isDevelopmentMode: isDevelopmentMode
};


module.exports = seleniumStarter;