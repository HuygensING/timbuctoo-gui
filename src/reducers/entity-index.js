import clone from "clone-deep";

let initialState = {
	records: JSON.parse(localStorage.getItem("entity-index") || "[]")
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "RECEIVE_ENTITY":
			let records = clone(state.records);
			if(!records.filter((r) => r.id === action.data._id).length) {
				records = records.concat({
					id: action.data._id,
					domain: action.data["@type"]
				});
			}
			localStorage.setItem("entity-index", JSON.stringify(records));
			return {records: records};
	}

	return state;
}