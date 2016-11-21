import {combineReducers} from "redux";
import solrSearch from "./solr-search";
import entity from "./entity";

export default combineReducers({
  solrSearch: solrSearch,
  entity: entity
});
