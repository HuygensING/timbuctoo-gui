import React from "react";
import SelectList from "hire-forms-select-list";


class MultiSelect extends React.Component {

	onChange(values) {
		this.props.onChange([this.props.name], values.filter((val, idx, me) => me.indexOf(val) === idx));
	}

	render() {
		return (
			<div>
				<label>{this.props.name}</label>
				<SelectList
					onChange={this.onChange.bind(this)}
					options={this.props.options}
					values={this.props.entity.data[this.props.name]}
				/>
			</div>
		);
	}
}

MultiSelect.propTypes = {
	entity: React.PropTypes.object,
	name: React.PropTypes.string,
	onChange: React.PropTypes.func,
	options: React.PropTypes.array
};

export default MultiSelect;