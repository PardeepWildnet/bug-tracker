import axios from 'axios';
import { message } from 'antd';

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
				message.success("email send successfully");
				dispatch(action.forgotPassword(response))
			}
			else {
				message.error("" + response.data.msg);
			}
			console.log("success", response);
		},
		err => {
			dispatch({type: 'error'})
			message.error("email doesn't send successfully");
			console.log(err, "login error response");
		})
}