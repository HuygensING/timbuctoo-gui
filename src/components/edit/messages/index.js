import React from "react";

import cx from "classnames";

const LABELS = {
	"SUCCESS_MESSAGE": "Info",
	"ERROR_MESSAGE": "Warning!"
};

const CLASS_NAMES = {
	"SUCCESS_MESSAGE": "alert-success",
	"ERROR_MESSAGE": "alert-danger"
};

class Messages extends React.Component {
	render() {
		const { messages, types, onDismissMessage } = this.props;

		const filteredMessages = messages.log
			.map((msg, idx) => ({message: msg.message, index: idx, type: msg.type, dismissed: msg.dismissed }))
			.filter((msg) => types.indexOf(msg.type) > -1 && !msg.dismissed);

		return (<div>
			{filteredMessages.map((msg, i) => (
				<div className={cx("alert", "alert-dismissible", CLASS_NAMES[msg.type])} key={i}>
					<button className="close" onClick={() => onDismissMessage(msg.index)}><span aria-hidden="true">&times;</span></button>
					<strong>{LABELS[msg.type]}</strong> <span>{msg.message}</span>
				</div>
			))}
		</div>);
	}
}

Messages.propTypes = {
	messages: React.PropTypes.object,
	onDismissMessage: React.PropTypes.func.isRequired,
	types: React.PropTypes.array.isRequired
};

export default Messages;