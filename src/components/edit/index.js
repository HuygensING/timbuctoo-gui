import React from "react";

import Form from "./form";
import FacetedSearch from "hire-faceted-search";
import SearchFilters from "./search-filters";
import Header from "./header";
import config from "../../config";


class App extends React.Component {

	render() {
		console.log(this.props.vre, this.props.entity);
		console.log(this.props.messages);
		const { messages } = this.props;

		const errorMessages = messages.log.filter((msg) => msg.type === "ERROR_MESSAGE");
		const errorMessage = errorMessages.length ? errorMessages[errorMessages.length - 1] : null;

		const errorMessageDiv = errorMessage ?
			<div className="alert alert-danger alert-dismissible">
				<button className="close" ><span aria-hidden="true">&times;</span></button>
				<strong>Warning!</strong> <span>{errorMessage.message}</span>
			</div> : null;

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
				<header>
					<Header {...this.props} />
				</header>
				<main>
					{errorMessageDiv}
					{businessPart}
				</main>
			</div>
		);
	}
}

App.propTypes = {
	entity: React.PropTypes.object,
	messages: React.PropTypes.object,
	onLoginChange: React.PropTypes.func,
	onNew: React.PropTypes.func,
	onSelect: React.PropTypes.func,
	onSelectVre: React.PropTypes.func,
	vre: React.PropTypes.object
};

export default App;