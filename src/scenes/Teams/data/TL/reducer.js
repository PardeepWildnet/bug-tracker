import * as actions from './action';

const initialState = [];

export const reducer = (state = initialState, action) => {
	debugger
	switch(action.type){
		case actions.FETCH_API:
			return [...state, action.payload]
		default: 
			return state;
	}
}