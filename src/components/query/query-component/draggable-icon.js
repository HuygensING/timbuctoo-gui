import React from "react";
import { draggable } from "hire-infinity-grid";



class DraggableIcon extends React.Component {

	render() {
		return (
			<svg height="40" width="150">
				<g>
					<text style={{userSelect: "none"}} x="13" y="25">{this.props.domain}</text>
					<rect {...this.props} fill="rgba(0,0,0,0)" height="40" width="150" x="0" y="0"/>
				</g>
			</svg>
		);
	}
}

DraggableIcon.propTypes = {
	domain: React.PropTypes.string
};

export default draggable(DraggableIcon);