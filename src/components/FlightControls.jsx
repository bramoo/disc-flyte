import React, { useEffect, useRef } from "react";
import { Box3, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import mergeRefs from "react-merge-refs";
import { OrbitControls } from "@react-three/drei";

export const FlightControls = React.forwardRef(
	(
		{
			disc: discRef,
			follow: followRef,
			full: fullRef,
			thrower: throwerRef,
			landing: landingRef,
			scrubber: scrubberRef,
			centre,
			points,
			eulers,
			...props
		},
		ref
	) => {
		const controlsRef = useRef();

		const initialPos = new Vector3(0, 1.8, -5);
		let lastIndex = scrubberRef.current.value;
		let diff = new Vector3();
		let targetLook = points[lastIndex].clone();
		let bbox = new Box3().setFromPoints(points);
		let targetPos = initialPos.clone();
		let doLerp = true;

		const vectorDifference = (vec3, from, to) => vec3.copy(to).sub(from);

		const handleFull = () => {
			doLerp = true;
			followRef.current.checked = false;
			targetLook.copy(centre);
			targetPos.set(bbox.max.x + 5, bbox.max.y, bbox.min.z - 5);
		};

		const handleThrower = () => {
			doLerp = true;
			followRef.current.checked = false;
			targetLook.copy(points[0]);
			targetPos.set(0, 1.8, -5);
		}

		const handleLanding = () => {
			doLerp = true;
			followRef.current.checked = false;
			const last = points[points.length - 1]
			targetLook.copy(last);
			targetPos.copy(bbox.max).add(new Vector3(5, 0, 5));
		}

		useEffect(() => {
			const r = fullRef.current;
			r.addEventListener("click", handleFull);
			return () => r.removeEventListener("click", handleFull);
		});

		useEffect(() => {
			const r = throwerRef.current;
			r.addEventListener("click", handleThrower);
			return () => r.removeEventListener("click", handleThrower);
		});

		useEffect(() => {
			const r = landingRef.current;
			r.addEventListener("click", handleLanding);
			return () => r.removeEventListener("click", handleLanding);
		});

		useFrame(() => {
			const index = scrubberRef.current.value;

			if (index !== lastIndex) {
				vectorDifference(diff, discRef.current.position, points[index]);
				discRef.current.position.copy(points[index]);
				discRef.current.rotation.copy(eulers[index]);

				if (followRef.current.checked) {
					doLerp = true;
					targetPos.add(diff);
					targetLook.copy(points[index]);
				}
			}

			if (doLerp) {
				controlsRef.current.target.lerp(targetLook, 0.1);
				controlsRef.current.object.position.lerp(targetPos, 0.1);
			}

			lastIndex = index;
		});

		return (
			<OrbitControls
				ref={mergeRefs([controlsRef, ref])}
				onStart={() => (doLerp = false)}
				onEnd={() =>
					targetPos.copy(controlsRef.current.object.position)
				}
				{...props}
			/>
		);
	}
);

export default FlightControls;
