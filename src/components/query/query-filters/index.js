import React from "react";
import mapField from "./map-field";


class QueryFilters extends React.Component {

	render() {
		if(!this.props.entity || !this.props.entity.fieldDefinitions) { return null; }
		return (<ul>
			{this.props.entity.fieldDefinitions.map((fieldDef, i) => <li key={i}>{mapField(fieldDef, this.props)}</li> )}
		</ul>);
	}
}

QueryFilters.propTypes = {
	entity: React.PropTypes.object
};

export default QueryFilters;