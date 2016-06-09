import React from "react";
import cx from "classnames";

class CollectionTable extends React.Component {

	render() {
		const { importData, onSelectVariable } = this.props;
		const { sheets, activeCollection, activeVariable } = importData;
		const collectionData = sheets.find((sheet) => sheet.collection === activeCollection);

		if (!collectionData) { return null; }

		const { rows, collection } = collectionData;

		if (!rows.length) { return null; }

		const activeCol = rows[0].indexOf(activeVariable);
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Collection: {collection}
				</div>

				<table className="table table-bordered">
					<thead>
						<tr>
							{rows[0].map((header, i) => (
								<th className={cx({success: activeCol === i, info: activeCol !== i})} key={i} onClick={() => onSelectVariable(header)}>{header}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{ rows.map((row, i) => i == 0 ? null : <tr key={i}>{row.map((cell, j) =>
							<td className={cx({active: activeCol === j})} key={j}>{cell}</td>)}</tr>
						)}
					</tbody>
				</table>
			</div>
		);
	}
}

CollectionTable.propTypes = {
	importData: React.PropTypes.object,
	onSelectVariable: React.PropTypes.func
};

export default CollectionTable;