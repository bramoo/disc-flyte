import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { vec3 } from "../../simulation/util";

import Disc from "../Disc";
import FlightPath from "../FlightPath";
import FlightControls from "../FlightControls";

import "./ViewBox.css";

const buffer = 5;

export function ViewBox(props) {
	const controlsRef = useRef();
	const scrubberRef = useRef();
	const followRef = useRef();
	const fullRef = useRef();
	const throwerRef = useRef();
	const landingRef = useRef();
	const discRef = useRef();
	const radius = 0.1;
	const aspect = 0.1;

	// fix coordinate system
	const points = props.result.pos_g.map((v) => vec3(v.y, v.z, v.x));
	// ori_g: x=roll y=pitch z=yaw, applied in that order
	const eulers = props.result.ori_g.map(
		(orientation) =>
			new THREE.Euler(
				-orientation.y,
				orientation.z,
				-orientation.x,
				"ZXY"
			)
	);

	let zmax = Math.max.apply(
		Math,
		points.map((p) => p.z)
	);
	let count = points.length;

	const width = 10;
	const length = zmax + 2 * buffer;
	const centre = vec3(0, 0, zmax / 2);

	return (
		<div className="ui">
			<div className="settings-camera">
				<input ref={followRef} id="follow" type="checkbox" defaultChecked={true} />
				<label htmlFor="follow">Follow disc</label>

				<input ref={fullRef} type="button" value="Full path" />
				<input ref={throwerRef} type="button" value="Thrower" />
				<input ref={landingRef} type="button" value="Landing" />
			</div>
			<div className="scrubber">
				<input ref={scrubberRef} type="range" min="0" max={count - 1} defaultValue="0" />
			</div>
			<Canvas
				className="main"
				resize={{ scroll: true, debounce: 0 }}
				camera={{ position: [0, 0, -5] }}
			>
				<FlightControls
					ref={controlsRef}
					disc={discRef}
					follow={followRef}
					full={fullRef}
					thrower={throwerRef}
					landing={landingRef}
					centre={centre}
					scrubber={scrubberRef}
					points={points}
					eulers={eulers}
				/>

				<ambientLight color={0x202020} />
				<pointLight position={[0, 20, 25]} intensity={0.5} decay={2} />

				<Disc
					ref={discRef}
					radius={radius}
					aspect={aspect}
					position={points[0]}
					rotation={eulers[0]}
				/>
				<FlightPath radius={radius} points={points} eulers={eulers} />

				<mesh
					position={[0, 0, length / 2 - buffer]}
					rotation={[-Math.PI / 2, 0, 0]}
				>
					<planeGeometry args={[width, length]} />
					<meshStandardMaterial color="#00aa00" />
				</mesh>
			</Canvas>
		</div>
	);
}
