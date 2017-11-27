import axios from 'axios';

import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as action from './action';

export const fetchUserList = (value) => (dispatch) => {
	const url = config.base_url + 'users/viewprojects/' + value;
	console.log("value in fetch project list in ", value);

	console.log("token in fetch project list is ", config.token);
	const token = "jwt " + config.token
	axios.get(url, {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
        }})
		.then((response) => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'User List');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.msg , 'User List');
			}
			dispatch(action.initiateItems(response.data));
		},
		err => {
			if(err.response !== undefined){
				toast.openNotificationWithIcon('error', err.response.data.msg, 'User List');
			}
			else {
				toast.openNotificationWithIcon('error', 'Something went wrong. Please try again later', 'User List');
			}
			dispatch({type: "error"});
		})
}