import { combineReducers } from 'redux';

import { reducer as ProjectsListReducer } from './ProjectsList/reducer';
import { reducer as AddProjectsReducer } from './AddProjects/reducer';
import { reducer as DeleteProjectReducer } from './DeleteProject/reducer';
import { reducer as EditProjectsReducer } from './EditProject/reducer';

export const reducer = combineReducers({
	projectsList : ProjectsListReducer,
	editProjects : EditProjectsReducer,
	deleteProject : DeleteProjectReducer,
	addProjects : AddProjectsReducer
})