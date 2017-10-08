'use strict';

import React from 'react';

class FormInput extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: this.props.value ? this.props.value : '',
      changed: false
    };
  }

  handleChange(e) {
    this.setState({
      value: e.currentTarget.value,
      changed: true
    }, function () {
      this.props.bindValue(this);
    }.bind(this));
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input type={(this.props.type ? this.props.type : 'text')}
               ref={'input_' + this.props.name}
               className="form-control"
               name={this.props.name}
               placeholder={this.props.placeholder}
               value={this.state.value}
               onChange={this.handleChange}
        />
      </div>
    );
  }
}

module.exports = FormInput;

FormInput.defaultProps = {
  bindValue: function () {

  }
};

