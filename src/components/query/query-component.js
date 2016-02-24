import React from "react";
import { draggable, actions as gridActions } from "infinity-grid";
import icons from "./icons";

class QueryComponent extends React.Component {

	render() {
		return this.props.selected ? (
			<g className="selected query">
				<g transform="translate(-20 -20)" {...this.props}>
					{icons[this.props.domain]({className: "handle"})}
				</g>
				<g transform="translate(20 20)" >
					<circle onClick={() => gridActions.onSetComponentProps({deleted: true}, this.props.componentIndex)} r="10" />
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
	(props) => (<svg height="40" width="40" >{icons[props.domain]()}</svg>),
	QueryComponent
);