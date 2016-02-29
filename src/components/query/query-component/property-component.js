import React from "react";
import DeleteButton from "./delete-button";

import deepEqual from "deep-equal";

let propertyComponent = (props) => {
	const {
		path,
		query,
		onDeleteQuery,
		onSetQueryPath,
		componentIndex
	} = props;

	const pathToQuerySelection = query ? query.pathToQuerySelection : [];

	const selected = deepEqual(path, pathToQuerySelection);
	const deleteButton = selected ? (<DeleteButton onSelect={() => onDeleteQuery(componentIndex) } translate="8 -10" />) : null;

	return (
		<g transform={`translate(0, ${props.topPosition})`}>
			<line stroke="black" strokeWidth="1" x1="0" x2="10" y1="-5" y2="-5" />
			{deleteButton}
			<g onClick={() => onSetQueryPath(path)} transform="translate(12 0)">
				<text>{`${props.name}: ${props.value}`}</text>
			</g>
		</g>
	);
};

propertyComponent.propTypes = {
	baseHeight: React.PropTypes.number,
	name: React.PropTypes.string,
	topPosition: React.PropTypes.number,
	value: React.PropTypes.string
};

 export default propertyComponent;