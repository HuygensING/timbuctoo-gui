import React from "react";

let propertyComponent = (props) => (
	<g transform={`translate(0, ${props.index * props.basePropertyComponentHeight})`}>
		<line stroke="black" x1="0" x2="0" y1={-props.basePropertyComponentHeight - 5} y2="-5" />
		<line stroke="black" strokeWidth="1" x1="0" x2="10" y1="-5" y2="-5" />
		<g transform="translate(12 0)">
			<text>{`${props.name}: ${props.value}`}</text>
		</g>
	</g>
);

propertyComponent.propTypes = {
	basePropertyComponentHeight: React.PropTypes.number,
	index: React.PropTypes.number,
	name: React.PropTypes.string,
	value: React.PropTypes.string
};

 export default propertyComponent;