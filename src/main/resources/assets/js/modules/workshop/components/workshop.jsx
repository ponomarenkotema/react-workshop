'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import ItemsGrid from './workshop/items.grid';
import ItemForm from './workshop/item.form';

var ItemsCollection = require('./../collections/items.collection');
var ItemModel = require('./../models/item.model');

class WorkshopComponent extends React.Component {
  render() {
    return (
      <div className="row">
        <h1>And new item form</h1>
        <ItemForm model={this.props.itemModel}/>
        <h1>Items grid</h1>
        <ItemsGrid collection={this.props.itemsCollection}/>
      </div>
    );
  }
}

WorkshopComponent.propTypes = {
  itemsCollection: PropTypes.instanceOf(ItemsCollection).isRequired,
  itemModel: PropTypes.instanceOf(ItemModel).isRequired
};

module.exports = WorkshopComponent;

