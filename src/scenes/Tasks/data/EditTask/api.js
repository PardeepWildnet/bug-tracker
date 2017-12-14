import axios from 'axios';

import * as fetchDetailApi from './../../data/TaskDetail/api';
import * as toast from './../../../../App.js'
import * as action from './action.js';
import * as config from './../../../../config.js';

export const editTaskDetails = (task, id) => (dispatch) => {
	const url = config.base_url+'tasks/updateTask/' + id;

	let taskData = {
		'taskTitle': task.title,
		'assignBy': config.userInfo.data.data._id,
		'assignTo' : task.assignee,
		'taskDetails' : task.detail,
		'visibilityTo' : task.scope,
		'assignedHours' : task.hours
	}

	let header =  {headers: {
            'Content-Type': 'application/json',
            'authorization' : "jwt " + config.token
    }}
	axios.put(url, taskData, header)
		.then(response => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'Edit Task Details');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.err , 'Edit Task Details');
			}
			dispatch(fetchDetailApi.fetchTaskDetail(id));
			dispatch(action.editTaskDetailAction(response))
			console.log(response, "success");
		},
		err => {
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'Task is not Updated' , 'Tasks');
			dispatch({type: 'error'})
			console.log(err, "error");
		})
}
