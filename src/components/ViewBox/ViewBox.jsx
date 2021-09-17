import React from "react";
import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { vec3 } from "../../simulation/util";
import "./ViewBox.css";

export function ViewBox(props) {
	let vertices = [0, 0, 0];
	let count = 0;
	if (props.result) {
		let points = props.result.pos_g
			.filter((v) => !!v)
			.map((v) => vec3(v.x, v.y, v.z));
		vertices = points.reduce((a, p) => a.concat([p.y, p.z, p.x]), []);
		count = points.length;
	}

	const width = 10;
	const length = 70;

	return (
		<Canvas camera={{ position: [0, 0, -5] }}>
			<axesHelper />
			<OrbitControls />

			<ambientLight color={0x404040} />
			<pointLight position={[0, 20, 25]} decay={2} />

			<Line color="red" points={vertices} />

			<mesh position={[0, 0, length / 2]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[width, length]} />
				<meshStandardMaterial color="#00aa00" />
			</mesh>
		</Canvas>
	);
}
