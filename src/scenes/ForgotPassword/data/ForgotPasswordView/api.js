import axios from 'axios';

import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as action from './action';

export const ForgotPasswordApi = (data) => (dispatch) => {
	const url = config.base_url + 'api/forgot_password';

	const forgotPasswordData = {
		email : data.email,
	}
	axios.post(url, forgotPasswordData)
		.then(response => {
			if(response.data.status == 200) {
				dispatch(action.forgotPassword(response))
			}
			else {
				toast.showToast(response.data.msg);
			}
			console.log("success", response);
		},
		err => {
			dispatch({type: 'error'})
			toast.showToast("email doesn't send successfully");
			console.log(err, "login error response");
		})
}