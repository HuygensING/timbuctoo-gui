import React from "react";
import { DragDropContext } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";
import { InfinityGrid, actions as gridActions } from "infinity-grid";
import QueryComponent from "./query-component";

class App extends React.Component {

	onDeleteQuery(queryIndex) {
		gridActions.onSetComponentProps({deleted: true}, queryIndex);
		this.props.onDeleteQuery(queryIndex);
	}

	render() {
		const collections = this.props.vre.collections || [];
		return (<div style={{height: "500px"}}>
			<div style={{position: "absolute", top: 0, height: "50px"}}>
				{collections.map((c) => (
					<div key={c.name} style={{display: "inline-block"}}>
						<QueryComponent
							domain={c.name}
							onDeleteQuery={this.onDeleteQuery.bind(this)}
							onDeselect={(...args) => console.log(args)}
							onSelect={(queryIndex, props) => this.props.onSelectDomain(props.domain.replace(/s$/, ""), "SELECT_QUERY", {queryIndex: queryIndex}) }
						/>
					</div>
				))}
			</div>
			<div style={{position: "absolute", top: "50px", width: "30%", height: "calc(100% - 60px)"}}>
				<InfinityGrid />
			</div>
		</div>);
	}
}


App.propTypes = {
	entity: React.PropTypes.object,
	onSelectDomain: React.PropTypes.func,
	vre: React.PropTypes.object
};

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(App);
