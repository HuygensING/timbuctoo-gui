import React from "react";
import DeleteButton from "./delete-button";

import deepEqual from "deep-equal";

let propertyComponent = (props) => {
	const {
		path,
		query,
		baseHeight,
		onDeleteQueryFilter,
		onSetQueryPath,
		orValues,
		componentIndex
	} = props;

	const pathToQuerySelection = query ? query.pathToQuerySelection : [];

	const selected = deepEqual(path, pathToQuerySelection);
	const deleteButton = selected ? (<DeleteButton onSelect={() => onDeleteQueryFilter(componentIndex) } translate="8 -10" />) : null;

	const valuesComponent = orValues.length === 1 ?
		(
			<g onClick={() => onSetQueryPath(path)} transform="translate(12 0)">
				<text>{`${props.name}: ${orValues[0].value}`}</text>
			</g>
		) :
		(
			<g transform="translate(12 0)">
				<g transform="translate(120 0)">
					{orValues.map((v, i) => (
						<g key={i} transform={`translate(0, ${i * baseHeight})`}>
							<text>{v.value}</text>
							{(i < orValues.length - 1 ? (<g transform="translate(5, 15)"><text>+</text></g>) : null)}
						</g>
					))}
				</g>
				<text onClick={() => onSetQueryPath(path)}>{`${props.name}:`}</text>
			</g>
		);

	return (
		<g transform={`translate(0, ${props.topPosition})`}>
			<line stroke="black" strokeWidth="1" x1="0" x2="10" y1="-5" y2="-5" />
			{deleteButton}
			{valuesComponent}
		</g>
	);
};

propertyComponent.propTypes = {
	baseHeight: React.PropTypes.number,
	componentIndex: React.PropTypes.number,
	name: React.PropTypes.string,
	onDeleteQueryFilter: React.PropTypes.func,
	onSetQueryPath: React.PropTypes.func,
	orValues: React.PropTypes.array,
	path: React.PropTypes.array,
	query: React.PropTypes.object,
	topPosition: React.PropTypes.number
};

 export default propertyComponent;