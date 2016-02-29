import React from "react";
import deepEqual from "deep-equal";
import DeleteButton from "./delete-button";

class RelationComponent extends React.Component {
	render() {
		const {
			baseHeight,
			componentIndex,
			topPosition,
			relation,
			subComponent,
			path,
			onDeleteQuery,
			onSetQueryPath,
			query
		} = this.props;
		const pathToQuerySelection = query ? query.pathToQuerySelection : [];

		const selected = deepEqual(path, pathToQuerySelection);
		const deleteButton = selected ? (<DeleteButton onSelect={() => onDeleteQuery(componentIndex) } translate="8 -20" />) : null;

		return (
			<g transform={`translate(0, ${topPosition + 10})`}>
				<line stroke="black" x1="0" x2="0" y1={-baseHeight - topPosition} y2="-5" />
				<line stroke="black" strokeWidth="1" x1="0" x2="10" y1="-5" y2="-5" />
				<g transform={`translate(${45 - (relation.name.length * 2)} 0)`}>
					<text>{relation.name}</text>
				</g>

				<line stroke="black" strokeWidth="1" x1="150" x2="180" y1="-5" y2="-5" />
				<g transform="translate(200 0)">
					{subComponent}
				</g>
				<rect {...this.props}
					className={`relation handle ${selected ? "selected" :""}`}
					height="30"
					onClick={() => onSetQueryPath(path)}
					rx="5" ry="5" width="140" x="10" y="-20" />
				{deleteButton}
			</g>
		);
	}
}

RelationComponent.propTypes = {
	baseHeight: React.PropTypes.number,
	componentIndex: React.PropTypes.number,
	onDeleteQuery: React.PropTypes.func,
	onSetQueryPath: React.PropTypes.func,
	path: React.PropTypes.array,
	pathToQuerySelection: React.PropTypes.array,
	query: React.PropTypes.object,
	relation: React.PropTypes.object,
	relationComponentHeight: React.PropTypes.number,
	subComponent: React.PropTypes.object,
	topPosition: React.PropTypes.number
};

export default RelationComponent;