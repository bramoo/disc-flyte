import React from "react";
import uniqueId from "lodash/uniqueId";
import "./InlineNumberInput.css";

export class InlineNumberInput extends React.Component {
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
        <input id={this.id} type="number" value={this.props.value} onChange={this.handleChange} />
      </div>
    );
  }
}
