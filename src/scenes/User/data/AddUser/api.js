import axios from 'axios';

import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as action from './action';

export const addUser = (data, fileList) => (dispatch) => {
	const url = config.base_url + 'users/addUser';
	console.log("add user data", data);
	const projectDetails = {
		firstName : data.Fname,
		lastName : data.Lname,
		gender : data.email,
		email : data.designation,
		password: '16.11.2017'
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
			if(err.response !== undefined){
				toast.openNotificationWithIcon('error', err.response.data.msg, 'Add User');
			}
			else {
				toast.openNotificationWithIcon('error', 'Something went wrong. Please try again later', 'Add User');
			}
			dispatch({type: "error"});
		})
}