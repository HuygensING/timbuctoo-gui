import React from "react";
import ReactDOM from "react-dom";

const lPad = (i) => {
	const str = `${i}`;
	if(str.length === 1) { return `0${str}`; }
	return str;
};

const formatTime = (time) => `${time.getFullYear()}-${lPad(time.getMonth())}-${lPad(time.getDate())}T${lPad(time.getHours())}:${lPad(time.getMinutes())}:${lPad(time.getSeconds())}`;

class RequestLog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			toggle: "open"
		};
	}

	componentDidUpdate() {
		let me = ReactDOM.findDOMNode(this).querySelector("div");
		let heights = Array.prototype.slice.call(me.childNodes).map((el) => el.getBoundingClientRect().height);
		if(heights.length === 0) { return; }
		me.scrollTop = (heights.reduce((a, b) => a + b));
	}

	onToggle() {
		if(this.state.toggle === "open") {
			this.setState({toggle: "close"});
		} else {
			this.setState({toggle: "open"});
		}
	}

	render() {
		return (
			<div className={this.state.toggle} id="request-log">
				<button onClick={this.onToggle.bind(this)}>{this.state.toggle}</button>
				<div>
					{this.props.messages.log.map((msg, i) => (
						<div className={msg.type} key={i}>
							<span className="time">{formatTime(msg.time)}</span>-<span className="msg">{msg.message}</span>
						</div>
					))}
				</div>
			</div>
		);
	}
}

RequestLog.propTypes = {
	messages: React.PropTypes.object
};

export default RequestLog;