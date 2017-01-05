import setIn from "../util/set-in";

let initialState = {
	data: {
		"@relations": []
	},
	domain: null,
	errorMessage: null
};

export default function(state=initialState, action) {
	switch (action.type) {

		case "BEFORE_FETCH_ENTITY":
			return {...state, ...{
				data: {
					"@relations": []
				}
			}};
		case "RECEIVE_ENTITY":
			return {...state, ...{
				data: action.data,
				domain: action.domain,
				errorMessage: action.errorMessage || null
			}};

		case "SET_ENTITY_FIELD_VALUE":
			return {...state, ...{
				data: setIn(action.fieldPath, action.value, state.data)
			}};

		case "RECEIVE_ENTITY_FAILURE":
			return {...state, ...{
				data: {
					"@relations": []
				},
				errorMessage: action.errorMessage
			}};

		case "SET_VRE": {
			return initialState;
		}

	}

	return state;
}