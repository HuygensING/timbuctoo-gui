import React from "react";
import cx from "classnames";

class CollectionIndex extends React.Component {

	mappingsAreComplete(sheet) {
		const { mappings } = this.props;

		const confirmedColCount = mappings.collections[sheet.collection].mappings
			.filter((m) => m.confirmed)
			.map((m) => m.variable.map((v) => v.variableName))
			.reduce((a, b) => a.concat(b), [])
			.length;

		return confirmedColCount + mappings.collections[sheet.collection].ignoredColumns.length === sheet.variables.length;
	}

	allMappingsAreIncomplete() {
		const { importData } = this.props;
		const { sheets } = importData;
		return sheets
			.map((sheet) => this.mappingsAreComplete(sheet))
			.filter((result) => result !== true)
			.length === 0;
	}

	render() {
		const { importData, onSelectCollection } = this.props;
		const { sheets } = importData;

		return sheets.length > 0 ? (
			<div className="panel panel-default">
				<div className="panel-heading">
					Collections
				</div>
				<div className="list-group">
					{ sheets.map((sheet, i) => (
						<a className={cx("list-group-item", { active: sheet.collection === importData.activeCollection })} key={i} onClick={() => onSelectCollection(sheet.collection)}>
							<span className={cx("glyphicon", "pull-right", {
								"glyphicon-question-sign": !this.mappingsAreComplete(sheet),
								"glyphicon-ok-sign": this.mappingsAreComplete(sheet)
							})}></span>
							{sheet.collection}
						</a>
					)) }
					<li className="list-group-item">
						<button className="btn btn-success">Save</button>
						&nbsp;
						<button className="btn btn-success" disabled={!this.allMappingsAreIncomplete()}>Publish</button>
					</li>
				</div>
			</div>
		) : null;
	}
}

CollectionIndex.propTypes = {
	importData: React.PropTypes.object,
	onSelectCollection: React.PropTypes.func,
	mappings: React.PropTypes.object
};

export default CollectionIndex;