import React from "react";
import mapField from "./map-field";


class QueryFilters extends React.Component {

	render() {
		if(!this.props.entity || !this.props.entity.fieldDefinitions || this.props.queries.currentQuery === -1) { return null; }
		return (<ul>
			{this.props.entity.fieldDefinitions.map((fieldDef, i) => <li key={i}>{mapField(fieldDef, this.props)}</li> )}
		</ul>);
	}
}

QueryFilters.propTypes = {
	entity: React.PropTypes.object,
	queries: React.PropTypes.object
};

export default QueryFilters;