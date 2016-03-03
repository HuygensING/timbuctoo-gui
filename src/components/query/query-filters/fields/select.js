import React from "react";
import Select from "hire-forms-select";

class Field extends React.Component {

	render() {
		return (
			<Select
				onChange={this.props.onChange}
				options={this.props.options}
				placeholder={this.props.name}
			/>
		);
	}
}

Field.propTypes = {
	name: React.PropTypes.string,
	onChange: React.PropTypes.func,
	options: React.PropTypes.array
};

export default Field;