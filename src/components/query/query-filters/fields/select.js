import React from "react";
import Select from "hire-forms-select";

class Field extends React.Component {

	onChange(value) {

		this.props.onAddQueryFilter(["and"], {
			type: "property",
			name: this.props.name,
			or: [{type: "value", value: value}]
		});
	}

	render() {
		return (
			<Select
				onChange={this.onChange.bind(this)}
				options={this.props.options}
				placeholder={this.props.name}
			/>
		);
	}
}

Field.propTypes = {
	name: React.PropTypes.string,
	onAddQueryFilter: React.PropTypes.func,
	options: React.PropTypes.array
};

export default Field;