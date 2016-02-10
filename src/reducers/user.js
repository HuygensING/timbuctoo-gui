let initialState = null;

export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_USER":
			return action.user;

		default:
			return state;
	}
}