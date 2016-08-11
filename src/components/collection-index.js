import React from "react";
import cx from "classnames";

class CollectionIndex extends React.Component {

	mappingsAreComplete(sheet) {
		const { mappings } = this.props;

		const confirmedColCount = mappings.collections[sheet.collection].mappings
			.filter((m) => m.confirmed)
			.map((m) => m.variable.map((v) => v.variableName))
			.reduce((a, b) => a.concat(b), [])
			.filter((x, idx, self) => self.indexOf(x) === idx)
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
		const { onSaveMappings, onPublishData, importData, onSelectCollection } = this.props;
		const { sheets } = importData;

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Collections
				</div>
				<div className="list-group">
					{ sheets.map((sheet, i) => (
						<a
							className={cx("list-group-item", {active: sheet.collection === importData.activeCollection })}
							key={i}
							onClick={() => onSelectCollection(sheet.collection)}
						>
							<span className={cx("glyphicon", "pull-right", {
								"glyphicon-question-sign": !this.mappingsAreComplete(sheet),
								"glyphicon-ok-sign": this.mappingsAreComplete(sheet)
							})}>
							</span>
							{sheet.collection}
						</a>
					)) }
					<li className="list-group-item">
						{/*<button className="btn btn-success" onClick={onSaveMappings}>Save</button>*/}
						&nbsp;
						<button className="btn btn-success" onClick={onPublishData} disabled={!this.allMappingsAreIncomplete()}>Publish</button>
					</li>
				</div>
			</div>
		);
	}
}

CollectionIndex.propTypes = {
	onSaveMappings: React.PropTypes.func,
	onPublishData: React.PropTypes.func,
	importData: React.PropTypes.object,
	mappings: React.PropTypes.object,
	onSelectCollection: React.PropTypes.func
};

export default CollectionIndex;
