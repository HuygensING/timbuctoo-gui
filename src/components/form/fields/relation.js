import React from "react";
import AutocompleteList from "hire-forms-autocomplete-list";
import getAutocompleteValues from "../../../actions/autocomplete";

class RelationField extends React.Component {

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
				<AutocompleteList
					async={(query, done) => getAutocompleteValues(this.props.path, query, this.props.vre, done) }
					onChange={this.onChange.bind(this)}
					values={values.filter((val) => val.accepted).map((val) => { return { value: val.displayName, key: val.id}; })} />
			</div>
		);
	}
}

RelationField.propTypes = {
	entity: React.PropTypes.object,
	fieldDefinition: React.PropTypes.object,
	name: React.PropTypes.string,
	onChange: React.PropTypes.func,
	path: React.PropTypes.string,
	vre: React.PropTypes.string
};

export default RelationField;