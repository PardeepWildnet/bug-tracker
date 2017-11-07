import axios from 'axios';

import { base_url } from './../../../../config';
import * as loginActions from './action';

export const LoginAPI = (loginData) => (dispatch) => {
	const url = 'http://180.151.103.85:3015/api/admin/login';
	console.log("login api data is :- ", loginData);

	const loginDetails = {
		email : loginData.email,
		password : window.btoa(loginData.password) 
	}

	axios.post(url, loginDetails)
		.then(response => {
			localStorage.setItem('userDetail',JSON.stringify(response));
			dispatch(loginActions.login(response))
			// console.log(response, "login response");
		},
		err => {
			dispatch({type: 'error'})
			alert("login failed");
			console.log(err, "login error response");
		})
}