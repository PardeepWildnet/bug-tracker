import axios from 'axios';

import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as api from './../UserList/api';
import * as action from './action';

export const addUser = (data) => (dispatch) => {
	const url = config.base_url + 'users/addUser';
	const userDetails = {
		firstName : data.Fname,
		lastName : data.Lname,
		gender : data.gender,
		email : data.email,
		accountType : data.designation
	}

	let header =  {headers: {
            'Content-Type': 'application/json',
            'authorization' : "jwt " + config.token
    }}
    
	axios.post(url, userDetails, header)
		.then((response) => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, ' User ');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.err , ' User ');
			}
			dispatch(api.fetchUserList('1'));
			dispatch(action.initiateItems(response.data));
		},
		err => {
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'User is not Added' , 'User');
			dispatch({type: "error"});
		})
}