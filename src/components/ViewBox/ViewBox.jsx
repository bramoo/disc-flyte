import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { FlightPath } from "../FlightPath";

import "./ViewBox.css";

export function ViewBox(props) {
	const width = 10;
	const length = 70;

	return (
		<Canvas camera={{ position: [0, 0, -5] }}>
			<OrbitControls />

			<ambientLight color={0x202020} />
			<pointLight position={[0, 20, 25]} intensity={0.5} decay={2} />

			<FlightPath radius={0.1} aspect={0.1} result={props.result} />

			<mesh position={[0, 0, length / 2]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[width, length]} />
				<meshStandardMaterial color="#00aa00" />
			</mesh>
		</Canvas>
	);
}
