import { combineReducers } from 'redux';

import { reducer as ForgotPasswordReducer } from './ForgotPasswordView/reducer';

export const reducer = combineReducers({
	forgotPassword: ForgotPasswordReducer
})