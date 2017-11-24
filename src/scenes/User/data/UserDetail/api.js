import axios from 'axios';

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
				toast.openNotificationWithIcon('error', response.data.msg , 'User Detail');
			}
			dispatch(action.initiateItems(response.data));
		},
		err => {
			toast.openNotificationWithIcon('error', err.response.data.msg, 'User Detail');
			dispatch({type: "error"});
		})
}