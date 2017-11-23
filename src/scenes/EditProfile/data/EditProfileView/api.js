import axios from 'axios';
import { message } from 'antd';

import * as action from './action';
import * as config from './../../../../config';

export const EditProfileAPI = (data) => (dispatch) => {
	let editProfileDetails = {
		"firstName" : data.firstName,
		"lastName" : data.lastName,
		"email" : data.email,
		"password" : data.password,
	}

	const url = config.base_url + 'api/register';
	axios.post(url, editProfileDetails)
		.then(response => {
			dispatch(action.editActions(response))
			message.success("profile edit successfully");
			console.log(response, "signUp response");
		},
		err => {
			dispatch({type: 'error'})
			message.error("something went wrong");
			console.log(err, "signUp error response");
		})
}