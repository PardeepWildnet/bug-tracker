import axios from 'axios';

import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as action from './action';

export const fetchUserList = (value) => (dispatch) => {
	const url = config.base_url + 'users/getAllUsers/' + value;
	console.log("value in fetch user list in ", value);

	console.log("token in fetch user list is ", config.token);
	const token = "jwt " + config.token
	axios.post(url, {}, {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
        }})
		.then((response) => {
			if(response.data.status !== 200) {
				toast.openNotificationWithIcon('error', response.data.err , 'User List');
			}
			dispatch(action.initiateItems(response.data));
		},
		err => {
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'No Record Found' , 'Users List');
			dispatch({type: "error"});
		})
}