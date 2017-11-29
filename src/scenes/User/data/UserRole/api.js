import axios from 'axios';

import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as action from './action';

export const userRole = () => (dispatch) => {
	const url = config.base_url + 'users/getUserRoles';
	const token = "jwt " + config.token
	console.log("token is :-" , token);
	
	axios.get(url, {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
    }})
		.then((response) => {
			if(response.data.status !== 200) {
				toast.openNotificationWithIcon('error', response.data.err , 'User Role ');
			}
			dispatch(action.initiateItems(response.data));
		},
		err => {
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'No Record Found' , 'User');
			dispatch({type: "error"});
		})
}