import axios from 'axios';

import * as toast from './../../../../App.js'
import * as action from './action';
import * as showTask from './../TaskList/api';
import * as config from './../../../../config.js';

export const AddTaskApi = (task) => (dispatch) => {
	let taskData = {
		'category': task.category,
		'desc':task.desc,
		'id' : '',
		'token' : config.token
	}

	const url = 'http://180.151.103.85:3015/api/admin/skills/add';
	
	axios.post(url, taskData)
		.then(response => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'Add Task');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.msg , 'Add Task');
			}
			 dispatch(action.addTask(response))
			 dispatch(showTask.ShowTaskListApi())
			 console.log(response, "task response");
		},
		err => {
			toast.openNotificationWithIcon('error', 'error', 'Add Task');
			dispatch({type: 'error'})
			console.log(err, "task error response");
		})
}