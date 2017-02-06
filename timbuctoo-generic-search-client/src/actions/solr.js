import xhr from "xhr";

import { SolrClient } from "solr-faceted-search-react";


let searchClients = [];

export const getSearchClients = () => searchClients;

export function checkIndex(afterCheck) { 
	return function (dispatch, getState) {
		const { metadata: {collections, vreId} } = getState();
		const collection = Object.keys(collections)
			.map((collectionName) => collections[collectionName] )
			.filter((collection) => !collection.unknown && !collection.relationCollection)
			.map((collection) => collection.collectionName)[0];
		xhr(`${process.env.INDEXER_URL}/status/${vreId}`, {//FIXME REPLACE WITH ENV
			headers: {"Accept": "application/json"}
		}, (err, resp) => {
			if (resp.statusCode !== 200) {
				dispatch({type: "SET_INDEX_PRESENT", present: false})
				dispatch({type: "INDEXES_PENDING", errorMessage: "Communication with the server failed"});
				window.setTimeout(() => dispatch(checkIndex(afterCheck)), 1000);
			} else {
				const result = JSON.parse(resp.body)
				if (result.ready){
					dispatch(configureSearchClients());
				} else {
					if (result.updating) {
						dispatch({type: "SET_INDEX_PRESENT", present: false})
						dispatch({type: "INDEXES_PENDING", data: result});
						window.setTimeout(() => dispatch(checkIndex(afterCheck)), 1000);
					} else {
						dispatch({type: "SET_INDEX_PRESENT", present: false})
					}
				}
			}
			afterCheck();
		})
	};
}

const getPropSuffix = (archetypeType) =>
	archetypeType === "datable" ? "i" :
		archetypeType === "text" || archetypeType === "select" ? "s" :
			archetypeType === "names" ? "t" :
				archetypeType === "relation" || archetypeType === "list-of-strings" || archetypeType === "multiselect" ? "ss" : "";

const getFacetType = (archetypeType) =>
	archetypeType === "datable" ? "range-facet" :
		archetypeType === "text" || archetypeType === "select" ? "list-facet" :
			archetypeType === "names" ? "text" :
				archetypeType === "relation"  || archetypeType === "list-of-strings" || archetypeType === "multiselect" ? "list-facet" : "";

const configureSearchClients = () => (dispatch, getState) => {
	const { metadata: {collections, archetypeCollections} } = getState();

	const archetypes = Object.keys(archetypeCollections)
		.map((archetypeCollectionName) => archetypeCollections[archetypeCollectionName]);

	searchClients = Object.keys(collections)
		.map((collectionName) => collections[collectionName] )
		.filter((collection) => !collection.unknown && !collection.relationCollection)
		.map((collection) => ({
			client: new SolrClient({
				url: `${process.env.SOLR_QUERY_URL}/${collection.collectionName}/select`,
				searchFields:
					[{label: "Search", field: "displayName_t", type: "text"}].concat(
						archetypes
						.find((archetype) => archetype.archetypeName === collection.archetypeName).properties
						.filter((prop) => collection.properties.map((prop1) => prop1.name).indexOf(prop.name) > -1)
						.map((prop) => ({
							label: prop.name,
							field: `${prop.name}_${getPropSuffix(prop.type)}`,
							type: getFacetType(prop.type),
							collapse: false
						}))
					),
				sortFields:archetypes
					.find((archetype) => archetype.archetypeName === collection.archetypeName).properties
					.filter((prop) => collection.properties.map((prop1) => prop1.name).indexOf(prop.name) > -1)
					.map((prop) => ({
						label: prop.name,
						field: `${prop.name}_${getPropSuffix(prop.type)}`
					})),
				facetSort: "count",
				rows: 25,
				onChange: (state) => dispatch({
					type: "SET_SEARCH_STATE",
					collectionName: collection.collectionName,
					searchState: state
				})
			}),
			name: collection.collectionName,
			label: collection.collectionLabel
		}));

	searchClients.forEach((searchClient) => searchClient.client.initialize());

	dispatch({type: "SET_INDEX_PRESENT", present: true});
};

export const createIndexes = () => (dispatch, getState) => {
	const { metadata: { vreId } } = getState();
	dispatch({type: "INDEXES_PENDING"});
	xhr(`${process.env.INDEXER_URL}/trigger`, {
		body: JSON.stringify({datasetName: vreId}),
		headers: {
        "Content-Type": "application/json"
    },
		method: "POST"
	}, (err, resp) => {
		if (resp.statusCode === 200) {
			dispatch(configureSearchClients());
		} else {
			dispatch({type: "INDEXES_FAILED"});
		}
	})
};
