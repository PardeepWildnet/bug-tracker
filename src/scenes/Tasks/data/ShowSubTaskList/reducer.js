import * as actions from './action';

const initialState = [];

export const reducer = (state = initialState, action) => {
	console.log("inside reducer of showSubTaskList ", state);
	switch(action.type){
		case actions.SHOW_SUB_TASK:
			return [...state, action.payload]
		default: 
			return state;
	}
}