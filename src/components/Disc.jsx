import React from "react";

export const Disc = React.forwardRef(
	({ radius, aspect, ...props }, ref) => {
		return (
			<mesh
				ref={ref}
				scale={[radius, radius * aspect, radius]}
				{...props}
			>
				<sphereGeometry />
				<meshStandardMaterial color="#ffa500" />
			</mesh>
		);
	}
);

export default Disc;