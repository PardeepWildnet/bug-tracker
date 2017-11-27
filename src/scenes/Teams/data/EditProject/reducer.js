import * as actions from './action';

const initialState = [];

export const reducer = (state = initialState, action) =>{
	debugger
	switch(action.type){
		case actions.EDIT_PROJECT_DETAILS:
			return [...state, action.payload]
		default:
			return state
	}
}