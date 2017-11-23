import axios from 'axios';

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
			console.log(response, "signUp response");
		},
		err => {
			toast.showToast('something went wrong');
			dispatch({type: 'error'})
			console.log(err, "edit profile error response");
		})
}