import React from "react";
import Input from "hire-forms-input";
import {validateDate} from "../validations";


class DatableField extends React.Component {
	render() {
		return (
			<div>
				<label>{this.props.name}</label>
				<Input
					onChange={this.props.onChange.bind(this, [this.props.name])}
					validate={validateDate}
					value={this.props.entity.data[this.props.name]}
				/>
			</div>
		);
	}
}

DatableField.propTypes = {
	entity: React.PropTypes.object,
	name: React.PropTypes.string,
	onChange: React.PropTypes.func
};

export default DatableField;