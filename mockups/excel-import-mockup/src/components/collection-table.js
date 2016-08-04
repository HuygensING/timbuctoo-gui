import React from "react";
import DataRow from "./table/data-row";
import HeaderCell from "./table/header-cell";


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
			<div>
				<div className="panel panel-default">
					<div className="panel-heading">
						Collection: {collection}
					</div>

					<table className="table table-bordered">
						<thead>
							<tr>
								{variables.map((header, i) => (
									<HeaderCell
										activeCollection={activeCollection}
										header={header}
										isConfirmed={confirmedCols.indexOf(i) > -1}
										isIgnored={ignoredColumns.indexOf(header) > -1}
										key={i}
										onIgnoreColumnToggle={onIgnoreColumnToggle}
									/>
								))}
							</tr>
						</thead>
						<tbody>
						{ rows.map((row, i) => (
							<DataRow
								confirmedCols={confirmedCols}
								ignoredColumns={ignoredColumns}
								key={i}
								row={row}
								variables={variables}
							/>
						))}
						</tbody>
					</table>
				</div>
				<button onClick={() => this.props.onLoadMoreClick && this.props.onLoadMoreClick(collectionData.nextUrl, collection)} disabled={!collectionData.nextUrl} className="btn btn-default" style={{color: "#333", backgroundColor: "#fff", "borderColor": "#ccc", float: "right"}}>more...</button>
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
