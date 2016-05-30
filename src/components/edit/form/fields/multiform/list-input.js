import React from "react";
import form from "hire-forms-form";
import Input from "hire-forms-input";

class ListInput extends React.Component {
	render() {
		const value = typeof this.props.formData === "object" ? "" : this.props.formData;
		return <Input onChange={this.props.handleChange.bind(this, [])} value={value} />;
	}
}

ListInput.propTypes = {
	formData: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
	handleChange: React.PropTypes.func
};

export default form(ListInput, "hire-forms-link-form");