import { combineReducers } from 'redux';

import { reducer as signUpViewReducer } from './SignUpView/reducer';

export const reducer = combineReducers({
	signUpView : signUpViewReducer
})