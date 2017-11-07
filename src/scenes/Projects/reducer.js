import { combineReducers } from 'redux';

import { reducer as DataReducer  } from './data/reducer';

export const reducer = combineReducers({
	data: DataReducer
})