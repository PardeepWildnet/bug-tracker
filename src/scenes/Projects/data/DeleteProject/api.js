import axios from 'axios';

import * as config from './../../../../config';
import * as toast from './../../../../App.js'
import * as action from './action.js'

export const deleteProject = (data) => (dispatch) => {
	const url = config.base_url + 'project/deleteproject/' + data._id;
	const token = "jwt " + config.token;
	let header =  {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
    }} 
	console.log(token);
	axios.delete(url, header).then((response) => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'Delete Project ');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.msg , 'Delete Project ');
			}
			dispatch(action.deleteProjectAction(response))
		},
		err => {
			if(err.response !== undefined){
				toast.openNotificationWithIcon('error', err.response.data.msg, 'Delete Project');
			}
			else {
				toast.openNotificationWithIcon('error', 'Something went wrong. Please try again later', 'Delete Project');
			}
			toast.openNotificationWithIcon('error', 'err.response.data.msg' , 'Delete Project ');
			dispatch({type : 'error'})
		})
}