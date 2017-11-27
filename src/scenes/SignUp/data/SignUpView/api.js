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
		"accountType" : 'admin',
		"gender" : '',
		
	}
	const url = config.base_url + 'api/register';
	axios.post(url, signUpDetails)
		.then(response => {
			dispatch(signUpActions.signUp(response))
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'Sign Up');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.err , 'Sign Up');
			}
			console.log(response, "signUp response");
		},
		err => {
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'Sign Up  Failed' , 'Sign Up ');
			dispatch({type: 'error'})
			console.log(err, "signUp error response");
		})
}