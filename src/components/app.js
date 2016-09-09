import React from "react";
import { getSearchClients } from "../actions/solr";
import SolrFacetedSearch from  "solr-faceted-search-react";

class App extends React.Component {
	render() {
		const { solr, onCreateIndexes } = this.props;

		console.log(getSearchClients());
		return solr.indexPresent ? (
			<div>
				{getSearchClients().map((searchClient) => (
					<SolrFacetedSearch
						{...solr.searchStates[searchClient.name]}
						{...searchClient.client.getHandlers()}
						key={searchClient.name}
						onSelectDoc={(...args) => console.log(args)}
						truncateFacetListsAt={20}
					/>
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