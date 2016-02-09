import React from "react";

class App extends React.Component {
	render() {
		return (
			<div className="app">
				<button onClick={() => this.props.onNew("wwperson")}>New wwperson</button>
			</div>
		);
	}
}

App.propTypes = {
	data: React.PropTypes.object,
	onNew: React.PropTypes.func
};

export default App;