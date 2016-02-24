import React from "react";
import { DragDropContext } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";
import { InfinityGrid } from "infinity-grid";
import QueryComponent from "./query-component";

class App extends React.Component {

	render() {
				console.log(this.props.vre, this.props.entity);

		const collections = this.props.vre.collections || [];
		return (<div style={{height: "500px"}}>
			<div style={{position: "absolute", top: 0, height: "50px"}}>
				{collections.map((c) => (
					<div key={c.name} style={{display: "inline-block"}}>
						<QueryComponent
							domain={c.name}
							onDeselect={(...args) => console.log(args)}
							onSelect={(queryIndex, props, setProps) => this.props.onSelectDomain(props.domain.replace(/s$/, ""), "SELECT_QUERY", {queryIndex: queryIndex}) }
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
	vre: React.PropTypes.object
};

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(App);
