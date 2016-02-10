import React from "react";
import SelectList from "hire-forms-select-list";


class MultiSelect extends React.Component {
	render() {
		return (
			<div>
				<label>{this.props.name}</label>
				<SelectList
					onChange={this.props.onChange.bind(this, [this.props.name])}
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