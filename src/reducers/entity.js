let initialState = {
	data: null,
	domain: null,
	fieldDefinitions: null
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "NEW_ENTITY":
			state = {...state, ...{
				data: action.data,
				domain: action.domain,
				fieldDefinitions: action.fieldDefinitions
			}};

			break;
	}

	return state;
}