import React from "react";
import {Login, Basic} from "hire-login";
import Select from "hire-forms-select";
import Form from "./form";
import FacetedSearch from "hire-faceted-search";
import RequestLog from "./request-log";
import SearchFilters from "./search-filters";
import config from "../../config";

class App extends React.Component {
	render() {
		console.log(this.props.vre, this.props.entity);

		let errorMessage = this.props.entity.errorMessage ? <div style={{fontWeight: "bold", color: "red"}}>{this.props.entity.errorMessage}</div> : null;

		const domains = Object.keys(this.props.vre.collections || {});

		let domainSelect = domains.length ? (
			<Select
				onChange={(domain) => this.props.onNew(domain)}
				options={domains}
				placeholder="- select a domain - "
				value={this.props.entity.domain || ""}
			/>
		) : null;

		let addNewButton = this.props.vre.vreId && this.props.entity.domain ?
			<button onClick={() => this.props.onNew(this.props.entity.domain)}>Add new</button>
			: null;

		let businessPart = this.props.vre.vreId && this.props.entity.domain ? (
			<div>
				<Form {...this.props} />
				<FacetedSearch
					config={{
						baseURL: config.apiUrl["v2.1"],
						searchPath: `/search/${this.props.entity.domain}`,
						headers: {
							VRE_ID: this.props.vre.vreId,
							Accept: "application/json"
						}
					}}
					customComponents={{
						filters: SearchFilters
					}}
					key={this.props.entity.domain}
					onSelect={(obj) => this.props.onSelect({id: obj.id, domain: `${obj.type}s`})}
				/>
			</div>) : null;

		return (
			<div>
				<RequestLog {...this.props} />
				<Login
					appId={this.props.vre.vreId}
					headers={{VRE_ID: "WomenWriters"}}
					onChange={this.props.onLoginChange}
					userUrl={`${config.apiUrl["v2.1"]}/system/users/me`}>
					<Basic url={`${config.apiUrl["v2.1"]}/authenticate`} />
				</Login>
				{errorMessage}
				<ul id="vre-list">
					{this.props.vre.list.map((vreId) => (
						<li key={vreId} onClick={() => this.props.onSelectVre(vreId)}>{vreId}</li>
					))}
					<li>{domainSelect}</li>
					<li>{addNewButton}</li>
				</ul>
				{businessPart}

			</div>
		);
	}
}

App.propTypes = {
	entity: React.PropTypes.object,
	onLoginChange: React.PropTypes.func,
	onNew: React.PropTypes.func,
	onSelect: React.PropTypes.func,
	onSelectVre: React.PropTypes.func,
	vre: React.PropTypes.object
};

export default App;