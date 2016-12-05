import React from "react";
import cx from "classnames";

class HeaderCell extends React.Component {

  render() {
    const { header, isConfirmed } = this.props;

    return (
      <th className={cx({
        success: isConfirmed,
        info: !isConfirmed
      })}>
        {header}
        <span className={cx("pull-right", "glyphicon", {
          "glyphicon-ok-sign": isConfirmed,
          "glyphicon-question-sign": !isConfirmed,
        })}>
        </span>
      </th>
    );
  }
}

HeaderCell.propTypes = {
  header: React.PropTypes.string,
  isConfirmed: React.PropTypes.bool
};

export default HeaderCell;