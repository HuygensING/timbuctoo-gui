import React from "react";

class TextSearch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: "",
			searching: false
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			searching: false,
			value: nextProps.value
		});
	}

	handleInputChange(ev) {
		this.setState({
			value: ev.target.value
		});
	}

	handleInputKeyDown(ev) {
		if (ev.keyCode === 13) {
			this.handleSubmit();
		}
	}

	handleSubmit() {
		this.setState({
			searching: true
		});

		this.props.onChangeSearchTerm(this.state.value);
	}

	render() {
		return (
			<div>
				<input
					onChange={this.handleInputChange.bind(this)}
					onKeyDown={this.handleInputKeyDown.bind(this)}
					value={this.state.value} />
				<button onClick={this.handleSubmit.bind(this)}>
					Search
				</button>
			</div>
		);
	}
}

TextSearch.defaultProps = {
	field: "term"
};

TextSearch.propTypes = {
	field: React.PropTypes.string,
	labels: React.PropTypes.object,
	onChangeSearchTerm: React.PropTypes.func
};

export default TextSearch;