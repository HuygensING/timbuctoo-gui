import React from "react";
import { draggable } from "hire-infinity-grid";
import icons from "./icons";

class DraggableIcon extends React.Component {

	render() {
		return (
			<svg height="40" width="40">{icons[this.props.domain]()}</svg>
		);
	}
}

DraggableIcon.propTypes = {
	domain: React.PropTypes.string
};

export default draggable(DraggableIcon);