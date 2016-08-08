import React from "react";
import { DragDropContext } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";
import { InfinityGrid } from "hire-infinity-grid";
import QueryComponent from "./query-component";

import DraggableIcon from "./query-component/draggable-icon";
import SearchIcon from "./search-icon";
import QueryFilters from "./query-filters";
import Input from "hire-forms-input";
import Select from "hire-forms-select";

import getIn from "../../util/get-in";
import clone from "../../util/clone-deep";
import parseGremlin from "../../parsers/gremlin";

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			scale: 1
		};
	}

	onDeleteQuery(queryIndex) {
		this.props.onDeleteQuery(queryIndex);
	}

	onCreateQuery(data) {
		const { x, y, props} = data;
		this.onSelectQuery(this.props.queries.queries.length, props, {x: x, y: y});
	}

	onSelectQuery(queryIndex, props, position = null) {
		if(this.props.queries.currentQuery !== queryIndex) {
			this.props.onSelectQuery(props.domain.replace(/s$/, ""), queryIndex, position);
		}
	}

	onQueryChange(path, value) {
		this.props.onQueryChange(path, value);
	}

	onSetQueryPath(path) {
		this.props.onSetQueryPath(path);
	}

	onResultClick(result) {
		const currentQ = this.props.queries.currentQuery > -1 ? this.props.queries.queries[this.props.queries.currentQuery] : null;
		if(!currentQ) { return; }
		const data = getIn(currentQ.pathToQuerySelection, currentQ);
		if (data.type === "relation") { return; }
		const val = data.type === "entity" ? {
			type: "property",
			name: "tim_id",
			or: [{type: "value", value: result.id, label: result.displayName}]
		} : {
			type: "value", value: result.id, label: result.displayName
		};
		const path = data.type === "entity" ? ["and"] : ["or"];

		this.props.onAddQueryFilter(path, val);
	}

	onWheel(ev) {
		if(ev.deltaY < 0) {
			this.setState({scale: this.state.scale * 1.1 });
		} else if(ev.deltaY > 0) {
			this.setState({scale: this.state.scale * 0.9 });
		}
		return ev.preventDefault();
	}

	render() {
		const currentQ = this.props.queries.currentQuery > -1 ? this.props.queries.queries[this.props.queries.currentQuery] : null;

/*		const [resQ] = this.props.queries.currentQuery > -1 ? parseGremlin(this.props.queries.queries[this.props.queries.currentQuery]) : ["", ""];*/
		const collections = this.props.vre.collections || {};

		let resultPath = currentQ ? clone(currentQ.pathToQuerySelection) : null;

		if(currentQ && resultPath && resultPath.length > 1) {
			while(getIn(resultPath, currentQ).type !== "entity" && resultPath.length > 1) {
				if(this.props.queries.results && getIn(resultPath, this.props.queries.results)) { break; }
				resultPath = resultPath.slice(0, resultPath.length - 1);
			}
		}


		let results = currentQ && this.props.queries.results && getIn(resultPath, this.props.queries.results)  && getIn(resultPath, this.props.queries.results).results ?
			getIn(resultPath, this.props.queries.results).results.map((r, i) => (
				<li key={i} onClick={() => this.onResultClick(r)}>{r.displayName}</li>
			)) : null;
		if (currentQ && this.props.queries.results && resultPath.length === 1) {
			results = getIn(["root"], this.props.queries.results).map((r, i) => (
				<li key={i} onClick={() => this.onResultClick(r)}>{r.displayName}</li>
			));
		}

		let resultCount = currentQ && this.props.queries.results && getIn(resultPath, this.props.queries.results) && getIn(resultPath, this.props.queries.results).resultCount ?
			`(${getIn(resultPath, this.props.queries.results).resultCount})` :
			this.props.queries.resultsPending ? "(...)" : null;

		if (currentQ && this.props.queries.results && resultPath.length === 1) {
			resultCount = `(${this.props.queries.resultCount})`;
		}

		return (<div>
			<div className="query-bar">
				{Object.keys(collections).filter((c) => !c.match(/relations$/)).map((c) => (
					<div key={c} style={{display: "inline-block", height: "40px", width: "150px"}}>
						<DraggableIcon
							domain={c}
							onDrop={this.onCreateQuery.bind(this)}
						/>
					</div>
				))}
			</div>
			<div className="grid-wrapper" onWheel={this.onWheel.bind(this)}>
				<InfinityGrid gridSize={50}>
					{this.props.queries.queries.map((query, i) => query.deleted ? null : (
						<QueryComponent
							key={i}
							onDeleteQuery={() => this.onDeleteQuery(i)}
							onDeleteQueryFilter={() => this.props.onDeleteQueryFilter(i)}
							onDrag={(movement) => this.props.onMoveQueryPosition(i, movement)}
							onQueryChange={this.onQueryChange.bind(this)}
							onSelect={() => this.onSelectQuery(i, query)}
							onSetQueryPath={this.onSetQueryPath.bind(this)}
							query={query}
							scale={this.state.scale}
							selected={i === this.props.queries.currentQuery}
						/>
					))}
				</InfinityGrid>
				{this.props.queries.currentQuery === -1 ? null : <SearchIcon onClick={this.props.onSubmitQuery} />}

			</div>

			<div className="filter-wrapper">
				<QueryFilters {...this.props} onChange={this.onQueryChange.bind(this)} />
			</div>
			<div className="result-wrapper">
{/*				<label>Gremlin query</label>
				<pre style={{width: "100%", whiteSpace: "no-wrap"}}>{resQ}</pre>
*/}
				<label>Results {resultCount}</label>
				<ul className="result-list">
					{results}
				</ul>
			</div>
		</div>);
	}
}


App.propTypes = {
	entity: React.PropTypes.object,
	onAddQueryFilter: React.PropTypes.func,
	onDeleteQuery: React.PropTypes.func,
	onDeleteQueryFilter: React.PropTypes.func,
	onLoadQuery: React.PropTypes.func,
	onMoveQueryPosition: React.PropTypes.func,
	onNameQuery: React.PropTypes.func,
	onQueryChange: React.PropTypes.func,
	onSaveQuery: React.PropTypes.func,
	onSelectQuery: React.PropTypes.func,
	onSetQueryPath: React.PropTypes.func,
	onSubmitQuery: React.PropTypes.func,
	queries: React.PropTypes.object,
	vre: React.PropTypes.object
};

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(App);
