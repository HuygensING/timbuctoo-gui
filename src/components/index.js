import React from "react";
import Form from "./form";

class App extends React.Component {
	render() {
		console.log(this.props);
		return (
			<div>
				<button onClick={() => this.props.onNew("wwperson")}>New wwperson</button>
				<button onClick={() => this.props.onNew("wwdocument")}>New wwdocument</button>
				<Form {...this.props} />
			</div>
		);
	}
}

App.propTypes = {
	data: React.PropTypes.object,
	onNew: React.PropTypes.func
};

export default App;