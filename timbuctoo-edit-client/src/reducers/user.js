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
		default:
			return state;
	}
}