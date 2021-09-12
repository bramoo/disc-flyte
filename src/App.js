import React from "react";
import "./App.css";
import { ThrowInput } from "./components/ThrowInput/ThrowInput";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      throws: [
        {
          disc: 0, // aviar
          mass: 175,
          speed: 50,
          spin: 27,
          direction: 1,
          launchAngle: 10,
          noseAngle: 4,
          rollAngle: 8,
        },
        {
          disc: 1,
          mass: 170,
          speed: 30,
          spin: 20,
          direction: 1,
          launchAngle: 8,
          noseAngle: 6,
          rollAngle: 0,
        },
      ],
    };
  }

  handleThrowChange(index, t) {
    let throws = [...this.state.throws];
    throws[index] = t;
    this.setState({ throws: throws });
  }

  render() {
    return (
      <div className="app-container">
        <div className="throw-container">
          <h2 className="throw-header">Throws</h2>

          <div className="throw-list">
            {this.state.throws.map((t, i) => (
              <ThrowInput
                key={i}
                throw={t}
                onThrowChange={this.handleThrowChange.bind(this, i)}
              />
            ))}
          </div>
        </div>
        <div className="view-container">Look at it</div>
      </div>
    );
  }
}
