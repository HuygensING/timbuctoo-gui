import React from "react";
import AutocompleteList from "hire-forms-autocomplete-list";
import xhr from "xhr";


// TODO: move to appropriate place
const getAutocompleteValues = function(path, query, done) {
	let options = {
		headers: {"Accept": "application/json", "VRE_ID": "WomenWriters"},
		url: `/api/v2.1/${path}?query=*${query}*`
	};

	let xhrDone = function(err, response, body) {

		done(JSON.parse(body));
	};

	xhr(options, xhrDone);
};

class RelationField extends React.Component {

	// TODO: @see ./keyword.js for specifics on what relation data should be
	onChange(...args) {
		console.log(args);
		this.props.onChange(["@relations", this.props.name], ...args);
	}

	render() {
		const values = this.props.entity.data["@relations"][this.props.name] || [];

		return (
			<div>
				<label>{this.props.name}</label>
				<AutocompleteList
					async={(query, done) => getAutocompleteValues(this.props.path, query, done) }
					onChange={this.onChange.bind(this)}
					values={values} /> {/* TODO: @see ./keyword.js on how values should be mapped */}
			</div>
		);
	}
}

RelationField.propTypes = {
	entity: React.PropTypes.object,
	fieldDefinition: React.PropTypes.object,
	name: React.PropTypes.string,
	onChange: React.PropTypes.func,
	path: React.PropTypes.string
};

export default RelationField;