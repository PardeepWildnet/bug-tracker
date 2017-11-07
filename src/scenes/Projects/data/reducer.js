import { combineReducers } from 'redux';

import { reducer as ProjectsListReducer } from './ProjectsList/reducer';
import { reducer as AddProjectsReducer } from './AddProjects/reducer';

export const reducer = combineReducers({
	projectsList : ProjectsListReducer,
	addProjects : AddProjectsReducer
})