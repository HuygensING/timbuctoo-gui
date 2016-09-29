import React from "react";
import { getSearchClients } from "../actions/solr";
import FacetedSearch from "./faceted-search/faceted-search";
import Page from "./page.jsx";


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
		const { solr, onCreateIndexes, metadata: { vreId } } = this.props;
		const { activeClient } = this.state;

		const searchClients = getSearchClients();

		const visibleClient = !activeClient && searchClients.length > 0
			? searchClients[0]
			: searchClients.find((client) => client.name === activeClient);

		const visibleClientName = visibleClient ? visibleClient.name : null;


		const facetedSearchProps = visibleClient ? {
			collections: searchClients.map((searchClient) => ({
				label: searchClient.label,
				name: searchClient.name,
				selected: searchClient.name === visibleClientName,
				query: solr.searchStates[searchClient.name] ? solr.searchStates[searchClient.name].query : {},
				results: solr.searchStates[searchClient.name] ?  solr.searchStates[searchClient.name].results : {
					docs: [],
					numFound: 0,
					facets: {}
				},
			})),
			onCollectionSelect: (collectionName) => this.setActiveClient(collectionName),
			...visibleClient.client.getHandlers(),
			truncateFacetListsAt: 5,
			vreId: vreId
		} : null;

		return solr.indexPresent ? (
			<FacetedSearch {...facetedSearchProps} />
		) : (
			<Page>
				<div className="container">
					<div className="col-md-6">
						Your dataset does not appear to have indexes yet.
					</div>
					<div className="col-md-6">
						<button className="btn btn-success"
								onClick={onCreateIndexes}
								disabled={solr.indexesPending}>
							{solr.indexesPending ? "Creating search index, please wait" : "Create search index"}
						</button>
					</div>
				</div>
			</Page>
		)
	}
}

export default App;