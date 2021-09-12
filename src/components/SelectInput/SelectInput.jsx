import React from "react";
import uniqueId from "lodash/uniqueId";
import "./SelectInput.css";

export class SelectInput extends React.Component {
  id;

  constructor(props) {
    super(props);
    this.id = uniqueId();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div>
        <label htmlFor={this.id}>{this.props.label}</label>
        <select
          id={this.id}
          value={this.props.value}
          onChange={this.handleChange}
        >
          {this.props.children}
        </select>
      </div>
    );
  }
}
