'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Backbone from 'backbone';

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.bindValue = this.bindValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  bindValue(input) {
    this.props.model.set(input.props.name, input.state.value);
  }

  registerInputs(children) {
    return React.Children.map(children, function (child) {
      let value;

      if (!child || !child.props) {
        return child;
      }

      if (child.props.children) {
        child = React.cloneElement(child, {
          children: this.registerInputs(child.props.children)
        });
      }

      if (child.props.name) {
        value = this.props.model ? this.props.model.get(child.props.name) : null;
        child = React.cloneElement(child, {
          value: value,
          bindValue: this.bindValue
        });
      }

      return child;
    }, this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.handleSubmit) {
      this.props.handleSubmit(this);
    }
  }

  render() {
    const children = this.registerInputs(this.props.children);

    return (
      <form action='' onSubmit={this.handleSubmit}>
        {children}
      </form>
    );
  }
}

module.exports = Form;

Form.propTypes = {
  model: PropTypes.instanceOf(Backbone.Model).isRequired
};

