'use strict';

import React from 'react';
import Form from '../basic/form';
import FormInput from '../basic/form.input';

class ItemFormComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(form) {
    this.props.model.save();
    return true;
  }

  render() {
    return (
      <Form model={this.props.model} handleSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-sm-6">
            <FormInput
              label="Property 1"
              placeholder="Property 1"
              name="property1"
            />
            <FormInput
              label="Property 2"
              placeholder="Property 2"
              name="property2"
            />
          </div>
          <div className="col-sm-6">
            <FormInput
              label="Property 3"
              placeholder="Property 3"
              name="property3"
            />
            <FormInput
              label="Status"
              placeholder="Status"
              name="status"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-default">Add new</button>
      </Form>
    );
  }
}

module.exports = ItemFormComponent;

