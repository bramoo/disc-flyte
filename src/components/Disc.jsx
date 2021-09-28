import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function Disc(props) {
	const discRef = useRef();
	const { radius, aspect, points, eulers, scrubber } = props;

	useFrame(() => {
		const index = scrubber.current.value;
		discRef.current.position.copy(points[index]);
		discRef.current.rotation.copy(eulers[index]);
	});

	return (
		<mesh
			ref={discRef}
			scale={[radius, radius * aspect, radius]}
			position={points[0]}
			rotation={eulers[0]}
		>
			<sphereGeometry />
			<meshStandardMaterial color="#ffa500" />
		</mesh>
	);
}
