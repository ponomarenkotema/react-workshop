'use strict';

import React from 'react';

class LayoutHeader extends React.Component {
  render() {
    return (
      <div className="header clearfix">
        <nav>
          <ul className="nav nav-pills pull-right">
            <li role="presentation" className="active"><a href="#home">Home</a></li>
          </ul>
        </nav>
        <h3 className="text-muted">React workshop</h3>
      </div>
    );
  }
}

module.exports = LayoutHeader;

