import React from "react";
import { draggable } from "infinity-grid";
import icons from "./icons";

class QueryComponent extends React.Component {

	render() {
		return (
			<g className={this.props.selected ? "selected query" : "query" }>
				<g transform="translate(-20 -20)" {...this.props}>
					{icons[this.props.domain]}
				</g>
				<g transform="translate(20 20)" >
					<circle r="10" onClick={() => console.log("foo")} />
				</g>
			</g>
		);
	}
}

QueryComponent.propTypes = {
	domain: React.PropTypes.string
};

export default draggable(
	(props) => (<svg height="40" width="40" >{icons[props.domain]}</svg>),
	QueryComponent
);