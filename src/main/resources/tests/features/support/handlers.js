'use strict';

var selenium = require('./selenium');
var debug = require('debug')('ui-tests');

if (selenium.isDevelopmentMode) {
  selenium.install();
}

var Cucumber = require('cucumber');

Cucumber.defineSupportCode(function (context) {

  context.registerHandler('AfterFeatures', function (features, callback) {
    debug('++++++++++++ AfterFeatures session ');
    global.client
      .session()
      .then(function (session) {
        debug('AfterFeatures session ' + session);
        if (!session) {
          return callback();
        }
        global.client
          .end()
          .then(function () {
            callback();
          });
      });

  });

  context.registerHandler('BeforeFeatures', function (features, callback) {

    if (selenium.isDevelopmentMode) {

      selenium.setTestsCallback(callback);
    } else {

      callback();
    }

  });

  context.registerHandler('AfterScenario', function (features, callback) {

    debug('###++++++++++++ AfterScenario  ');
    global.client
      .session()
      .then(function (session) {
        debug('AfterScenario session ' + session);
        if (!session) {
          return callback();
        }
        global.client
          .endAll()
          .then(function () {
            debug('AfterScenario session end', arguments);
            callback();
          });


      });

  });

  context.registerHandler('StepResult', function (stepResult, callback) {
    var status = stepResult.status;
    var step = stepResult.step;

    if (status !== 'failed') {
      return callback();
    }
    debug(' +++ StepResult call  ' + status);

    /* global.client
     	.end()
     	.then(function(){
     		debug(' #end log ', arguments);
     		callback();
     	}).catch(function(error){
     		debug('StepResult catch ', arguments);
     		callback(error);
     	});*/


    global.client
      .session()
      .then(function(session) {

        if (!session || status !== 'failed') { return callback(); }

        debug('StepResult session ', session);
        global.client
          .saveScreenshot('./logs/' + step.name + '-snapshot.png')
          .log('browser')
          .then(function(result){
            console.log(' #browser log ', result.value);
          })
          .end().then(function(result){
          console.log(' #browser log ', result.value);
          callback();
        });

      })
      .catch(function(){
        debug('StepResult catch ', arguments);
        callback(arguments);
      });
  });
});