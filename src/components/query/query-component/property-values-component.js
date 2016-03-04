import React from "react";
import deepEqual from "deep-equal";
import TextBox from "./util/text-box";
import DeleteButton from "./util/delete-button";


class PropertyValuesComponent extends React.Component {

	onClick(orIndex) {
		const { orValues, path } = this.props;
		if(orValues.length > 1) {
			return this.props.onSelect(path.concat(["or", orIndex]));
		}
		this.props.onSelect(path);
	}

	render() {
		const {
			baseHeight,
			componentIndex,
			onDeleteQueryFilter,
			orValues,
			path,
			pathToQuerySelection,
			transform
		} = this.props;

		return (<g transform={transform}>{orValues.map((v, i) => {
			const valSelected = deepEqual(path.concat(["or", i]), pathToQuerySelection);
			const valDelete = valSelected ? (<DeleteButton onSelect={() => onDeleteQueryFilter(componentIndex) } translate="-15 -5" />) : null;

			return (
				<g key={i} transform={`translate(0, ${i * baseHeight})`}>
					<text onClick={() => this.onClick(i)}>{v.value}</text>
					{(i < orValues.length - 1 ? (<g transform="translate(5, 15)"><text>+</text></g>) : null)}
					{valDelete}
				</g>
			);
		})}</g>);
	}
}

PropertyValuesComponent.propTypes = {
	baseHeight: React.PropTypes.number,
	componentIndex: React.PropTypes.number,
	onDeleteQueryFilter: React.PropTypes.func,
	onSelect: React.PropTypes.func,
	orValues: React.PropTypes.array,
	path: React.PropTypes.array,
	pathToQuerySelection: React.PropTypes.array,
	transform: React.PropTypes.string
};

 export default PropertyValuesComponent;