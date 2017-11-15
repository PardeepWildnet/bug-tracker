import { combineReducers } from 'redux';

import { reducer as AddTimeLog } from './AddLogTime/reducer';
import { reducer as ShowTimeLogs } from './ShowTimeStamps/reducer';
import { reducer as EditTimeLog } from './EditTimeLog/reducer';

export const reducer = combineReducers({
	addTimeLog : AddTimeLog,
	showTimeLogs : ShowTimeLogs,
	editTimeLog : EditTimeLog
})