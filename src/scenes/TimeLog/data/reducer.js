import { combineReducers } from 'redux';

import { reducer as AddTimeLog } from './AddLogTime/reducer';
import { reducer as ShowTimeLogs } from './ShowTimeStamps/reducer';

export const reducer = combineReducers({
	addTimeLog : AddTimeLog,
	showTimeLogs : ShowTimeLogs
})