const initialState = {
	data: []
};


export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_RELATION_TYPES":
			return {...state, data: action.data};
	}

	return state;
}