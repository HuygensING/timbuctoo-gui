import {combineReducers} from "redux";
import solrSearch from "./solr-search";

export default combineReducers({
  solrSearch: solrSearch
});
