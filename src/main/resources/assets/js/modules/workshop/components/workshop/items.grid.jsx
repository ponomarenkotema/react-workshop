'use strict';

import React from 'react';

class ItemsGridComponent extends React.Component {

  componentDidMount() {
    this.props.collection.on('add remove change', this.forceUpdate.bind(this, null));
  }

  componentWillUnmount() {
    this.props.collection.off(null, null, this);
  }

  getRows() {
    const rows = this.props.collection.map((model) => {
      return (
        <tr className={model.getRowClass()} key={model.get('id')}>
          <td>
            {model.get('property1')}
          </td>
          <td>
            {model.get('property2')}
          </td>
          <td>
            {model.get('property3')}
          </td>
        </tr>
      );
    });

    return (
      <tbody>{rows}</tbody>
    );
  };

  static getHeader() {
    return (
      <thead>
        <tr>
          <th>
            Property 1
          </th>
          <th>
            Property 2
          </th>
          <th>
            Property 3
          </th>
        </tr>
      </thead>
    );
  };

  render() {
    return (
      <table className="table table-bordered">
        {ItemsGridComponent.getHeader()}
        {this.getRows()}
      </table>
    );
  }
}

module.exports = ItemsGridComponent;

