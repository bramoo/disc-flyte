import React from "react";
import uniqueId from "lodash/uniqueId";
import "./InlineNumberInput.css";

export function InlineNumberInput(props) {
	const id = uniqueId();
	const handleChange = (event) => props.onChange(event);

	return (
		<div>
			<label htmlFor={id}>{props.label}</label>
			<input
				id={id}
				name={props.name}
				type="number"
				value={props.value}
				onChange={handleChange}
			/>
		</div>
	);
}
