'use strict';

var Backbone = require('backbone');
var ItemModel = require('../models/item.model');

var ItemsCollection = Backbone.Collection.extend({
  model: ItemModel,

  url: function () {
    return window.appApiUri + 'items';
  }

});


module.exports = ItemsCollection;