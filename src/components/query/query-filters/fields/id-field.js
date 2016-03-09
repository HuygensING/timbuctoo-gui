import React from "react";
import Autocomplete from "hire-forms-autocomplete";
import getAutocompleteValues from "../../../../actions/autocomplete";

class IdField extends React.Component {

	onChange(value) {
		const val = this.props.filterType === "entity" ? {
			type: "property",
			name: "tim_id",
			or: [{type: "value", value: value.key, label: value.value}]
		} : {
			type: "value", value: value.key, label: value.value
		};
		const path = this.props.filterType === "entity" ? ["and"] : ["or"];

		this.props.onAddQueryFilter(path, val);
	}

	render() {

		return (
			<Autocomplete
				async={(query, done) => getAutocompleteValues(this.props.quickSearch, query, this.props.vre.vreId, done) }
				key={this.props.quickSearch}
				onChange={this.onChange.bind(this)}
				placeholder="Quick search..."
				values={[]} />
		);
	}
}

IdField.propTypes = {
	filterType: React.PropTypes.string,
	onAddQueryFilter: React.PropTypes.func,
	quickSearch: React.PropTypes.string,
	vre: React.PropTypes.object
};

export default IdField;