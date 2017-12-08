import axios from 'axios';

import * as api from './../UserDetail/api';
import * as toast from './../../../../App.js'
import * as action from './action.js';
import * as config from './../../../../config.js';

export const editUserDetails = (data, id) => (dispatch) => {
	// const url = 'http://180.151.103.85:3013/api/admin/upload/image';
	const url = config.base_url+'users/updateUserById/' + id;
	// const date = values.date.format("MMM Do YY");
	console.log("inside api of edit user", url);

	const userDetails = {
		firstName : data.Fname,
		lastName : data.Lname,
		gender : data.gender,
		email : data.email,
		accountType : data.designation
	}

	const token = "jwt " + config.token
	let header =  {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
    }}
	axios.put(url, userDetails, header)
		.then(response => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'Edit User Details');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.err , 'Edit User Details');
			}
			dispatch(api.fetchUserDetail(id));
			dispatch(action.editUserDetailAction(response))
			console.log(response, "success");
		},
		err => {
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'User is not Updated' , 'Users');
			dispatch({type: 'error'})
			console.log(err, "error");
		})
}