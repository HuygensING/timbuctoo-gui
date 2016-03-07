import React from "react";
import { draggable } from "hire-infinity-grid";
import icons from "./icons";

import EntityComponent from "./entity-component";


class QueryComponent extends React.Component {

	render() {
		return this.props.selected ? (
			<g transform={`translate(${this.props.query.position.x} ${this.props.query.position.y}) scale(${this.props.scale})`}>
				<EntityComponent {...this.props} />
			</g>
		) : (
			<g className="query" onClick={this.props.onSelect} transform={`translate(${this.props.query.position.x} ${this.props.query.position.y}) translate(-20 -20)`} {...this.props}>
				{icons[this.props.query.domain]({className: "handle"})}
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
	scale: React.PropTypes.number,
	selected: React.PropTypes.bool
};

export default QueryComponent;

