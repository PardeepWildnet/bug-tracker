import axios from 'axios';

import * as config from './../../../../config';
import * as loginActions from './action';

export const LoginAPI = (loginData) => (dispatch) => {
	const url = config.base_url + 'api/login';
	console.log("login api data is :- ", loginData);

	const loginDetails = {
		username : loginData.email,
		password : loginData.password
	}
	axios.post(url, loginDetails)
		.then(response => {
			localStorage.setItem('userDetail',JSON.stringify(response));
			debugger
			dispatch(loginActions.login(response))
			// console.log(response, "login response");
		},
		err => {
			dispatch({type: 'error'})
			alert("login failed");
			console.log(err, "login error response");
		})
}