import React from "react";
import { DragDropContext } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";
import { InfinityGrid, actions as gridActions } from "infinity-grid";
import QueryComponent from "./query-component";
import QueryFilters from "./query-filters";
import parseGremlin from "../../parsers/gremlin";

class App extends React.Component {


	componentWillReceiveProps(nextProps) {
		if (nextProps.queries.currentQuery > -1 && nextProps.queries !== this.props.queries) {
			gridActions.onSetComponentProps({query: nextProps.queries.queries[nextProps.queries.currentQuery]}, nextProps.queries.currentQuery);
		}
	}

	onDeleteQuery(queryIndex) {
		if(this.props.queries.queries[queryIndex].pathToSelectedEntity.length === 0) {
			gridActions.onSetComponentProps({deleted: true }, queryIndex);
		}
		this.props.onDeleteQuery(queryIndex);
	}

	onSelectQuery(queryIndex, props) {
		if(this.props.queries.currentQuery !== queryIndex) {
			this.props.onSelectQuery(props.domain.replace(/s$/, ""), queryIndex);
		}
	}

	onQueryChange(path, value) {
		this.props.onQueryChange(path, value);
	}

	onSetQueryPath(path) {
		this.props.onSetQueryPath(path);
	}

	render() {
		console.log(this.props.queries);
		const collections = this.props.vre.collections || [];
		return (<div style={{height: "500px"}}>
			<div style={{position: "absolute", top: 0, height: "60px"}}>
				{collections.map((c) => (
					<div key={c.name} style={{display: "inline-block", height: "40px", width: "40px"}}>
						<QueryComponent
							domain={c.name}
							onDeleteQuery={this.onDeleteQuery.bind(this)}
							onDeselect={(...args) => console.log(args)}
							onSelect={this.onSelectQuery.bind(this)}
							onSetQueryPath={this.onSetQueryPath.bind(this)}
						/>
					</div>
				))}
			</div>
			<div style={{position: "absolute", top: "50px", left: 0, width: "30%", height: "calc(100% - 60px)"}}>
				<InfinityGrid />
			</div>

			<div style={{position: "absolute", top: "50px", left: "30%", width: "30%", height: "calc(100% - 60px)"}}>
				<QueryFilters {...this.props} entity={this.props.queries.entity} onChange={this.onQueryChange.bind(this)} />
			</div>
			<div style={{position: "absolute", top: "50px", left: "60%", width: "40%", height: "calc(100% - 60px)"}}>
				{this.props.queries.currentQuery > -1 ? parseGremlin(this.props.queries.queries[this.props.queries.currentQuery]).map((q, i) => (
					<div>
						<a href={`http://localhost:8080/v2.1/gremlin?query=${q}`} key={i} target="_blank">
							{i === 0 ? "results" : "count"}
						</a>
						<pre>{q}</pre>
					</div>
				)) : null}
			</div>
		</div>);
	}
}


App.propTypes = {
	entity: React.PropTypes.object,
	onDeleteQuery: React.PropTypes.func,
	onQueryChange: React.PropTypes.func,
	onSelectQuery: React.PropTypes.func,
	onSetQueryPath: React.PropTypes.func,
	queries: React.PropTypes.object,
	vre: React.PropTypes.object
};

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(App);
