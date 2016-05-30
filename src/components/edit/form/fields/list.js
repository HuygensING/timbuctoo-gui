import React from "react";
import MultiForm from "hire-forms-multi-form";

class List extends React.Component {

	render() {

		return <div><label>{this.props.name}</label></div>;
	}
}

List.propTypes = {
	name: React.PropTypes.string
};

export default List;