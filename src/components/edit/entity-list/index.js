import React from "react";

class EntityList extends React.Component {

	render() {
		const { entity } = this.props;
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title">List of: {entity.domain}</h3>
				</div>
				<ul className="list-group">
					{entity.list.map((entry, i) => <li className="list-group-item" key={i} onClick={() => this.props.onSelect({domain: entity.domain, id: entry._id})} ><a>{entry.displayName}</a></li>)}
				</ul>
			</div>
		);
	}
}

EntityList.propTypes = {
	entity: React.PropTypes.object,
	onSelect: React.PropTypes.func
};

export default EntityList;
