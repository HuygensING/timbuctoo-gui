import React from "react";

import EntityComponent from "./entity-component";


class QueryComponent extends React.Component {

	render() {
		return this.props.selected ? (
			<g transform={`translate(${this.props.query.position.x} ${this.props.query.position.y}) scale(${this.props.scale})`}>
				<EntityComponent {...this.props} />
			</g>
		) : (
			<g className="query" onClick={this.props.onSelect}
				transform={`translate(${this.props.query.position.x} ${this.props.query.position.y}) translate(-20 -20) scale(${this.props.scale})`} {...this.props}>
				<text x="13" y="25">{this.props.query.domain}</text>
				<rect className="handle" fill="rgba(0,0,0,0)" height="40" width="150" x="0" y="0"/>
			</g>
		);
	}
}

QueryComponent.propTypes = {
	componentIndex: React.PropTypes.number,
	onDeleteQuery: React.PropTypes.func,
	onSelect: React.PropTypes.func,
	onSetQueryPath: React.PropTypes.func,
	query: React.PropTypes.object,
	scale: React.PropTypes.number,
	selected: React.PropTypes.bool
};

export default QueryComponent;

