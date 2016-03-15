import React from "react";
import deepEqual from "deep-equal";

import TextBox from "./util/text-box";
import DeleteButton from "./util/delete-button";
import DirectionToggle from "./util/direction-toggle";


class RelationComponent extends React.Component {
	onChangeDirection() {
		switch (this.props.relation.direction) {
			case "both": return this.props.onQueryChange("direction", "out");
			case "out": return this.props.onQueryChange("direction", "in");
			case "in": return this.props.onQueryChange("direction", "both");
		}
	}

	render() {
		const {
			componentIndex,
			topPosition,
			relation,
			subComponent,
			path,
			onDeleteQueryFilter,
			onSetQueryPath,
			query
		} = this.props;
		const pathToQuerySelection = query ? query.pathToQuerySelection : [];

		const selected = deepEqual(path, pathToQuerySelection);
		const deleteButton = selected ? (<DeleteButton onSelect={() => onDeleteQueryFilter(componentIndex) } translate="10 -20" />) : null;
		const directionToggle = selected ?
			(<DirectionToggle direction={relation.direction} onSelect={this.onChangeDirection.bind(this)} selected={true} />) :
			(<DirectionToggle direction={relation.direction} selected={false} />);

		return (
			<g transform={`translate(0, ${topPosition + 10})`}>
				<line stroke="black" strokeWidth="1" x1="0" x2="10" y1="-5" y2="-5" />
				<line stroke="black" strokeWidth="1" x1="180" x2="190" y1="-5" y2="-5" />
				<g transform="translate(210 0)">
					{subComponent}
				</g>
				<TextBox {...this.props}
					className={`relation handle ${selected ? "selected" :""}`}
					height="30"
					onSelect={() => onSetQueryPath(path)}
					rx="5" ry="5" text={relation.name}
					width="170" x="10" y="-20"
				/>
				{deleteButton}
				{directionToggle}
			</g>
		);
	}
}

RelationComponent.propTypes = {
	baseHeight: React.PropTypes.number,
	componentIndex: React.PropTypes.number,
	onDeleteQueryFilter: React.PropTypes.func,
	onQueryChange: React.PropTypes.func,
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