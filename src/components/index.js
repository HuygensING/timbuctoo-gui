import React from "react";
import Form from "./form";
import {Login, Basic} from "hire-login";

class App extends React.Component {
	render() {
		let idDiv = this.props.entity.data && this.props.entity.data._id ?
			(<div>
				<label>ID</label>:
				<span>{this.props.entity.data._id}</span>
			</div>) : null;
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
				{idDiv}
				<Form {...this.props} />
			</div>
		);
	}
}

App.propTypes = {
	entity: React.PropTypes.object,
	onLoginChange: React.PropTypes.func,
	onNew: React.PropTypes.func
};

export default App;