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
				toast.openNotificationWithIcon('success', response.data.msg, 'Forgot Password ');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.msg , 'Forgot Password ');
			}
			dispatch(action.forgotPassword(response))
			console.log("success", response);
		},
		err => {
			if(err.response !== undefined){
				toast.openNotificationWithIcon('error', err.response.data.msg, 'Forgot Password');
			}
			else {
				toast.openNotificationWithIcon('error', 'Something went wrong. Please try again later', 'Forgot Password');
			}
			dispatch({type: 'error'})
		})
}