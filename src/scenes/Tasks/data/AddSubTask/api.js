import axios from 'axios';

import * as config from './../../../../config.js';
import * as toast from './../../../../App.js'
import * as action from './action.js';
import * as showSubTask from './../ShowSubTaskList/api';

export const AddSubTaskApi = (subTask) => (dispatch) => {
	const url = config.base_url + 'admin/skills/users/add';
	const token = config.token;

	var subTaskData = {
		'client_id': subTask.clientId,
		'skill_id': 'sk 5',
		'token' : token
	}
	
	axios.post(url, subTaskData )
	.then(response => {
			dispatch(action.subTask(response))
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'Add Sub Task');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.msg , 'Add Sub Task');
			}
			dispatch(showSubTask.ShowSubTaskListApi())
			console.log(response, "subTask response in SubTask");
		},
		err => {
			toast.openNotificationWithIcon('error', err.response.data.msg , 'Add Sub Task');
			console.log(err, "task error response in SubTaskApi");
		})
}