import React from "react";
import cx from "classnames";

class CollectionIndex extends React.Component {

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
							<span className="badge">{sheet.rows.length - 1}</span>
							{sheet.collection}
						</a>
					)) }
				</div>
			</div>
		) : null;
	}
}

CollectionIndex.propTypes = {
	importData: React.PropTypes.object,
	onSelectCollection: React.PropTypes.func
};

export default CollectionIndex;