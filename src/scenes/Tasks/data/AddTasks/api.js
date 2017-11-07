import axios from 'axios';
import * as action from './action';
import * as showTask from './../TaskList/api';

export const AddTaskApi = (task, token) => (dispatch) => {
	let taskData = {
		'category': task.category,
		'desc':task.desc,
		'id' : '',
		'token' : token
	}
	const url = 'http://180.151.103.85:3015/api/admin/skills/add';
	console.log("values of task data is :- ", taskData);
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