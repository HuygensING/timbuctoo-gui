import React from "react";

class Messages extends React.Component {


	render() {
		const { messages, type, onDismissMessage } = this.props;

		const filteredMessages = messages.log
			.map((msg, idx) => ({message: msg.message, index: idx, type: msg.type, dismissed: msg.dismissed }))
			.filter((msg) => msg.type === type && !msg.dismissed);

		return (<div>
			{filteredMessages.map((msg, i) => (
				<div className="alert alert-danger alert-dismissible" key={i}>
					<button className="close" onClick={() => onDismissMessage(msg.index)}><span aria-hidden="true">&times;</span></button>
					<strong>Warning!</strong> <span>{msg.message}</span>
				</div>
			))}
		</div>);
	}
}

Messages.propTypes = {
	messages: React.PropTypes.object,
	onDismissMessage: React.PropTypes.func.isRequired,
	type: React.PropTypes.string.isRequired
};

export default Messages;