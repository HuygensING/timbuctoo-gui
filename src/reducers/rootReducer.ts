import { combineReducers } from 'redux';
import user from './user';
import { State } from '../typings/store';

const appReducers = combineReducers({
    user
});

export default function rootReducer (state: State, action: {type: any}) {
    return appReducers(state, action);
}
