import { combineReducers } from 'redux';

import { reducer as TaskReducer } from './data/reducer';

export const reducer = combineReducers({
	data : TaskReducer
})