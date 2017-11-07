import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducer as LoginReducer } from './scenes/Login/reducer';
import { reducer as DashboardReducer } from './scenes/Dashboard/reducer';
import { reducer as QuizReducer } from './scenes/Quiz/reducer';
import { reducer as ProjectsReducer } from './scenes/Projects/reducer';
import { reducer as TaskReducer } from './scenes/Tasks/reducer';
import { reducer as TimeLogReducer } from './scenes/TimeLog/reducer';

const appReducers = combineReducers({
	login: LoginReducer,
	dashboard: DashboardReducer,
	quiz: QuizReducer,
	projects: ProjectsReducer,
	tasks: TaskReducer,
	timeLogs : TimeLogReducer
})

export default createStore(
	appReducers,
	applyMiddleware(thunk)
)