import React, { useRef, useState } from "react";
import { Canvas, } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import { FlightPath } from "../FlightPath";
import { vec3 } from "../../simulation/util";

import "./ViewBox.css";

const buffer = 5;

export function ViewBox(props) {
	let camera = useRef();

	let [polyString, setPolyString] = useState('');

	const points = props.result.pos_g.map((v) => vec3(v.y, v.z, v.x));

	const onEnd = () => {
		console.log("controls ended from viewbox");
		if (camera.current) {
			let proj = points.map(p => p.clone().project(camera.current));
			let string = proj.map(p => `${p.x},${-p.y}`).join(' ');
			setPolyString(string);
		}
	}

	let zs = props.result.pos_g.map((v) => v.x);
	let zmax = Math.max.apply(Math, zs);

	const width = 10;
	const length = zmax + 2 * buffer;

	return (
		<>
			<Canvas
				resize={{ scroll: true, debounce: 0 }}
			>
				<PerspectiveCamera ref={camera} makeDefault position={[0, 0, -5]} />
				<OrbitControls target={[0, 0, 35]} enableDamping={false} onEnd={onEnd} />

				<ambientLight color={0x202020} />
				<pointLight position={[0, 20, 25]} intensity={0.5} decay={2} />

				<FlightPath radius={0.1} aspect={0.1} result={props.result} />

				<mesh position={[0, 0, length / 2 - buffer]} rotation={[-Math.PI / 2, 0, 0]}>
					<planeGeometry args={[width, length]} />
					<meshStandardMaterial color="#00aa00" />
				</mesh>
			</Canvas>
			<svg viewBox="-1 -1 2 2" preserveAspectRatio="none">
				<g>
					<polyline points={polyString} fill="none" stroke="black" strokeWidth="0.01" />
				</g>
			</svg>
		</>
	);
}
