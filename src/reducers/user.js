let initialState = null;

export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_USER":
			if (action.user) {
				return action.user;
			} else {
				return state;
			}
			break;
		case "SESSION_EXPIRED":
			return null;
		case "SET_USER_DATA":
			return state
				? {...state, userData: action.userData }
				: null;
		default:
			return state;
	}
}