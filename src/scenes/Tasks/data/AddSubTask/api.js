import axios from 'axios';

import * as config from './../../../../config.js';
import * as action from './action.js';
import * as showSubTask from './../ShowSubTaskList/api';

export const AddSubTaskApi = (subTask) => (dispatch) => {
	console.log("inside AddSubTaskApi" + subTask);
	
	const url = config.base_url + 'admin/skills/users/add';
	const token = config.token;

	var subTaskData = {
		'client_id': subTask.client_id,
		'skill_id': 'sk 5',
		'token' : token
	}
	
	console.log("SubTask Url is " + url);
	axios.post(url, subTaskData )
	.then(response => {
			dispatch(action.subTask(response))
			dispatch(showSubTask.ShowSubTaskListApi())
			console.log(response, "subTask response in SubTask");
		},
		err => {
			console.log(err, "task error response in SubTaskApi");
		})
}