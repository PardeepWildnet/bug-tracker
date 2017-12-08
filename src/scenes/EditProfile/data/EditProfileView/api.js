import axios from 'axios';
import { message } from 'antd';

import * as toast from './../../../../App.js'
import * as action from './action';
import * as config from './../../../../config';

export const EditProfileAPI = (data) => (dispatch) => {
	console.log("data in edit profile api is :- ", data);

/*	let editProfileDetails = {
		"firstName" : data.firstName,
		"lastName" : data.lastName,
		"email" : data.email,
		"accountType" : data.accountType,
	}*/
	let formData = new FormData();
	formData.append('userPhoto', data.upload);

	console.log("ghfhgjk", config.userInfo.data.data._id);
	const url = config.base_url + 'api/imageUpload';
	axios.post(url, formData)
		.then(response => {
			dispatch(action.editActions(response))
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'Edit Profile');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.err, 'Edit Profile');
			}
			console.log(response, "edit profile response");
		},
		err => {
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'Edit Profile Failed' , 'Edit Profile');
			dispatch({type: 'error'})
			console.log(err, "edit profile error response");
		})
}