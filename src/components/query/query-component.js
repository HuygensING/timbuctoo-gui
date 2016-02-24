import React from "react";
import { draggable } from "infinity-grid";
import icons from "./icons";

class QueryComponent extends React.Component {

	render() {
		return this.props.selected ? (
			<g className="selected query">
				<g transform="translate(-20 -20)" {...this.props}>
					{icons[this.props.domain]({className: "handle"})}
				</g>
				<g onClick={() => this.props.onDeleteQuery(this.props.componentIndex) } transform="translate(-20 -20)" >
					<circle r="8" />
					<line x1="-3" x2="3" y1="-3" y2="3" strokeWidth="1" stroke="white" />
					<line x1="-3" x2="3" y1="3" y2="-3" strokeWidth="1" stroke="white" />
				</g>
			</g>
		) : (
			<g className="query" transform="translate(-20 -20)" {...this.props}>
				{icons[this.props.domain]({className: "handle"})}
			</g>
		);
	}
}

QueryComponent.propTypes = {
	domain: React.PropTypes.string
};

export default draggable(
	(props) => (<svg height="40" width="40">{icons[props.domain]()}</svg>),
	QueryComponent
);