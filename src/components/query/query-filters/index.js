import React from "react";
import mapField from "./map-field";
import mapPropField from "./map-prop-field";
import getIn from "../../../util/get-in";

class QueryFilters extends React.Component {

	render() {
		const { queries, vre } = this.props;
		if(queries.currentQuery === -1) { return null; }
		const query = queries.queries[queries.currentQuery];

		const data = getIn(query.pathToQuerySelection, query);
		if(!data) { return null; }
		if(data.type === "entity") {
			return (<div>
				<ul>
					{vre.collections[`${data.domain}s`].map((fieldDef, i) => <li key={i}>{mapField(fieldDef, {...this.props, entity: data})}</li> )}
				</ul>
				<pre style={{width: "100%", whiteSpace: "pre-wrap"}}>{JSON.stringify(query)}</pre>
			</div>);
		} else if(data.type === "property") {
			const entityData = getIn(query.pathToQuerySelection.slice(0, query.pathToQuerySelection.length - 2), query);
			const fieldDef = vre.collections[`${entityData.domain}s`].filter((def) => def.name === data.name)[0]
			return mapPropField(fieldDef, {...this.props, entity: entityData});
		}
		return null;
	}
}

QueryFilters.propTypes = {
	queries: React.PropTypes.object,
	vre: React.PropTypes.object
};

export default QueryFilters;