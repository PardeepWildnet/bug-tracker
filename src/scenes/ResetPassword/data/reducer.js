import { combineReducers } from 'redux';

import { reducer as ResetPasswordReducer } from './ResetPasswordView/reducer';

export const reducer = combineReducers({
	resetPassword: ResetPasswordReducer
})