import React, { useEffect, useRef } from "react";
import { Box3, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import mergeRefs from "react-merge-refs";
import { OrbitControls } from "@react-three/drei";

export const FlightControls = React.forwardRef(
	(
		{
			disc: discRef,
			cameraSettings: cameraSettingsRef,
			scrubber: scrubberRef,
			centre,
			points,
			eulers,
			...props
		},
		ref
	) => {
		const controlsRef = useRef();

		const initialPos = points[0].clone().setZ(-5);
		let lastIndex = scrubberRef.current.value;
		let diff = new Vector3();
		let targetLook = points[lastIndex].clone();
		let targetPos = initialPos.clone();
		let bbox = new Box3().setFromPoints(points);
		let doLerp = true;

		const vectorDifference = (vec3, from, to) => vec3.copy(to).sub(from);

		const handleFollow = () => {
			if (cameraSettingsRef.current.follow) {
				doLerp = true;
				targetLook.copy(points[lastIndex]);
			}
		};

		const handleFull = () => {
			doLerp = true;
			cameraSettingsRef.current.setFollow(false);
			targetLook.copy(centre);
			targetPos.set(bbox.max.x + 5, bbox.max.y, bbox.min.z - 5);
		};

		const handleThrower = () => {
			doLerp = true;
			cameraSettingsRef.current.setFollow(false);
			targetLook.copy(points[0]);
			targetPos.copy(points[0]).setZ(-5);
		};

		const handleLanding = () => {
			doLerp = true;
			cameraSettingsRef.current.setFollow(false);
			const last = points[points.length - 1];
			targetLook.copy(last);
			targetPos.copy(bbox.max).add(new Vector3(5, 0, 5));
		};

		useEffect(() => {
			const e = cameraSettingsRef.current.events;
			e.on("follow", handleFollow);
			return () => e.off("follow", handleFollow);
		});

		useEffect(() => {
			const e = cameraSettingsRef.current.events;
			e.on("full", handleFull);
			return () => e.off("full", handleFull);
		});

		useEffect(() => {
			const e = cameraSettingsRef.current.events;
			e.on("thrower", handleThrower);
			return () => e.off("thrower", handleThrower);
		});

		useEffect(() => {
			const e = cameraSettingsRef.current.events;
			e.on("landing", handleLanding);
			return () => e.off("landing", handleLanding);
		});

		useFrame(() => {
			const index = scrubberRef.current.value;

			if (index !== lastIndex) {
				vectorDifference(diff, discRef.current.position, points[index]);
				discRef.current.position.copy(points[index]);
				discRef.current.rotation.copy(eulers[index]);

				if (cameraSettingsRef.current.follow) {
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
