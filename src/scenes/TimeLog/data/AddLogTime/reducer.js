import * as actions from './action';

const initialState = [];

export const reducer = (state = initialState, action) =>{
	console.log("inside reducer of add log time and payload is :- ", action.payload);
	switch(action.type){
		case actions.ADD_TIME_LOG:
			return [...state, action.payload]
		default:
			return state
	}
}