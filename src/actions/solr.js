import xhr from "xhr";

import { SolrClient } from "solr-faceted-search-react";


let searchClients = [];

const getSearchClients = () => searchClients;

const checkIndex = (afterCheck) => (dispatch, getState) => {
	const { metadata: {collections} } = getState();
	const collection = Object.keys(collections)
		.map((collectionName) => collections[collectionName] )
		.filter((collection) => !collection.unknown && !collection.relationCollection)
		.map((collection) => collection.collectionName)[0];

	xhr(`/solr/${collection}/select`, {
		headers: {"Accept": "application/json"}
	}, (err, resp) => {
		if (resp.statusCode !== 200) {
			dispatch({type: "SET_INDEX_PRESENT", present: false})
		} else {
			dispatch(configureSearchClients());
		}
		afterCheck();
	})
};

const getPropSuffix = (archetypeType) =>
	archetypeType === "datable" ? "i" :
		archetypeType === "text" ? "s" :
			archetypeType === "relation" ? "ss" : "";

const getFacetType = (archetypeType) =>
	archetypeType === "datable" ? "range-facet" :
		archetypeType === "text" ? "list-facet" :
			archetypeType === "relation" ? "list-facet" : "";

const configureSearchClients = () => (dispatch, getState) => {
	const { metadata: {collections, archetypeCollections} } = getState();

	const archetypes = Object.keys(archetypeCollections)
		.map((archetypeCollectionName) => archetypeCollections[archetypeCollectionName]);

	searchClients = Object.keys(collections)
		.map((collectionName) => collections[collectionName] )
		.filter((collection) => !collection.unknown && !collection.relationCollection)
		.map((collection) => ({
			client: new SolrClient({
				url: `/solr/${collection.collectionName}/select`,
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

const createIndexes = () => (dispatch, getState) => {
	const { metadata: { vreId } } = getState();
	dispatch({type: "INDEXES_PENDING"});
	xhr(`/${vreId}`, {
		method: "POST"
	}, (err, resp) => {
		if (resp.statusCode === 200) {
			dispatch(configureSearchClients());
		} else {
			dispatch({type: "INDEXES_FAILED"});
		}
	})
};

export default { checkIndex, createIndexes, getSearchClients }