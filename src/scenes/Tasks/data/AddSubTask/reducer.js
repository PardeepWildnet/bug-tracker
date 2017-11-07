import * as actions from './action';

const initialState = [];

export const reducer = (state = initialState, action) =>{
	switch(action.type){
		case actions.ADD_SUBTASK:
			return [...state, action.payload]
		default:
			return state
	}
}