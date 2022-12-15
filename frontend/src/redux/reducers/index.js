import { combineReducers } from 'redux';
import * as user from './userReducer';
import * as error from './errorReducer';

export const rootReducer = combineReducers({
    user: user.reducer,
    error: error.reducer
});