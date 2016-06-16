import React from "react";
import cx from "classnames";

class DataRow extends React.Component {

	render() {
		const { row, confirmedCols, ignoredColumns, variables } = this.props;

		return (
			<tr>{row.map((cell, i) => { console.log(cell, ignoredColumns.indexOf(cell)); return (
				<td className={cx({
					ignored: confirmedCols.indexOf(i) < 0 && ignoredColumns.indexOf(variables[i]) > -1
				})} key={i}>
					{cell}
				</td>
			); })}
			</tr>
		);
	}
}

DataRow.propTypes = {
	confirmedCols: React.PropTypes.array,
	ignoredColumns: React.PropTypes.array,
	row: React.PropTypes.array,
	variables: React.PropTypes.array
};

export default DataRow;