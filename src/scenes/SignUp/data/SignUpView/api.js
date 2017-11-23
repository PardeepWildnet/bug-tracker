import axios from 'axios';

import * as toast from './../../../../App.js'
import * as signUpActions from './action';
import * as config from './../../../../config';

export const SignUpAPI = (signUpData) => (dispatch) => {
	let signUpDetails = {
		"firstName" : signUpData.firstName,
		"lastName" : signUpData.lastName,
		"email" : signUpData.email,
		"password" : signUpData.password,
		"accountType" : 'admin'
	}

	const url = config.base_url + 'api/register';
	axios.post(url, signUpDetails)
		.then(response => {
			dispatch(signUpActions.signUp(response))
			console.log(response, "signUp response");
		},
		err => {
			dispatch({type: 'error'})
			toast.showToast('signup failed');
			console.log(err, "signUp error response");
		})
}