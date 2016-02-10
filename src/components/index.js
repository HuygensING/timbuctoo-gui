import React from "react";
import Form from "./form";
import {Login, Basic} from "hire-login";

class App extends React.Component {
	render() {
		console.log(this.props);
		return (
			<div>
				<Login
					appId="WomenWriters"
					headers={{VRE_ID: "WomenWriters"}}
					onChange={this.props.onLoginChange}
					userUrl="/api/v2.1/system/users/me">
					<Basic url="/api/v2.1/authenticate"/>
				</Login>
				<button onClick={() => this.props.onNew("wwperson")}>New wwperson</button>
				<button onClick={() => this.props.onNew("wwdocument")}>New wwdocument</button>
				<Form {...this.props} />
			</div>
		);
	}
}

App.propTypes = {
	data: React.PropTypes.object,
	onLoginChange: React.PropTypes.func,
	onNew: React.PropTypes.func
};

export default App;