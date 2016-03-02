import React from "react";
import mapField from "./map-field";
import getIn from "../../../util/get-in";

class QueryFilters extends React.Component {

	render() {
		const { queries, vre } = this.props;
		if(queries.currentQuery === -1) { return null; }
		const query = queries.queries[queries.currentQuery];
		const { data, type } = getIn(query.pathToQuerySelection, query, {typed: true});
		if(type === "entity") {
			return (<div>
				<ul>
					{vre.collections[`${data.domain}s`].map((fieldDef, i) => <li key={i}>{mapField(fieldDef, {...this.props, entity: data})}</li> )}
				</ul>
				<pre style={{width: "100%", whiteSpace: "pre-wrap"}}>{JSON.stringify(query)}</pre>
			</div>);
		} else {
			return null;
		}
	}
}

QueryFilters.propTypes = {
	queries: React.PropTypes.object,
	vre: React.PropTypes.object
};

export default QueryFilters;