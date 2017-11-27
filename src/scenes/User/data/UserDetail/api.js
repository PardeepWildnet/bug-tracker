import axios from 'axios';

import user from './../../../../Assets/userList.json';
import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as action from './action';

export const fetchUserDetail = (data) => (dispatch) => {
	const url = config.base_url + 'users/createproject';
	console.log("data is ", data);
	console.log("add user data", data);
	const userDetails = {
		id : data,
	}

	const token = "jwt " + config.token
	let header =  {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
    }}
	axios.post(url, userDetails, header)
		.then((response) => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'User Detail');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.err , 'User Detail');
			}
			dispatch(action.initiateItems(response.data));
		},
		err => {
			if(err.response !== undefined){
				toast.openNotificationWithIcon('error', err.response.data.msg, 'User Detail');
			}
			else {
				toast.openNotificationWithIcon('error', 'Something went wrong. Please try again later', 'User Detail');
			}
			dispatch(action.initiateItems(user));
		})
}