import { combineReducers } from 'redux';
import * as actions from './action';

const initialState = [];

export const reducer = (state = initialState, action) =>{
	switch(action.type){
		case actions.SIGN_UP:
			return [...state, action.payload]
		default:
			return state
	}
}