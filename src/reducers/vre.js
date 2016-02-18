let initialState = {
	vreId: null
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_VRE":
			return {
				vreId: action.vreId
			};
		default:
			return state;
	}
}