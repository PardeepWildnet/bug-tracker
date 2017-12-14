import axios from 'axios';

import * as toast from './../../../../App.js'
import * as action from './action';
import * as showTask from './../TaskList/api';
import * as config from './../../../../config.js';

export const AddTaskApi = (task, participants) => (dispatch) => {
	console.log("task", task);
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

	const url = config.base_url + 'tasks/createTasks';

	axios.post(url, taskData, header)
		.then(response => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'Add Task');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.err , 'Add Task');
			}
			 dispatch(action.addTask(response))
			 dispatch(showTask.ShowTaskListApi(1))
			 console.log(response, "task response");
		},
		err => {
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'Task is not Added' , 'Tasks');
			dispatch({type: 'error'})
			console.log(err, "task error response");
		})
}
