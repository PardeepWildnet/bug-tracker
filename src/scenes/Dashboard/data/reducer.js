import { combineReducers } from 'redux';

import { reducer as dashboardReducer } from './dashboard/reducer'

export const reducer = combineReducers({
	dashboard : dashboardReducer
})