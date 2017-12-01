import axios from 'axios';

import * as config from './../../../../config';
import * as toast from './../../../../App.js'
import * as api from './../TaskList/api';
import * as action from './action.js'

export const deleteProject = (data) => (dispatch) => {
	const url = config.base_url + 'tasks/deleteTask/' + data._id;

	axios.delete(url,  {headers: {
            'Content-Type': 'application/json',
            'authorization' : "jwt " + config.token
    }})
		.then((response) => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'Task Deleted Successfully');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.err , 'Delete Task ');
			}
			dispatch(api.ShowTaskListApi('1'));
			dispatch(action.deleteProjectAction(response))
		},
		err => {
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'Task is not Deleted' , 'Tasks');
			dispatch({type : 'error'})
		})
}