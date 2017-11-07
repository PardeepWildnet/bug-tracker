import * as loginActions from './action';

const initialState = [];

export const reducer = (state = initialState, action) =>{
	switch(action.type){
		case loginActions.LOG_IN:
			return [...state, action.payload]
		default:
			return state
	}
}