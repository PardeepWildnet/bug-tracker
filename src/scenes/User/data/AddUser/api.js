import axios from 'axios';

import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as action from './action';

export const addUser = (data, fileList) => (dispatch) => {
	const url = config.base_url + 'users/createproject';
	console.log("add user data", data);
	const projectDetails = {
		projectName : data.Fname,
		projectCreatedBy : data.Lname,
		projectDetails : data.email,
		projectStartDate : data.designation,
		projectEndDate: '16.11.2017'
	}

	const token = "jwt " + config.token
	let header =  {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
    }}
	axios.post(url, projectDetails, header)
		.then((response) => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'Add User ');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.msg , 'Add User ');
			}
			dispatch(action.initiateItems(response.data));
		},
		err => {
			toast.openNotificationWithIcon('error', err.response.data.msg, 'Add User ');
			dispatch({type: "error"});
		})
}