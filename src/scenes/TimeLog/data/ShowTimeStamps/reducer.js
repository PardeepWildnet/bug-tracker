import * as actions from './action';

const initialState = [];

export const reducer = (state = initialState, action) => {
	console.log("inside reducer ", state);
	switch(action.type){
		case actions.SHOW_TIME_LOG:
			return [...state, action.payload]
		default: 
			return state;
	}
}