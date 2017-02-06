import React from "react";
import { getSearchClients } from "../actions/solr";
import FacetedSearch from "./faceted-search/faceted-search";
import Page from "./page.jsx";


class App extends React.Component {

	setActiveClient(name) {
		this.props.onSetActiveClient(name);
	}

	render() {
		const { metadata: {collections}, solr, onCreateIndexes, metadata: { vreId } } = this.props;
		const { solr: { activeClient, message, currentCollection, indexesPending } } = this.props;

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

		var pendingMessage = ""
		if (indexesPending) {
			var collectionCaption;

			if (currentCollection in collections) {
				collectionCaption = collections[currentCollection].collectionLabel
			} else {
				collectionCaption = currentCollection;
			}
			pendingMessage = "Creating search index: " + collectionCaption + " " + message
		} else {
			pendingMessage = "Create search index"
		}
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
								disabled={indexesPending}>
							{pendingMessage}
						</button>
					</div>
				</div>
			</Page>
		)
	}
}

export default App;