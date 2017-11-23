import { combineReducers } from 'redux';

import { reducer as EditProfileViewReducer } from './EditProfileView/reducer';

export const reducer = combineReducers({
	editProfileView : EditProfileViewReducer
})