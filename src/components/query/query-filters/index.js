import React from "react";
import mapField from "./map-field";
import getIn from "../../../util/get-in";

class QueryFilters extends React.Component {

	render() {
		const { queries } = this.props;
		if(queries.currentQuery === -1) { return null; }
		const query = queries.queries[queries.currentQuery];
		const { data, type } = getIn(query.pathToQuerySelection, query, {typed: true});
		if(type === "entity") {
			return (<div>
				<ul>
					{data.fieldDefinitions.map((fieldDef, i) => <li key={i}>{mapField(fieldDef, {...this.props, entity: data})}</li> )}
				</ul>
				<pre style={{width: "100%", whiteSpace: "pre-wrap"}}>{JSON.stringify(query)}</pre>
			</div>);
		} else {
			return null;
		}
	}
}

QueryFilters.propTypes = {
	entity: React.PropTypes.object,
	queries: React.PropTypes.object
};

export default QueryFilters;