import React from "react";
import {Login, Basic} from "hire-login";
import Select from "hire-forms-select";
import Form from "./form";
import RequestLog from "./request-log";


class App extends React.Component {
	render() {
		console.log(this.props.vre, this.props.entity);


		let errorMessage = this.props.entity.errorMessage ? <div style={{fontWeight: "bold", color: "red"}}>{this.props.entity.errorMessage}</div> : null;

		const domains = (this.props.vre.collections || []).map((domain) => domain.name.replace(/s$/, ""));

		let domainSelect = domains.length ? (
			<Select
				onChange={(domain) => this.props.onNew(domain)}
				options={domains}
				placeholder="- select a domain - "
				value={this.props.entity.domain || ""}
			/>
		) : null;

		let businessPart = this.props.vre.vreId ? (
			<div>
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
				{errorMessage}
				<ul id="vre-list">
					{this.props.vre.list.map((vreId) => (
						<li key={vreId} onClick={() => this.props.onSelectVre(vreId)}>{vreId}</li>
					))}
					<li>{domainSelect}</li>
				</ul>
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
	onSelectVre: React.PropTypes.func,
	vre: React.PropTypes.object
};

export default App;