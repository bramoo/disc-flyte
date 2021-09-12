import React from "react";
import { InlineNumberInput } from "../InlineNumberInput/InlineNumberInput";
import { SelectInput } from "../SelectInput/SelectInput";
import { discs } from "../../simulation/discs";
import "./ThrowInput.css";

export class ThrowInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.handleDiscChange = this.handleDiscChange.bind(this);
    this.handleMassChange = this.handleMassChange.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleSpinChange = this.handleSpinChange.bind(this);
    this.handleDirectionChange = this.handleDirectionChange.bind(this);
    this.handleLaunchAngleChange = this.handleLaunchAngleChange.bind(this);
    this.handleNoseAngleChange = this.handleNoseAngleChange.bind(this);
    this.handleRollAngleChange = this.handleRollAngleChange.bind(this);
  }

  toggleOpen() {
    const open = this.state.open;
    this.setState({
      open: !open,
    });
  }

  handleDiscChange(disc) {
    let t = this.props.throw;
    t.disc = disc;
    this.props.onThrowChange(t);
  }

  handleMassChange(mass) {
    let t = this.props.throw;
    t.mass = mass;
    this.props.onThrowChange(t);
  }

  handleSpeedChange(speed) {
    let t = this.props.throw;
    t.speed = speed;
    this.props.onThrowChange(t);
  }

  handleSpinChange(spin) {
    let t = this.props.throw;
    t.spin = spin;
    this.props.onThrowChange(t);
  }

  handleDirectionChange(direction) {
    let t = this.props.throw;
    t.direction = direction;
    this.props.onThrowChange(t);
  }

  handleLaunchAngleChange(launchAngle) {
    let t = this.props.throw;
    t.launchAngle = launchAngle;
    this.props.onThrowChange(t);
  }

  handleNoseAngleChange(noseAngle) {
    let t = this.props.throw;
    t.noseAngle = noseAngle;
    this.props.onThrowChange(t);
  }

  handleRollAngleChange(rollAngle) {
    let t = this.props.throw;
    t.rollAngle = rollAngle;
    this.props.onThrowChange(t);
  }

  render() {
    const t = this.props.throw;
    return (
      <div className="container">
        <header onClick={() => this.toggleOpen()}>
          <span className="heading">{discs[t.disc].name}</span>
        </header>

        {this.state.open && (
          <div className="inputs">
            <SelectInput
              label="Disc"
              value={t.disc}
              onChange={this.handleDiscChange}
            >
              {discs.map((disc, index) => (
                <option value={index}>{disc.name}</option>
              ))}
            </SelectInput>
            <InlineNumberInput
              label="Mass (g)"
              value={t.mass}
              onChange={this.handleMassChange}
            />
            <InlineNumberInput
              label="Speed (mph)"
              value={t.speed}
              onChange={this.handleSpeedChange}
            />
            <InlineNumberInput
              label="Spin (rev/s)"
              value={t.spin}
              onChange={this.handleSpinChange}
            />
            <SelectInput
              label="Dir."
              value={t.direction}
              onChange={this.handleDirectionChange}
            >
              <option value="1">Clockwise (RHBH/LHFH)</option>
              <option value="-1">Anti-Clockwise (LHBH/RHFH)</option>
            </SelectInput>
            <InlineNumberInput
              label="Launch Angle (deg)"
              value={t.launchAngle}
              onChange={this.handleLaunchAngleChange}
            />
            <InlineNumberInput
              label="Nose Angle (deg)"
              value={t.noseAngle}
              onChange={this.handleNoseAngleChange}
            />
            <InlineNumberInput
              label="Roll Angle (deg)"
              value={t.rollAngle}
              onChange={this.handleRollAngleChange}
            />
          </div>
        )}
      </div>
    );
  }
}
