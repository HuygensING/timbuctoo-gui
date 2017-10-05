import { Action } from '../typings/index';
import { SearchReducer } from '../typings/store';

const initialState: SearchReducer = {
    dataset: '',
    collection: '',
    filter: ''
};

// actions
const SUBMIT_SEARCH = 'SUBMIT_SEARCH';

// reducer
export default (state: SearchReducer = initialState, action: Action) => {
    switch (action.type) {
        case SUBMIT_SEARCH:
            return {
                ...state,
                [action.payload.type]: action.payload.value
            };
        default:
            return state;
    }
};

// action creators
export const submitSearch = (type: string, value: string) => {
    return {
        type: SUBMIT_SEARCH,
        payload: { type, value }
    };
};