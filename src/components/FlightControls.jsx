import React, { useRef } from "react";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function FlightControls({
	disc: discRef,
	follow: followRef,
	scrubber: scrubberRef,
	centre,
	points,
	eulers,
	...props
}) {
	const controlsRef = useRef();

	let lastIndex = scrubberRef.current.value;
	let diff = new Vector3();

	const vectorDifference = (vec3, from, to) => vec3.copy(to).sub(from);

	useFrame(() => {
		const index = scrubberRef.current.value;

		if (index !== lastIndex) {
			vectorDifference(diff, discRef.current.position, points[index]);
			discRef.current.position.copy(points[index]);
			discRef.current.rotation.copy(eulers[index]);

			if (followRef.current.checked) {
				controlsRef.current.target.copy(points[index]);
				controlsRef.current.object.position.add(diff);
				controlsRef.current.object.lookAt(points[index]);
			}
		}

		lastIndex = index;
	});

	return <OrbitControls ref={controlsRef} {...props} />;
}
