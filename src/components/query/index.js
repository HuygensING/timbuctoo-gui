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

		const [resQ] = this.props.queries.currentQuery > -1 ? parseGremlin(this.props.queries.queries[this.props.queries.currentQuery]) : ["", ""];
		const collections = this.props.vre.collections || {};

		const nameInput = this.props.queries.currentQuery > -1 ?
			<Input onChange={this.props.onNameQuery} placeholder="name query" value={this.props.queries.queries[this.props.queries.currentQuery].name} /> : null;

		const saveButton = this.props.queries.currentQuery > -1 ? (
			<button disabled={ this.props.queries.queries[this.props.queries.currentQuery].name.length ? false : true } onClick={this.props.onSaveQuery}>
				Save current query
			</button>
		) : null;

		const { savedQueries } = this.props.queries;
		const savedQuerySelect = <Select onChange={this.props.onLoadQuery} options={savedQueries.map((q) => q.name)} placeholder="Load query..." />;

		const results = currentQ && this.props.queries.results && this.props.queries.results.results[currentQ.pathToQuerySelection.join("|")] ?
			this.props.queries.results.results[currentQ.pathToQuerySelection.join("|")].map((r, i) => (
				<li key={i}>{r.displayName}</li>
			)) : null;


		const resultCount = currentQ && this.props.queries.results && this.props.queries.results.counts[currentQ.pathToQuerySelection.join("|")] ?
			`(${this.props.queries.results.counts[currentQ.pathToQuerySelection.join("|")]})` : 
			this.props.queries.resultsPending ? "(...)" : null;

		return (<div>
			<div className="query-bar">
				{Object.keys(collections).filter((c) => !c.match(/relations$/)).map((c) => (
					<div key={c} style={{display: "inline-block", height: "40px", width: "40px"}}>
						<DraggableIcon
							domain={c}
							onDrop={this.onCreateQuery.bind(this)}
						/>
					</div>
				))}
				{nameInput}{saveButton}
				{savedQuerySelect}
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
				<label>Gremlin query</label>
				<pre style={{width: "100%", whiteSpace: "no-wrap"}}>{resQ}</pre>

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
