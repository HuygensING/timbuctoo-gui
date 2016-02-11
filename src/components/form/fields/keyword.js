import React from "react";
import SelectList from "hire-forms-select-list";


class KeywordField extends React.Component {

	onChange(values) {
		const currentValues = this.props.entity.data["@relations"][this.props.name] || [];
		this.props.onChange(
			["@relations", this.props.name],
			values
				.map((val) => {
					return {
						"id": val.key,
						"displayName": val.value,
						...(currentValues.find((curVal) => curVal.id === val.key) || {}),
						accepted: true
					};
				})
		);
	}

	render() {
		const values = this.props.entity.data["@relations"][this.props.name] || [];
		return (
			<div>
				<label>{this.props.name}</label>
				<SelectList
					onChange={this.onChange.bind(this)}
					options={this.props.fieldDefinition.options}
					values={values.filter((val) => val.accepted).map((val) => { return { value: val.displayName, key: val.id}; })}
				/>
			</div>
		);
	}
}

KeywordField.propTypes = {
	entity: React.PropTypes.object,
	fieldDefinition: React.PropTypes.object,
	name: React.PropTypes.string,
	onChange: React.PropTypes.func
};

export default KeywordField;