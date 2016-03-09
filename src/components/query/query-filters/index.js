import React from "react";
import mapField from "./map-field";
import mapPropField from "./map-prop-field";
import getIn from "../../../util/get-in";
import IdField from "./fields/id-field";
import SelectField from "./fields/select";



class QueryFilters extends React.Component {

	onOrButtonClick(domain, path) {
		this.props.onAddQueryFilter(path, {
			domain: domain,
			type: "entity",
			and: []
		});
	}

	onCloneButtonClick(domain, path) {
		const query = this.props.queries.queries[this.props.queries.currentQuery];
		const data = getIn(query.pathToQuerySelection, query);
		this.props.onAddQueryFilter(path, data);
	}

	onChangeRelationType(value) {
		this.props.onQueryChange(["name"], value);
	}

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
					<li>
						<button onClick={this.onOrButtonClick.bind(this, data.domain, -1)}>OR</button>
						<button onClick={this.onCloneButtonClick.bind(this, data.domain, -1)}>OR copy</button>
					</li>
					<li><IdField {...this.props} filterType={data.type} quickSearch={`domain/${data.domain}s/autocomplete`} /></li>
					{vre.collections[`${data.domain}s`].map((fieldDef, i) => <li key={i}>{mapField(fieldDef, {...this.props, entity: data})}</li> )}
				</ul>
			</div>);
		} else if(data.type === "relation") {
			const domain = getIn(query.pathToQuerySelection.slice(0, query.pathToQuerySelection.length - 2), query).domain;
			const targetDomain = getIn(query.pathToQuerySelection, query).targetDomain;
			const options = vre.collections[`${domain}s`]
				.filter((fieldDef) => fieldDef.type === "relation" && targetDomain == fieldDef.relation.targetCollection.replace(/s$/, ""))
				.map((fieldDef) => fieldDef.name);

			body = <SelectField name="- Change -" onChange={this.onChangeRelationType.bind(this)} options={options} />;

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
	onAddQueryFilter: React.PropTypes.func,
	onQueryChange: React.PropTypes.func,
	queries: React.PropTypes.object,
	vre: React.PropTypes.object
};

export default QueryFilters;