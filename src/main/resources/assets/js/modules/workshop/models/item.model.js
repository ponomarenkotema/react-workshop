'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var ItemModel = Backbone.Model.extend({

  defaults: {
    property1: null,
    property2: null,
    property3: null,
    status: 'active'
  },

  url: function () {
    return window.appApiUri + 'items';
  },

  getRowClass: function () {
    if(_.contains(['active', 'success', 'warning', 'danger', 'info'], this.get('status'))) {
      return this.get('status');
    }
  }

});

module.exports = ItemModel;