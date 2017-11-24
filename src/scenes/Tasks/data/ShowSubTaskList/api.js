import axios from 'axios';

import * as toast from './../../../../App.js'
import * as config from './../../../../config.js';
import * as action from './action.js';
import taskList from './../../../../Assets/taskList.json';

export const ShowSubTaskListApi = () => (dispatch) => {
	const url = config.base_url + 'admin/skills/list';
	
	var parameters = {
		page_number : '1',
		token : config.token
	}
	
	console.log("url of tasklist is :- " + url);
	console.log("taskList json data is :- " + taskList);

	axios.post(url, parameters)
	.then(response =>{
		if(response.data.status == 200) {
			toast.openNotificationWithIcon('success', response.data.msg, 'Sub Task List');
		}
		else {
			toast.openNotificationWithIcon('error', 'error', 'Sub Task List');
		}
		console.log(response.data.object.result, "sub task list response");
		{/*dispatch(action.showTask(response.data.object.result));*/}
		dispatch(action.showSubTask(taskList));
	},
	error =>{
		toast.openNotificationWithIcon('error', 'error', 'Sub Task List');
		console.log("error in fetching task");
		dispatch({type: 'error'})
	})
}
