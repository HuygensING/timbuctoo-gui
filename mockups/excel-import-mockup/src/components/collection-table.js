import React from "react";
import cx from "classnames";

class CollectionTable extends React.Component {

	render() {
		const { importData, mappings, onIgnoreColumnToggle } = this.props;
		const { sheets, activeCollection } = importData;
		const collectionData = sheets.find((sheet) => sheet.collection === activeCollection);

		const { rows, collection, variables } = collectionData;

		const confirmedCols = variables
			.map((value, i) => ({value: value, index: i}))
			.filter((colSpec) => mappings.collections[activeCollection].mappings
				.filter((m) => m.confirmed)
				.map((m) => m.variable.map((v) => v.variableName))
				.reduce((a, b) => a.concat(b), [])
				.indexOf(colSpec.value) > -1
			).map((colSpec) => colSpec.index);

		const { ignoredColumns } = mappings.collections[activeCollection];

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Collection: {collection}
				</div>

				<table className="table table-bordered">
					<thead>
						<tr>
						{/* extract: */}
							{variables.map((header, i) => (
								<th className={cx({
									success: confirmedCols.indexOf(i) > -1,
									info: confirmedCols.indexOf(i) < 0 && ignoredColumns.indexOf(header) < 0,
									ignored: confirmedCols.indexOf(i) < 0 && ignoredColumns.indexOf(header) > -1
								})} key={i}>

									{header}
									<a className={cx("pull-right", "glyphicon", {
										"glyphicon-ok-sign": confirmedCols.indexOf(i) > -1,
										"glyphicon-question-sign": confirmedCols.indexOf(i) < 0 && ignoredColumns.indexOf(header) < 0,
										"glyphicon-remove": confirmedCols.indexOf(i) < 0 && ignoredColumns.indexOf(header) > -1
									})} onClick={() => confirmedCols.indexOf(i) < 0 ? onIgnoreColumnToggle(activeCollection, header) : null } >
									</a>
								</th>
							))}
						{/* /extract */}
						</tr>
					</thead>
					<tbody>
					{/* extract: */}
						{ rows.map((row, i) => (
							<tr key={i}>{row.map((cell, j) => (
								<td className={cx({
									ignored: confirmedCols.indexOf(j) < 0 && ignoredColumns.indexOf(cell) > -1
								})} key={j}>
									{cell}
								</td>
							))}
							</tr>
						))}
					{/* /extract */}
					</tbody>
				</table>
			</div>
		);
	}
}

CollectionTable.propTypes = {
	importData: React.PropTypes.object,
	mappings: React.PropTypes.object,
	onIgnoreColumnToggle: React.PropTypes.func
};

export default CollectionTable;