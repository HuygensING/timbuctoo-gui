let initialState = {
	test: "foo"
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_TEST":
			state = {...state, ...{
				test: action.test
			}};

			break;
	}

	return state;
}