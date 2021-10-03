import React, { useRef } from "react";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import mergeRefs from "react-merge-refs";
import { OrbitControls } from "@react-three/drei";

export const FlightControls = React.forwardRef(
	(
		{
			disc: discRef,
			follow: followRef,
			scrubber: scrubberRef,
			centre,
			points,
			eulers,
			...props
		},
		ref
	) => {
		const controlsRef = useRef();

		let initialPos = new Vector3(0, 1.8, -5);
		let lastIndex = scrubberRef.current.value;
		let diff = new Vector3();
		let targetLook = points[lastIndex].clone();
		let targetPos = initialPos.clone();
		let doLerp = true;

		const vectorDifference = (vec3, from, to) => vec3.copy(to).sub(from);

		useFrame(() => {
			const index = scrubberRef.current.value;

			if (index !== lastIndex) {
				doLerp = true;
				vectorDifference(diff, discRef.current.position, points[index]);
				discRef.current.position.copy(points[index]);
				discRef.current.rotation.copy(eulers[index]);

				if (followRef.current.checked) {
					targetPos.add(diff);
					targetLook.copy(points[index]);
				}
			}

			if (followRef.current.checked && doLerp) {
				controlsRef.current.target.lerp(targetLook, 0.1);
				controlsRef.current.object.position.lerp(targetPos, 0.1);
			}

			lastIndex = index;
		});

		return (
			<OrbitControls
				ref={mergeRefs([controlsRef, ref])}
				{...props}
				onStart={() => (doLerp = false)}
				onEnd={() =>
					targetPos.copy(controlsRef.current.object.position)
				}
			/>
		);
	}
);

export default FlightControls;
