import React from "react";

class EntityList extends React.Component {

	render() {
		const { entity, quickSearch, onPaginateLeft, onPaginateRight, onQuickSearchQueryChange, onQuickSearch } = this.props;

		const leftButton = quickSearch.start > 0 ?
			<button onClick={onPaginateLeft}><span className="glyphicon glyphicon-chevron-left"></span></button> :
			<button disabled><span className="glyphicon glyphicon-chevron-left"></span></button>;

		const rightButton = quickSearch.list.length < quickSearch.rows ?
			<button disabled><span className="glyphicon glyphicon-chevron-right"></span></button> :
			<button onClick={onPaginateRight}><span className="glyphicon glyphicon-chevron-right"></span></button>;

		return (
			<div className="col-sm-6">
				<div className="panel panel-default entity-list">
					<div className="panel-heading">
						<h3 className="panel-title">List of: {entity.domain}</h3>
					</div>
					<div className="panel-body">
						{leftButton}
						<span style={{margin: "10px"}}>{quickSearch.start + 1} - {quickSearch.start + quickSearch.rows}</span>
						{rightButton}
						<input onChange={(ev) => onQuickSearchQueryChange(ev.target.value)}
							onKeyPress={(ev) => ev.key === "Enter" ? onQuickSearch() : false}
							placeholder="Quick search..."
							value={quickSearch.query} />
						<button onClick={onQuickSearch}>
							<span className="glyphicon glyphicon-search"></span>
						</button>
						<button onClick={() => { onQuickSearchQueryChange(""); onQuickSearch(); }}>
							<span className="glyphicon glyphicon-remove"></span>
						</button>
					</div>
					<ul className="list-group">
						{quickSearch.list.map((entry, i) => (
							<li className="list-group-item" key={i}>
								<span style={{marginRight: "20px"}}>{i + quickSearch.start + 1}.</span>
								<a onClick={() => this.props.onSelect({domain: entity.domain, id: entry._id})} >{entry["@displayName"]}</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
}

EntityList.propTypes = {
	entity: React.PropTypes.object,
	onPaginateLeft: React.PropTypes.func,
	onPaginateRight: React.PropTypes.func,
	onQuickSearch: React.PropTypes.func,
	onQuickSearchQueryChange: React.PropTypes.func,
	onSelect: React.PropTypes.func,
	quickSearch: React.PropTypes.object
};

export default EntityList;
