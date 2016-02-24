import React from "react";
import { DragDropContext } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";
import { InfinityGrid, actions as gridActions } from "infinity-grid";
import QueryComponent from "./query-component";
import QueryFilters from "./query-filters";

class App extends React.Component {


	componentWillReceiveProps(nextProps) {
		if (nextProps.queries.currentQuery > -1 && nextProps.queries !== this.props.queries) {
			gridActions.onSetComponentProps({query: nextProps.queries.queries[nextProps.queries.currentQuery]}, nextProps.queries.currentQuery);
		}
	}

	onDeleteQuery(queryIndex) {
		gridActions.onSetComponentProps({deleted: true }, queryIndex);
		this.props.onDeleteQuery(queryIndex);
	}

	onSelectQuery(queryIndex, props) {
		this.props.onSelectQuery(props.domain.replace(/s$/, ""), queryIndex);
	}

	onQueryChange(path, value) {
		this.props.onQueryChange(path, value);
	}

	render() {
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
		</div>);
	}
}


App.propTypes = {
	entity: React.PropTypes.object,
	onDeleteQuery: React.PropTypes.func,
	onQueryChange: React.PropTypes.func,
	onSelectQuery: React.PropTypes.func,
	queries: React.PropTypes.object,
	vre: React.PropTypes.object
};

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(App);
