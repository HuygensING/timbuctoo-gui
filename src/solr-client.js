import { SolrClient } from "solr-faceted-search-react";

import store from "./store";




const fields = [
  { label: "", field: "dataset_s", type: "list-facet"},
  { label: "Search", field: "displayName_t", type: "text" },
  { label: "Archetype", field: "archetype_name_s", type: "list-facet", facetSort: "index"},
  { label: "Person gender", field: "gender_s", type: "list-facet", collapse: true },
  { label: "Date of birth", field: "birthDate_i", type: "range-facet", collapse: true },
  { label: "Date of death", field: "deathDate_i", type: "range-facet", collapse: true },
  { label: "Work language", field: "hasWorkLanguage_ss", type: "list-facet", collapse: true },
  { label: "Person religion", field: "hasReligion_ss", type: "list-facet", collapse: true },
  { label: "Publish location", field: "hasPublishLocation_ss", type: "list-facet", collapse: true },
  { label: "Archive location", field: "has_archive_place_ss", type: "list-facet", collapse: true },
  { label: "Residence location", field: "hasResidenceLocation_ss", type: "list-facet", collapse: true },
  { label: "Document type", field: "documentType_s", type: "list-facet", collapse: true },
  { label: "Person profession", field: "hasProfession_ss", type: "list-facet", collapse: true },
  { label: "Legislation keyword", field: "has_legislation_keyword_ss", type: "list-facet", collapse: true },
  { label: "Legislation location", field: "has_legislation_place_ss", type: "list-facet", collapse: true },
  { label: "Collective location", field: "hasLocation_ss", type: "list-facet", collapse: true },
  { label: "Archive keyword", field: "has_archive_keyword_ss", type: "list-facet", collapse: true },
  { label: "Archiver keyword", field: "has_archiver_keyword_ss", type: "list-facet", collapse: true },
  { label: "Place of birth", field: "hasBirthPlace_ss", type: "list-facet", collapse: true },
  { label: "Place of death", field: "hasDeathPlace_ss", type: "list-facet", collapse: true },
];

const sortFields = [
  { label: "Order by dataset", field: "dataset_s", value: "asc"},
  { label: "Order by item", field: "uuid_s"}
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