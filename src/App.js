import React from "react";
import "./App.css";
import { ThrowInput } from "./components/ThrowInput/ThrowInput";
import { ViewBox } from "./components/ViewBox/ViewBox";
import { discs } from "./simulation/discs";
import huckit from "./simulation/simulate.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    let throws = [
      {
        id: 0,
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
        id: 1,
        disc: 1,
        mass: 170,
        speed: 30,
        spin: 20,
        direction: 1,
        launchAngle: 8,
        noseAngle: 6,
        rollAngle: 0,
      },
    ];
    let result = this.simulate(throws[0]);
    this.state = {
      throws: throws,
      result: result,
    };
  }

  simulate(t) {
    let params = [
      (t.rollAngle * Math.PI) / 180.0,
      (t.noseAngle * Math.PI) / 180.0,
      (t.launchAngle * Math.PI) / 180.0,
      1.8,
      t.speed * 0.44704,
      t.spin * t.direction * 2 * Math.PI,
      t.mass / 1000,
    ];
    return huckit(discs[t.disc], ...params);
  }

  handleThrowChange(index, t) {
    let result = this.simulate(t);
    this.setState({ result: result });

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
                key={t.id}
                throw={t}
                onThrowChange={this.handleThrowChange.bind(this, i)}
              />
            ))}
          </div>
        </div>
        <div className="view-container">
          <ViewBox result={this.state.result}></ViewBox>
        </div>
      </div>
    );
  }
}
