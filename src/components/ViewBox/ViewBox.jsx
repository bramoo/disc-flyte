import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Delaunay } from "d3-delaunay";

import { FlightPath } from "../FlightPath";
import { vec3 } from "../../simulation/util";

import "./ViewBox.css";

const buffer = 5;

export function ViewBox(props) {
	let canvas = useRef();
	let camera = useRef();

	let [polyString, setPolyString] = useState("");
	let [delaunay, setDelaunay] = useState({});
	let [voronoi, setVoronoi] = useState({});

	const points = props.result.pos_g.map((v) => vec3(v.y, v.z, v.x));

	const onEnd = () => {
		console.log("controls ended from viewbox");
		if (camera.current) {
			let proj = points.map((p) => p.clone().project(camera.current));

			console.time("delaunay + voronoi");
			console.time("delaunay");
			let d = Delaunay.from(
				proj,
				(p) => p.x,
				(p) => -p.y
			);
			console.timeEnd("delaunay");
			console.time("voronoi");
			let v = d.voronoi([-1, -1, 2, 2]);
			console.timeEnd("voronoi");
			console.timeEnd("delaunay + voronoi");

			let string = proj.map((p) => `${p.x},${-p.y}`).join(" ");
			setDelaunay(d);
			setVoronoi(v);
			setPolyString(string);

			if (canvas.current) {
				canvas.current.removeEventListener(
					"mousemove",
					handleMouseMove
				);
				canvas.current.addEventListener(
					"mousemove",
					handleMouseMove(v)
				);
			}
		}
	};

	const handleMouseMove = (v) => (event) => {
		let c = canvas.current;
		let hw = c.width / 2;
		let hh = c.height / 2;
		let x = (event.clientX - hw) / hw;
		let y = -(event.clientY - hh) / hh;
		console.log(x, y);

		for (let i = 0; i < points.length; i++) {
			if (v.contains(i, x, y)) {
				console.log(`point found in ${i}`);
			}
		}
	};

	let zs = props.result.pos_g.map((v) => v.x);
	let zmax = Math.max.apply(Math, zs);

	const width = 10;
	const length = zmax + 2 * buffer;

	return (
		<>
			<Canvas ref={canvas} resize={{ scroll: true, debounce: 0 }}>
				<PerspectiveCamera
					ref={camera}
					makeDefault
					position={[0, 0, -5]}
				/>
				<OrbitControls
					target={[0, 0, 35]}
					enableDamping={false}
					onEnd={onEnd}
				/>

				<ambientLight color={0x202020} />
				<pointLight position={[0, 20, 25]} intensity={0.5} decay={2} />

				<FlightPath radius={0.1} aspect={0.1} result={props.result} />

				<mesh
					position={[0, 0, length / 2 - buffer]}
					rotation={[-Math.PI / 2, 0, 0]}
				>
					<planeGeometry args={[width, length]} />
					<meshStandardMaterial color="#00aa00" />
				</mesh>
			</Canvas>
			<svg viewBox="-1 -1 2 2" preserveAspectRatio="none">
				<g>
					<path
						d={voronoi.render && voronoi.render()}
						fill="none"
						stroke="black"
						strokeWidth="0.001"
					/>
					<polyline
						points={polyString}
						fill="none"
						stroke="black"
						strokeWidth="0.01"
					/>
				</g>
			</svg>
		</>
	);
}
