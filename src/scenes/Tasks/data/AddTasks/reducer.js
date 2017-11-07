import * as actions from './action';

const initialState = [];

export const reducer = (state = initialState, action) =>{
	switch(action.type){
		case actions.GET_TASK:
			return [...state, action.payload]
		default:
			return state
	}
}