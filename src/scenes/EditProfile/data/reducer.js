import { combineReducers } from 'redux';

import { reducer as EditProfileViewReducer } from './EditProfileView/reducer';
import { reducer as UploadImageReducer } from './UploadImage/reducer';

export const reducer = combineReducers({
	uploadProfileView : UploadImageReducer,
	editProfileView : EditProfileViewReducer,
})
