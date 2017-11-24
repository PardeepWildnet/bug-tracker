import axios from 'axios';

import * as config from './../../../../config';
import * as toast from './../../../../App.js'
import * as action from './action.js'

export const deleteProject = (data) => (dispatch) => {
	const url = config.base_url + 'users/deleteproject';
	const projectDetails = {
		uid : data._id
	}
	const token = "jwt " + config.token
	axios.delete(url, projectDetails, {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
    }})
		.then((response) => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'Delete Project ');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.msg , 'Delete Project ');
			}
			dispatch(action.deleteProjectAction(response))
		},
		err => {
			toast.openNotificationWithIcon('error', 'error', 'Delete Project ');
			dispatch({type : 'error'})
		})
}