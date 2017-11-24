import { combineReducers } from 'redux';

import { reducer as AddUserReducer } from './AddUser/reducer';
import { reducer as UserDetailReducer } from './UserDetail/reducer';
import { reducer as UserListReducer } from './UserList/reducer';

export const reducer = combineReducers({
	addUser : AddUserReducer,
	userList : UserListReducer,
	userDetail : UserDetailReducer,
})