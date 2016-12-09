import {combineReducers} from "redux";

import entity from "./entity";
import messages from "./messages";
import user from "./user";
import vre from "./vre";
import quickSearch from "./quick-search";

export default combineReducers({
	vre: vre,
	entity: entity,
	user: user,
	messages: messages,
	quickSearch: quickSearch
});