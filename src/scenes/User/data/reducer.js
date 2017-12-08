import { combineReducers } from 'redux';

import { reducer as AddUserReducer } from './AddUser/reducer';
import { reducer as UserDetailReducer } from './UserDetail/reducer';
import { reducer as EditUserDetailReducer } from './EditUser/reducer';
import { reducer as UserRoleReducer } from './UserRole/reducer';
import { reducer as UserListReducer } from './UserList/reducer';

export const reducer = combineReducers({
	addUser : AddUserReducer,
	userList : UserListReducer,
	userRole : UserRoleReducer,
	editUser : EditUserDetailReducer,
	userDetail : UserDetailReducer,
})