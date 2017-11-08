import * as actions from './action';

const initialState = [];

export const reducer = (state = initialState, action) => {
	switch(action.type){
		case actions.SHOW_SUB_TASK:
			return [...state, action.payload]
		default: 
			return state;
	}
}