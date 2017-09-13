import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import user from './user';
import { State } from '../typings/store';
import Client from '../services/ApolloClient';

const appReducers = combineReducers({
    user,
    form: reduxFormReducer,
    apollo: Client.reducer()
});

export default function rootReducer (state: State, action: {type: any}) {
    return appReducers(state, action);
}
