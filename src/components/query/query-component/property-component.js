import React from "react";
import deepEqual from "deep-equal";
import PropertyValuesComponent from "./property-values-component";
import TextBox from "./util/text-box";
import DeleteButton from "./util/delete-button";


let propertyComponent = (props) => {
	const {
		path,
		query,
		onDeleteQueryFilter,
		onSetQueryPath,
		componentIndex
	} = props;

	const pathToQuerySelection = query ? query.pathToQuerySelection : [];

	const selected = deepEqual(path, pathToQuerySelection);
	const deleteButton = selected ? (<DeleteButton onSelect={() => onDeleteQueryFilter(componentIndex) } translate="10 -14" />) : null;

	return (
		<g transform={`translate(0, ${props.topPosition})`}>
			<line stroke="black" strokeWidth="1" x1="0" x2="10" y1="-2" y2="-2" />
			<line stroke="black" strokeWidth="1" x1="90" x2="100" y1="-2" y2="-2" />
			<g transform="translate(0, 2)">
				<TextBox {...props}
					className={`property handle ${selected ? "selected" :""}`}
					height="21"
					onSelect={() => onSetQueryPath(path)}
					rx="3" ry="3" text={props.name === "tim_id" ? "is" : props.name}
					transform="translate(0, 5)"
					width="80" x="10" y="-20"
				/>
				<PropertyValuesComponent {...props} onSelect={(subPath) => onSetQueryPath(subPath)} pathToQuerySelection={pathToQuerySelection} transform="translate(104 2)" />
			</g>
			{deleteButton}
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