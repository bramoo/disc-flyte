import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { vec3 } from "../../simulation/util";
import "./ViewBox.css";

export function ViewBox(props) {
	const halfwidth = 0.5;

	const points = props.result.pos_g.map((v) => vec3(v.y, v.z, v.x));
	const eulers = props.result.ori_g.map(orientation => new THREE.Euler(-orientation.y, orientation.z, -orientation.x));
	const lefts = eulers.map((e, i) => vec3(-halfwidth, 0, 0).applyEuler(e).add(points[i]));
	const rights = eulers.map((e, i) => vec3(halfwidth, 0, 0).applyEuler(e).add(points[i]));

	const width = 10;
	const length = 70;

	return (
		<Canvas camera={{ position: [0, 0, -5] }}>
			<axesHelper />
			<OrbitControls />

			<ambientLight color={0x404040} />
			<pointLight position={[0, 20, 25]} decay={2} />

			<Line color="green" points={lefts} />
			<Line color="red" points={points} />
			<Line color="blue" points={rights} />

			<mesh scale={[0.1,0.01,0.1]} position={points[0]} rotation={eulers[0]}>
				<sphereGeometry />
				<meshStandardMaterial color="#ffa500" />
			</mesh>

			<mesh position={[0, 0, length / 2]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[width, length]} />
				<meshStandardMaterial color="#00aa00" />
			</mesh>
		</Canvas>
	);
}
