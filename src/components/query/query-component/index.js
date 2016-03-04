import React from "react";
import { draggable } from "hire-infinity-grid";
import icons from "./icons";

import EntityComponent from "./entity-component";


class QueryComponent extends React.Component {

	render() {
		return this.props.selected ? (
			<g transform={`scale(${this.props.scale})`}>
				<EntityComponent {...this.props} />
			</g>
		) : (
			<g className="query" transform="translate(-20 -20)" {...this.props}>
				{icons[this.props.domain]({className: "handle"})}
			</g>
		);
	}
}

QueryComponent.propTypes = {
	componentIndex: React.PropTypes.number,
	domain: React.PropTypes.string,
	onDeleteQuery: React.PropTypes.func,
	onSetQueryPath: React.PropTypes.func,
	query: React.PropTypes.object,
	selected: React.PropTypes.bool
};

export default draggable(
	(props) => (
		<svg height="40" width="40">{icons[props.domain]()}</svg>
	),
	QueryComponent
);