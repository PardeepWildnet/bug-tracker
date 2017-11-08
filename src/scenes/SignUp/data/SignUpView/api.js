import axios from 'axios';

import * as signUpActions from './action';
import * as config from './../../../../config';

export const SignUpAPI = (signUpData) => (dispatch) => {
	let signUpDetails = {
		"first_name" : signUpData.firstName,
		"last_name" : signUpData.lastName,
		"email" : signUpData.email,
		"password" : signUpData.password,
		"username" : signUpData.firstName + signUpData.lastName,
		"is_active" : 1,
		"token" : config.token
	}

	const url = config.base_url + 'admin/admin-users/add';
	axios.post(url, signUpDetails)
		.then(response => {
			dispatch(signUpActions.signUp(response))
			console.log(response, "signUp response");
		},
		err => {
			dispatch({type: 'error'})
			alert("signUp failed");
			console.log(err, "signUp error response");
		})
}