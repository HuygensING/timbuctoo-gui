const initialState = {
  userId: undefined,
  myVres: undefined
};


export default function(state=initialState, action) {
	switch (action.type) {
		case "LOGIN":
			return {
				userId: action.data,
				myVres: action.vreData ? action.vreData.mine : {},
				vres: action.vreData ? action.vreData.public : {}
			};
	}

	return state;
}