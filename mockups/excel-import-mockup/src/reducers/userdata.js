const initialState = {
  userId: undefined
};


export default function(state=initialState, action) {
	switch (action.type) {
		case "LOGIN":
			return {
        userId: action.data
      }
	}

	return state;
}
