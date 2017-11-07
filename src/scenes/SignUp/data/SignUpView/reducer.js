import { combineReducers } from 'redux';

const initialState = [];

export const reducer = (state = initialState, action) =>{
	switch(action.type){
		case signUpActions.SIGN_UP:
			return [...state, action.payload]
		default:
			return state
	}
}