import axios from 'axios';

import * as config from './../../../../config';
import * as action from './action';

export const ForgotPasswordApi = (data) => (dispatch) => {
	const url = config.base_url + 'api/forgot_password';

	const loginDetails = {
		email : data.email,
	}
	axios.post(url, loginDetails)
		.then(response => {
			localStorage.setItem('userDetail',JSON.stringify(response));
			dispatch(action.forgotPassword(response))
			console.log("success", response);
			// console.log(response, "login response");
		},
		err => {
			dispatch({type: 'error'})
			alert("email doesn't send successfully");
			console.log(err, "login error response");
		})
}