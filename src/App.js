import React, { useState } from "react";
import "./App.css";
import { ThrowInput } from "./components/ThrowInput/ThrowInput";
import { ViewBox } from "./components/ViewBox/ViewBox";
import { discs } from "./simulation/discs";
import huckit from "./simulation/simulate.js";

const initialThrows = [
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

const simulate = (t) => {
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
};

export default function App() {
	let [throws, setThrows] = useState(initialThrows);
	let [result, setResult] = useState(simulate(throws[0]));

	const handleThrowChange = (index, t) => {
		let result = simulate(t);
		setResult(result);

		let copy = [...throws];
		copy[index] = t;
		setThrows(copy);
	};

	return (
		<div className="app-container">
			<div className="throw-container">
				<h2 className="throw-header">Throws</h2>

				<div className="throw-list">
					{throws.map((t, i) => (
						<ThrowInput
							key={t.id}
							throw={t}
							onThrowChange={(newThrow) =>
								handleThrowChange(i, newThrow)
							}
						/>
					))}
				</div>
			</div>
			<div className="view-container">
				<ViewBox result={result}></ViewBox>
			</div>
		</div>
	);
}
