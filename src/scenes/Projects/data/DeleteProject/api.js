import axios from 'axios';

import * as config from './../../../../config';
import * as toast from './../../../../App.js'
import * as api from './../ProjectsList/api';
import * as action from './action.js'

export const deleteProject = (data) => (dispatch) => {
	const url = config.base_url + 'project/deleteproject/' + data._id;
	const projectDetails = {
		uid : data._id
	}
	console.log("delete project id id", data._id);

	axios.delete(url,  {headers: {
            'Content-Type': 'application/json',
            'authorization' : "jwt " + config.token
    }}, projectDetails)
		.then((response) => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'Project Deleted Successfully');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.err , 'Delete Project ');
			}
			dispatch(api.fetchProjectsList('1'));
			dispatch(action.deleteProjectAction(response))
		},
		err => {
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'Project is not Deleted' , 'Projects');
			dispatch({type : 'error'})
		})
}