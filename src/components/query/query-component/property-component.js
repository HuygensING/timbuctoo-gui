import React from "react";
import deepEqual from "deep-equal";
import TextBox from "./util/text-box";
import DeleteButton from "./util/delete-button";


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
	const deleteButton = selected ? (<DeleteButton onSelect={() => onDeleteQueryFilter(componentIndex) } translate="0 -2" />) : null;

	const valuesComponent = orValues.length === 1 ?
		(
			<g onClick={() => onSetQueryPath(path)} transform="translate(154, 2)">
				<text>{`${orValues[0].value}`}</text>
			</g>
		) :
		(
			<g transform="translate(154 2)">
				{orValues.map((v, i) => {
					const valSelected = deepEqual(path.concat(["or", i]), pathToQuerySelection);
					const valDelete = valSelected ? (<DeleteButton onSelect={() => onDeleteQueryFilter(componentIndex) } translate="-15 -5" />) : null;

					return (
						<g key={i} transform={`translate(0, ${i * baseHeight})`}>
							<text onClick={() => onSetQueryPath(path.concat(["or", i]))}>{v.value}</text>
							{(i < orValues.length - 1 ? (<g transform="translate(5, 15)"><text>+</text></g>) : null)}
							{valDelete}
						</g>
					);
				})}
			</g>
		);

	return (
		<g transform={`translate(0, ${props.topPosition})`}>
			<line stroke="black" strokeWidth="1" x1="0" x2="10" y1="-2" y2="-2" />
			<line stroke="black" strokeWidth="1" x1="140" x2="150" y1="-2" y2="-2" />
			{deleteButton}
			<g transform="translate(0, 2)">
				<TextBox {...props}
					className={`property handle ${selected ? "selected" :""}`}
					height="21"
					onSelect={() => onSetQueryPath(path)}
					rx="3" ry="3" text={props.name}
					transform="translate(0, 5)"
					width="130" x="10" y="-20"
				/>
				{valuesComponent}
			</g>
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