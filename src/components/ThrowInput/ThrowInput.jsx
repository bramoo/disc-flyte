import React, { useState } from "react";
import { InlineNumberInput } from "../InlineNumberInput/InlineNumberInput";
import { SelectInput } from "../SelectInput/SelectInput";
import { discs } from "../../simulation/discs";
import "./ThrowInput.css";

export function ThrowInput(props) {
	const [open, setOpen] = useState(false);

	const handleChange = (e) => {
		let target = e.target.name;
		let t = props.throw;
		t[target] = e.target.value;
		props.onThrowChange(t);
	};

	const t = props.throw;

	return (
		<div className="throw-input">
			<header onClick={() => setOpen(!open)}>
				<span className="heading">{discs[t.disc].name}</span>
			</header>

			{open && (
				<div className="inputs">
					<SelectInput
						label="Disc"
						name="disc"
						value={t.disc}
						onChange={handleChange}
					>
						{discs.map((disc, index) => (
							<option key={disc.name} value={index}>{disc.name}</option>
						))}
					</SelectInput>
					<InlineNumberInput
						label="Mass (g)"
						name="mass"
						value={t.mass}
						onChange={handleChange}
					/>
					<InlineNumberInput
						label="Speed (mph)"
						name="speed"
						value={t.speed}
						onChange={handleChange}
					/>
					<InlineNumberInput
						label="Spin (rev/s)"
						name="spin"
						value={t.spin}
						onChange={handleChange}
					/>
					<SelectInput
						label="Dir."
						name="direction"
						value={t.direction}
						onChange={handleChange}
					>
						<option value="1">Clockwise (RHBH/LHFH)</option>
						<option value="-1">Anti-Clockwise (LHBH/RHFH)</option>
					</SelectInput>
					<InlineNumberInput
						label="Launch Angle (deg)"
						name="launchAngle"
						value={t.launchAngle}
						onChange={handleChange}
					/>
					<InlineNumberInput
						label="Nose Angle (deg)"
						name="noseAngle"
						value={t.noseAngle}
						onChange={handleChange}
					/>
					<InlineNumberInput
						label="Roll Angle (deg)"
						name="rollAngle"
						value={t.rollAngle}
						onChange={handleChange}
					/>
				</div>
			)}
		</div>
	);
}
