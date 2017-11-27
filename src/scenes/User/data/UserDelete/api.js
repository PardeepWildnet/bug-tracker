import axios from 'axios';

import * as config from './../../../../config';
import * as toast from './../../../../App.js'
import * as action from './action.js'

export const deleteUser = (data) => (dispatch) => {
	console.log("delete user is ", data	);
	const userDetails = {
		userId : data.id
	}
	const url = config.base_url + 'users/deleteUserById/' + data._id;

	const token = "jwt " + config.token
	axios.delete(url, {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
    }})
		.then((response) => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'User ');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.err , ' User ');
			}
			dispatch(action.deleteProjectAction(response))
		},
		err => {
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'User is not Deleted' , 'User');
			dispatch({type : 'error'})
		})
}