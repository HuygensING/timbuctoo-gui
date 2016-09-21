import React from "react";
import { getSearchClients } from "../actions/solr";
import SolrFacetedSearch from  "solr-faceted-search-react";
import { defaultComponentPack } from  "solr-faceted-search-react";

import cx from "classnames";

const customComponents = (collectionName) => ({
	...defaultComponentPack,
	results: {
		...defaultComponentPack.results,
		result: (props) => { console.log(props); return (
			<li className="list-group-item">
				<a target="_blank" href={`${globals.env.SERVER}/v2.1/domain/${collectionName}/${props.doc.id}`}>
					{props.doc.displayName_s}
				</a>
			</li>
		)}
	}
});

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeClient: null
		}
	}

	setActiveClient(name) {
		this.setState({activeClient: name});
	}

	render() {
		const { solr, onCreateIndexes } = this.props;
		const { activeClient } = this.state;

		const searchClients = getSearchClients();

		const visibleClient = !activeClient && searchClients.length > 0 ? searchClients[0].name : activeClient;

		return solr.indexPresent ? (
			<div>
				<header>
					<nav className="navbar navbar-default">
						<div className="navbar-header">
							<img style={{height: "44px", margin: "3px"}}
								src="https://www.huygens.knaw.nl/wp-content/bestanden/2011/03/LOGO-huygens-ing.gif" />
						</div>
						<ul className="nav navbar-nav">
							{searchClients.map((searchClient) => (
								<li className={cx({active: searchClient.name === visibleClient})} key={searchClient.name}>
									<a onClick={() => this.setActiveClient(searchClient.name)}>{searchClient.label}</a>
								</li>
							))}
						</ul>
					</nav>
				</header>
				{searchClients.map((searchClient) => (
					<div key={searchClient.name} style={{display: searchClient.name == visibleClient ? "block" : "none"}}>
						<SolrFacetedSearch
							{...solr.searchStates[searchClient.name]}
							{...searchClient.client.getHandlers()}
							onSelectDoc={(...args) => console.log(args)}
							customComponents={customComponents(searchClient.name)}
							truncateFacetListsAt={20}
							showCsvExport={true}
						/>
					</div>
				))}
			</div>
		) : (
			<div className="row">
				<div className="col-md-3">
					Your dataset does not appear to have indexes yet.
				</div>
				<div className="col-md-3">
					<button className="btn btn-success"
							onClick={onCreateIndexes}
							disabled={solr.indexesPending}>
						{solr.indexesPending ? "Creating search index, please wait" : "Create search index"}
					</button>
				</div>
			</div>
		)
	}
}

export default App;