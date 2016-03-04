import React from "react";
import Input from "hire-forms-input";

class StringField extends React.Component {
	render() {
		return (
			<div>
				<label>{this.props.name}</label>
				<Input
					onChange={this.props.onChange.bind(this, [this.props.name])}
					value={this.props.entity.data[this.props.name] || ""}
				/>
			</div>
		);
	}
}

StringField.propTypes = {
	entity: React.PropTypes.object,
	name: React.PropTypes.string,
	onChange: React.PropTypes.func
};

export default StringField;