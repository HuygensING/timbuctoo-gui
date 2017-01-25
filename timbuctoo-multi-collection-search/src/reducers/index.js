import {combineReducers} from "redux";
import solrSearch from "./solr-search";
import entity from "./entity";
import pagination from "./pagination";
import metadata from "./metadata";

export default combineReducers({
  solrSearch: solrSearch,
  entity: entity,
  pagination: pagination,
  metadata: metadata
});
