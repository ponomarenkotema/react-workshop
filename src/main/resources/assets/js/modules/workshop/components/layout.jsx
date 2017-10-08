'use strict';

import React from 'react';
import Header from './layout/header';
import Footer from './layout/footer';

class LayoutComponent extends React.Component {

  render() {
    var NestedComponent = this.props.nestedComponentsClass;
    return (
      <div className="container">
        <Header/>

        <div className="workshop">
          <NestedComponent {...this.props} />
        </div>

        <Footer/>
      </div>
    );
  }
}

module.exports = LayoutComponent;

