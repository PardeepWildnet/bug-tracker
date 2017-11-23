import axios from 'axios';

import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as action from './action';

export const ResetPasswordApi = (data, token) => (dispatch) => {
	const url = config.base_url + 'api/reset_password';

	const loginDetails = {
		token :  token,
		newPassword : data.password
	}

	axios.post(url, loginDetails)
		.then(response => {
			localStorage.setItem('userDetail',JSON.stringify(response));
			dispatch(action.resetPassword(response))
			console.log("success", response);
			// console.log(response, "login response");
		},
		err => {
			dispatch({type: 'error'})
			toast.showToast('reset failed');
		})
}