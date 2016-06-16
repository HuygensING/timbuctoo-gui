import { getItem } from "./persist";

const initialState = getItem("archetype") || {};


export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_ARCHETYPE_METADATA":
			return action.data;
	}

	return state;
}