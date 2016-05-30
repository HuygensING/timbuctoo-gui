import React from "react";
import MultiForm from "hire-forms-multi-form";

class AltNames extends React.Component {

	render() {

		return <div><label>{this.props.name}</label></div>;
	}
}

AltNames.propTypes = {
	name: React.PropTypes.string
};

export default AltNames;