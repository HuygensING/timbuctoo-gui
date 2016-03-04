import React from "react";

let deleteButton = (props) => (
	<g className="delete-button" onClick={props.onSelect} transform={`translate(${props.translate || "-20 -20"})`} >
		<circle r="8" />
		<line stroke="white" strokeWidth="1" x1="-3" x2="3" y1="-3" y2="3" />
		<line stroke="white" strokeWidth="1" x1="-3" x2="3" y1="3" y2="-3" />
	</g>
);

deleteButton.propTypes = {
	onSelect: React.PropTypes.func,
	translate: React.PropTypes.string
};

 export default deleteButton;