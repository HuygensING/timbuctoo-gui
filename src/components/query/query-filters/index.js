import React from "react";
import mapField from "./map-field";
import mapPropField from "./map-prop-field";
import getIn from "../../../util/get-in";
import IdField from "./fields/id-field";


class QueryFilters extends React.Component {

	render() {
		const { queries, vre } = this.props;
		if(queries.currentQuery === -1) { return null; }
		const query = queries.queries[queries.currentQuery];

		const data = getIn(query.pathToQuerySelection, query);
		if(!data) { return null; }

		let body;
		if(data.type === "entity") {
			body = (<div>
				<ul>
					<li><IdField {...this.props} filterType={data.type} quickSearch={`domain/${data.domain}s/autocomplete`} /></li>
					{vre.collections[`${data.domain}s`].map((fieldDef, i) => <li key={i}>{mapField(fieldDef, {...this.props, entity: data})}</li> )}
				</ul>
			</div>);
		} else if(data.type === "property" && data.name === "tim_id") {
			const entityData = getIn(query.pathToQuerySelection.slice(0, query.pathToQuerySelection.length - 2), query);
			body = <IdField {...this.props} filterType={data.type} quickSearch={`domain/${entityData.domain}s/autocomplete`} />;
		} else if(data.type === "property") {
			const entityData = getIn(query.pathToQuerySelection.slice(0, query.pathToQuerySelection.length - 2), query);
			const fieldDef = vre.collections[`${entityData.domain}s`].filter((def) => def.name === data.name)[0];
			body = mapPropField(fieldDef, {...this.props, entity: entityData, filterPath: ["or"]});
		} else if(data.type === "value") {
			const entityData = getIn(query.pathToQuerySelection.slice(0, query.pathToQuerySelection.length - 4), query);
			const { name } = getIn(query.pathToQuerySelection.slice(0, query.pathToQuerySelection.length - 2), query);
			const fieldDef = vre.collections[`${entityData.domain}s`].filter((def) => def.name === name)[0];

			body = fieldDef ? mapPropField(fieldDef, {...this.props, entity: entityData, filterPath: -1}) : null;
		} else {
			body = null;
		}
		return (<div>
			{body}
			<pre style={{width: "100%", whiteSpace: "pre-wrap"}}>{JSON.stringify(query, null, 2)}</pre>
		</div>);
	}
}

QueryFilters.propTypes = {
	queries: React.PropTypes.object,
	vre: React.PropTypes.object
};

export default QueryFilters;