import { combineReducers } from 'redux';
import user from './user';
import { IState } from '../typings/store';

const appReducers = combineReducers({
    user
});

export default function rootReducer (state: IState, action: {type: any}) {
    return appReducers(state, action);
}
