'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var WorkshopController = require('./modules/workshop/workshop.controller');

$(document).ready(function () {
  var workshopController = new WorkshopController();
  Backbone.history.start();
});