import setIn from "../util/set-in";

const initialState = {
	log: []
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "REQUEST_MESSAGE":
			state.log.push({message: action.message, type: action.type, time: new Date()});
			return state;
		case "SUCCESS_MESSAGE":
			state.log.push({message: action.message, type: action.type, time: new Date()});
			return state;
		case "ERROR_MESSAGE":
			state.log.push({message: action.message, type: action.type, time: new Date()});
			return state;
		case "DISMISS_MESSAGE":
			return {
				...state,
				log: setIn([action.messageIndex, "dismissed"], true, state.log)
			};
	}

	return state;
}