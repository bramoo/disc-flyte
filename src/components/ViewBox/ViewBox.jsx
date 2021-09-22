import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { FlightPath } from "../FlightPath";

import "./ViewBox.css";

const buffer = 5;

export function ViewBox(props) {
	let zs = props.result.pos_g.map((v) => v.x);
	let zmax = Math.max.apply(Math, zs);

	const width = 10;
	const length = zmax + 2 * buffer;

	return (
		<Canvas
			resize={{ scroll: true, debounce: 0 }}
			camera={{ position: [0, 0, -5] }}
		>
			<OrbitControls target={[0, 0, 35]} />

			<ambientLight color={0x202020} />
			<pointLight position={[0, 20, 25]} intensity={0.5} decay={2} />

			<FlightPath radius={0.1} aspect={0.1} result={props.result} />

			<mesh position={[0, 0, length / 2 - buffer]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[width, length]} />
				<meshStandardMaterial color="#00aa00" />
			</mesh>
		</Canvas>
	);
}
