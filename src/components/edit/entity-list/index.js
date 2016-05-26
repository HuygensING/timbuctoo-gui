import React from "react";

class EntityList extends React.Component {

	render() {
		const { entity, pagination, onPaginateLeft, onPaginateRight } = this.props;

		const leftButton = pagination.start > 0 ?
			<button onClick={onPaginateLeft}><span className="glyphicon glyphicon-chevron-left"></span></button> :
			<button disabled><span className="glyphicon glyphicon-chevron-left"></span></button>;

		const rightButton = entity.list.length < pagination.rows ?
			<button disabled><span className="glyphicon glyphicon-chevron-right"></span></button> :
			<button onClick={onPaginateRight}><span className="glyphicon glyphicon-chevron-right"></span></button>;

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title">List of: {entity.domain}</h3>
				</div>
				<div className="panel-body">
					{leftButton}
					<span style={{margin: "20px"}}>{pagination.start + 1} - {pagination.start + pagination.rows}</span>
					{rightButton}
				</div>
				<ul className="list-group">
					{entity.list.map((entry, i) => (
						<li className="list-group-item" key={i}>
							<span style={{marginRight: "20px"}}>{i + pagination.start + 1}.</span>
							<a onClick={() => this.props.onSelect({domain: entity.domain, id: entry._id})} >{entry.displayName}</a>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

EntityList.propTypes = {
	entity: React.PropTypes.object,
	onPaginateLeft: React.PropTypes.func,
	onPaginateRight: React.PropTypes.func,
	onSelect: React.PropTypes.func,
	pagination: React.PropTypes.object
};

export default EntityList;
