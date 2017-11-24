import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducer as LoginReducer } from './scenes/Login/reducer';
import { reducer as ForgotPasswordReducer } from './scenes/ForgotPassword/reducer';
import { reducer as SignUpReducer } from './scenes/SignUp/reducer';
import { reducer as ResetPasswordReducer } from './scenes/ResetPassword/reducer';
import { reducer as DashboardReducer } from './scenes/Dashboard/reducer';
import { reducer as TeamsReducer } from './scenes/Teams/reducer';
import { reducer as ProjectsReducer } from './scenes/Projects/reducer';
import { reducer as UserReducer } from './scenes/User/reducer';
import { reducer as TaskReducer } from './scenes/Tasks/reducer';
import { reducer as TimeLogReducer } from './scenes/TimeLog/reducer';

const appReducers = combineReducers({
	login: LoginReducer,
	forgotPassword: ForgotPasswordReducer,
	signUp : SignUpReducer,
	resetPassword : ResetPasswordReducer,
	dashboard: DashboardReducer,
	projects: ProjectsReducer,
	teams: TeamsReducer,
	tasks: TaskReducer,
	user: UserReducer,
	timeLogs : TimeLogReducer
})

export default createStore(
	appReducers,
	applyMiddleware(thunk)
)