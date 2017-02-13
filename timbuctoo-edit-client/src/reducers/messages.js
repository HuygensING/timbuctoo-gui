import setIn from "../util/set-in";

const initialState = {
	log: []
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "REQUEST_MESSAGE":
			
		case "SUCCESS_MESSAGE":
			
		case "ERROR_MESSAGE":
			state.log.push({message: action.message, type: action.type, time: new Date()});
			return {
				...state,
				log: setIn([state.log.length-2, "dismissed"], true, state.log)
			};
		case "DISMISS_MESSAGE":
			return {
				...state,
				log: setIn([action.messageIndex, "dismissed"], true, state.log)
			};
	}

	return state;
}