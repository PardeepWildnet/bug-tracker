import axios from 'axios';
import { message } from 'antd';

import * as toast from './../../../../App.js'
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
			toast.openNotificationWithIcon('success', response.data.msg, 'Edit Profile');
			console.log(response, "edit profile response");
		},
		err => {
			toast.openNotificationWithIcon('error', 'something went wrong', 'Edit Profile');
			dispatch({type: 'error'})
			console.log(err, "edit profile error response");
		})
}