import React from "react";
import cx from "classnames";

class HeaderCell extends React.Component {

	render() {
		const { header, isConfirmed, isIgnored, activeCollection, onIgnoreColumnToggle } = this.props;

		return (
			<th className={cx({
				success: isConfirmed,
				info: !isConfirmed && !isIgnored,
				ignored: !isConfirmed && isIgnored
			})}>

				{header}
				<a className={cx("pull-right", "glyphicon", {
					"glyphicon-ok-sign": isConfirmed,
					"glyphicon-question-sign": !isConfirmed && !isIgnored,
					"glyphicon-remove": !isConfirmed && isIgnored
				})} onClick={() => !isConfirmed ? onIgnoreColumnToggle(activeCollection, header) : null } >
				</a>
			</th>
		);
	}
}

HeaderCell.propTypes = {
	activeCollection: React.PropTypes.string,
	header: React.PropTypes.string,
	isConfirmed: React.PropTypes.bool,
	isIgnored: React.PropTypes.bool,
	onIgnoreColumnToggle: React.PropTypes.func
};

export default HeaderCell;