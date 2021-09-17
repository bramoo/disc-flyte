import React from "react";
import uniqueId from "lodash/uniqueId";
import "./SelectInput.css";

export function SelectInput(props) {
	const id = uniqueId();
	const handleChange = (event) => props.onChange(event);

	return (
		<div>
			<label htmlFor={id}>{props.label}</label>
			<select
				id={id}
				name={props.name}
				value={props.value}
				onChange={handleChange}
			>
				{props.children}
			</select>
		</div>
	);
}
