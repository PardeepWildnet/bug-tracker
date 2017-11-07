import { combineReducers } from 'redux';

import { reducer as quizReducer }  from './data/reducer';

export const reducer = combineReducers({
	data : quizReducer	
})