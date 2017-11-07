import { combineReducers } from 'redux';

import { reducer as loginViewReducer } from './LoginView/reducer';

export const reducer = combineReducers({
	loginview: loginViewReducer
})