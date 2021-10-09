import React, { useRef } from "react";
import mitt from "mitt";

export const CameraSettings = React.forwardRef((props, ref) => {
	const followRef = useRef();
	const emitter = mitt();

	const setFollow = (checked) => {
		if (followRef.current) {
			followRef.current.checked = checked;
			ref.current.follow = checked;
		}
	};

	const followChanged = (event) => {
		ref.current.follow = event.target.checked;
		emitter.emit("follow");
	};

	ref.current = {
		events: emitter,
		follow: true,
		setFollow: setFollow,
	};

	return (
		<div {...props}>
			<div>
				<input
					ref={followRef}
					id="follow"
					type="checkbox"
					defaultChecked={true}
					onChange={followChanged}
				/>
				<label htmlFor="follow">Follow disc</label>
			</div>

			<input
				type="button"
				value="Full path"
				onClick={() => emitter.emit("full")}
			/>
			<input
				type="button"
				value="Thrower"
				onClick={() => emitter.emit("thrower")}
			/>
			<input
				type="button"
				value="Landing"
				onClick={() => emitter.emit("landing")}
			/>
		</div>
	);
});
