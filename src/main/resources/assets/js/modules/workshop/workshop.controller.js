'use strict';
var Backbone = require('backbone');
var React = require('react');
var ReactDom = require('react-dom');
var Page404Cmp = require('./components/404.page.jsx');
var LayoutCmp = require('./components/layout.jsx');
var WorkshopCmp = require('./components/workshop.jsx');
var ItemsCollection = require('./collections/items.collection');
var ItemModel = require('./models/item.model');
var WorkshopController = Backbone.Router.extend({

  routes: {
    '': 'indexPage',
    '*notFound': 'page404'
  },

  indexPage: function () {
    this.itemsCollection = new ItemsCollection();
    this.itemModel = new ItemModel();
    this.renderCmp(WorkshopCmp, {itemsCollection: this.itemsCollection, itemModel: this.itemModel});
    this.itemsCollection.fetch();
    var self = this;
    this.itemModel.on("sync", function(model, response, options){
      self.itemsCollection.fetch();
    });
  },

  page404: function () {
    this.renderCmp(Page404Cmp);
  },

  renderCmp: function (cmp, options) {
    options = options || {};
    options.nestedComponentsClass = cmp;
    ReactDom.render(
      React.createElement(LayoutCmp, options),
      document.getElementById('main-container')
    );
  }

});


module.exports = WorkshopController;