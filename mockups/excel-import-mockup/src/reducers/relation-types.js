const initialState = [];


export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_RELATION_TYPES":
			return action.data;
	}

	return state;
}