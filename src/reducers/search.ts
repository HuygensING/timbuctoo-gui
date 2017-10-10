export interface SearchReducer {
    dataset: Readonly<string>;
    collection: Readonly<string>;
    filter: Readonly<string>;
}

const initialState: SearchReducer = {
    dataset: '',
    collection: '',
    filter: ''
};

// actions
interface SubmitSearchAction {
    type: 'SUBMIT_SEARCH';
    payload: {
        type: keyof SearchReducer,
        value: string
    };
}
type Action = SubmitSearchAction;

// reducer
export default (state: SearchReducer = initialState, action: Action): SearchReducer => {
    switch (action.type) {
        case 'SUBMIT_SEARCH':
            return {
                ...state,
                [action.payload.type]: action.payload.value
            };
        default:
            return state;
    }
};

// action creators
export const submitSearch = (type: keyof SearchReducer, value: string) => {
    return {
        type: 'SUBMIT_SEARCH',
        payload: { type, value }
    };
};