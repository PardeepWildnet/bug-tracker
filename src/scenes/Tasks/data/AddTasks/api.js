import axios from 'axios';

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
			 dispatch(action.addTask(response))
			 dispatch(showTask.ShowTaskListApi())
			 console.log(response, "task response");
		},
		err => {
			dispatch({type: 'error'})
			console.log(err, "task error response");
		})
}