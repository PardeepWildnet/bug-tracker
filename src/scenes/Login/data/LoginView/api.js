import axios from 'axios';
import { message } from 'antd'

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
			dispatch(loginActions.login(response))
			// console.log(response, "login response");
		},
		err => {
			dispatch({type: 'error'})
	        message.error('login failed');
			console.log(err, "login error response");
		})
}