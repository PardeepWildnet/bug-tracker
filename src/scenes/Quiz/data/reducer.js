import { combineReducers } from 'redux';

import { reducer as quizReducer }  from './quiz/reducer';

export const reducer = combineReducers({
	quizview : quizReducer
})