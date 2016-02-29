import React from "react";

let directionToggle = (props) => (

	<g className={`direction-toggle ${props.selected ? "selected" : ""}`} transform="translate(80 25)">
		<line x1="-20" x2="20" y1="0" y2="0" />

		{props.direction === "both" || props.direction === "in" ? <line x1="-20" x2="-15" y1="0" y2="-5" /> : null}
		{props.direction === "both" || props.direction === "in" ? <line x1="-20" x2="-15" y1="0" y2="5" /> : null}
		{props.direction === "both" || props.direction === "out" ? <line x1="20" x2="15" y1="0" y2="-5" /> : null}
		{props.direction === "both" || props.direction === "out" ? <line x1="20" x2="15" y1="0" y2="5" /> : null}
		<rect height="20" onClick={props.onSelect} width="40" x="-20" y="-10" />
	</g>
);

directionToggle.propTypes = {
	direction: React.PropTypes.string,
	onSelect: React.PropTypes.func,
	selected: React.PropTypes.bool
};

 export default directionToggle;