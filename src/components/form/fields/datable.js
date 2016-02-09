import React from "react";

class Field extends React.Component {
	render() {
		return (
			<span>{this.props.name}</span>
		);
	}
}

Field.propTypes = {
	name: React.PropTypes.string
};

export default Field;