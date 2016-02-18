import React from "react";
import {Login, Basic} from "hire-login";

import Form from "./form";
import RequestLog from "./request-log";


class App extends React.Component {
	render() {
		console.log(this.props.vre, this.props.entity);

		let idDiv = this.props.entity.data && this.props.entity.data._id ?
			(<div>
				<label>ID</label>:
				<span>{this.props.entity.data._id}</span>
			</div>) : null;

		let errorMessage = this.props.entity.errorMessage ?
			<pre style={{fontWeight: "bold", color: "red"}}>{this.props.entity.errorMessage}</pre> : null;

		let businessPart = this.props.vre.vreId ? (
			<div>
				<button onClick={() => this.props.onNew("wwperson")}>New wwperson</button>
				<button onClick={() => this.props.onNew("wwdocument")}>New wwdocument</button>
				{errorMessage}
				{idDiv}
				<Form {...this.props} />
				<ul id="entity-index">
					{this.props.entityIndex.records.map((record, i) => (
						<li key={i} onClick={() => this.props.onSelect(record)}>
							{record.domain} - {record.id}
						</li>
					))}
				</ul>
			</div>) : null;

		return (
			<div>
				<RequestLog {...this.props} />
				<Login
					appId={this.props.vre.vreId}
					headers={{VRE_ID: "WomenWriters"}}
					onChange={this.props.onLoginChange}
					userUrl="/api/v2.1/system/users/me">
					<Basic url="/api/v2.1/authenticate"/>
				</Login>
				{businessPart}

			</div>
		);
	}
}

App.propTypes = {
	entity: React.PropTypes.object,
	entityIndex: React.PropTypes.object,
	onLoginChange: React.PropTypes.func,
	onNew: React.PropTypes.func,
	onSelect: React.PropTypes.func,
	vre: React.PropTypes.object
};

export default App;