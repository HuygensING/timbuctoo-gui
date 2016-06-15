import React from "react";
import cx from "classnames";

class CollectionTable extends React.Component {

	render() {
		const { importData, mappings } = this.props;
		const { sheets, activeCollection } = importData;
		const collectionData = sheets.find((sheet) => sheet.collection === activeCollection);

		if (!collectionData) { return null; }

		const { rows, collection } = collectionData;

		if (!rows.length) { return null; }

		const confirmedCols = rows[0]
			.map((value, i) => ({value: value, index: i}))
			.filter((colSpec) => mappings.collections[activeCollection].mappings
				.filter((m) => m.confirmed)
				.map((m) => m.variable.map((v) => v.variableName))
				.reduce((a, b) => a.concat(b), [])
				.indexOf(colSpec.value) > -1
			).map((colSpec) => colSpec.index);

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Collection: {collection}
				</div>

				<table className="table table-bordered">
					<thead>
						<tr>
							{rows[0].map((header, i) => (
								<th className={cx({success: confirmedCols.indexOf(i) > -1, info: confirmedCols.indexOf(i) < 0})} key={i}>
									{header}
									<span className={cx("pull-right", "glyphicon", {"glyphicon-question-sign": confirmedCols.indexOf(i) < 0, "glyphicon-ok-sign": confirmedCols.indexOf(i) > -1})}>
									</span>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{ rows.map((row, i) => i == 0 ? null : <tr key={i}>{row.map((cell, j) =>
							<td key={j}>{cell}</td>)}</tr>
						)}
					</tbody>
				</table>
			</div>
		);
	}
}

CollectionTable.propTypes = {
	importData: React.PropTypes.object,
	mappings: React.PropTypes.object,
	onSelectVariable: React.PropTypes.func
};

export default CollectionTable;