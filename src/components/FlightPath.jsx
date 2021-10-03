import React, { useMemo } from "react";
import * as THREE from "three";
import { interpolateSpectral } from "d3-scale-chromatic";
import { vec3 } from "../simulation/util";

const intensity = 30;
const intensify = (x) => 1 / (1 + Math.exp(intensity * (x - 0.5)));

export default function FlightPath(props) {
	const radius = props.radius;
	const points = props.points;
	const eulers = props.eulers;

	const hyzer = eulers.map((e) => (e.z + Math.PI / 2) / Math.PI);

	const lefts = eulers.map((e, i) =>
		vec3(-radius, 0, 0).applyEuler(e).add(points[i])
	);
	const rights = eulers.map((e, i) =>
		vec3(radius, 0, 0).applyEuler(e).add(points[i])
	);
	const normals = eulers.map((e) => vec3(0, -1, 0).applyEuler(e));

	const ribbonGeometry = useMemo(() => {
		let vertices = [];
		let norms = [];
		let colours = [];
		for (let i = 0; i < lefts.length; i++) {
			let c = new THREE.Color(
				interpolateSpectral(intensify(hyzer[i]))
			).toArray();

			vertices.push(lefts[i].toArray());
			norms.push(normals[i].toArray());
			colours.push(c);

			vertices.push(rights[i].toArray());
			norms.push(normals[i].toArray());
			colours.push(c);
		}

		let indices = [];
		for (let i = 0; i < lefts.length - 1; i++) {
			indices.push(i * 2, i * 2 + 1, i * 2 + 2); // triangle 1
			indices.push(i * 2 + 1, i * 2 + 3, i * 2 + 2); // triangle 2
		}

		let geom = new THREE.BufferGeometry();
		geom.setIndex(indices);
		geom.setAttribute(
			"position",
			new THREE.Float32BufferAttribute(vertices.flat(), 3)
		);
		geom.setAttribute(
			"normal",
			new THREE.Float32BufferAttribute(norms.flat(), 3)
		);
		geom.setAttribute(
			"color",
			new THREE.Float32BufferAttribute(colours.flat(), 3)
		);
		return geom;
	}, [lefts, rights, normals, hyzer]);

	return (
		<mesh>
			<primitive object={ribbonGeometry} attach="geometry" />
			<meshBasicMaterial
				toneMapped={false}
				vertexColors
				side={THREE.DoubleSide}
			/>
		</mesh>
	);
}
