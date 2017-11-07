import { combineReducers } from 'redux';

import { reducer as AddTasksReducer } from './AddTasks/reducer';
import { reducer as ShowTaskReducer } from './TaskList/reducer';
import { reducer as AddSubTaskReducer } from './AddSubTask/reducer';
import { reducer as ShowSubTaskReducer } from './ShowSubTaskList/reducer';

export const reducer = combineReducers({
	addTasks : AddTasksReducer,
	showTasks : ShowTaskReducer,
	addSubTask : AddSubTaskReducer,
	showSubTask : ShowSubTaskReducer
})