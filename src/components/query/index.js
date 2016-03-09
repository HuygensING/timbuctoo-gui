import React from "react";
import { DragDropContext } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";
import { InfinityGrid } from "hire-infinity-grid";
import QueryComponent from "./query-component";

import DraggableIcon from "./query-component/draggable-icon";
import SearchIcon from "./search-icon";


import QueryFilters from "./query-filters";
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
		const [resQ, countQ] = this.props.queries.currentQuery > -1 ? parseGremlin(this.props.queries.queries[this.props.queries.currentQuery]) : ["", ""];
		const collections = this.props.vre.collections || {};
		return (<div style={{height: "500px"}}>
			<div style={{position: "absolute", top: 0, height: "60px"}}>
				{Object.keys(collections).filter((c) => !c.match(/relations$/)).map((c) => (
					<div key={c} style={{display: "inline-block", height: "40px", width: "40px"}}>
						<DraggableIcon
							domain={c}
							onDrop={this.onCreateQuery.bind(this)}
						/>
					</div>
				))}
			</div>
			<div onWheel={this.onWheel.bind(this)} style={{position: "absolute", top: "50px", left: 0, width: "30%", height: "calc(100% - 60px)"}}>
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

			<div style={{position: "absolute", top: "50px", left: "30%", width: "30%", height: "calc(100% - 60px)"}}>
				<QueryFilters {...this.props} onChange={this.onQueryChange.bind(this)} />
			</div>
			<div style={{position: "absolute", top: "50px", left: "60%", width: "40%", height: "calc(100% - 60px)"}}>
				<pre style={{width: "100%", whiteSpace: "pre-wrap"}}>
					{this.props.queries.resultCountPending ? "WAITING FOR RESULT COUNT...\n" : this.props.queries.resultCount}
					{this.props.queries.resultsPending ? "WAITING FOR RESULTS...\n" : this.props.queries.results}
					COUNT QUERY: {countQ}<br /><br />
					RESULT QUERY: {resQ}
				</pre>
			</div>
		</div>);
	}
}


App.propTypes = {
	entity: React.PropTypes.object,
	onDeleteQuery: React.PropTypes.func,
	onDeleteQueryFilter: React.PropTypes.func,
	onMoveQueryPosition: React.PropTypes.func,
	onQueryChange: React.PropTypes.func,
	onSelectQuery: React.PropTypes.func,
	onSetQueryPath: React.PropTypes.func,
	onSubmitQuery: React.PropTypes.func,
	queries: React.PropTypes.object,
	vre: React.PropTypes.object
};

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(App);
