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
			const selected = deepEqual(path.concat(["or", i]), pathToQuerySelection);
			const deleteButton = selected ? (<DeleteButton onSelect={() => onDeleteQueryFilter(componentIndex) } translate="-5 -16" />) : null;

			return (
				<g key={i} transform={`translate(0, ${i * baseHeight})`}>
					<TextBox {...this.props}
						className={`property-value handle ${selected ? "selected" :""}`}
						height="21"
						onSelect={() => this.onClick(i)}
						rx="3" ry="3" text={v.label || v.value}
						transform="translate(0, 3)"
						width="130" x="-5" y="-20"
					/>

					{(i < orValues.length - 1 ? <text transform="translate(55, 15) scale(0.5)">+</text> : null)}
					{deleteButton}
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