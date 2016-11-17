import { SolrClient } from "solr-faceted-search-react";

import store from "./store";

const fields = [
  { label: "Search", field: "displayName_t", type: "text" },
  { label: "Archetype", field: "archetype_name_s", type: "list-facet", facetSort: "index"},
  { label: "Person gender", field: "gender_s", type: "list-facet"},
  { label: "", field: "dataset_s", type: "list-facet"}
];

const sortFields = [
  { label: "Order by dataset", field: "dataset_s", value: "asc" },
  { label: "Order by item", field: "uuid_s" }
];

const searchClient = new SolrClient({
  url: "/repositorysolr/federated",
  searchFields: fields,
  sortFields: sortFields,
  rows: 50,
  pageStrategy: "paginate",
  facetSort: "count",
  onChange: (state) => {
    store.dispatch({type: "SET_SEARCH_STATE", state: state});
  }
});

export default searchClient;