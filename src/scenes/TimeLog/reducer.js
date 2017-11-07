import { combineReducers } from 'redux';

import { reducer as TimeLog } from './data/reducer';

export const reducer = combineReducers({
	timeLog : TimeLog
})