import axios from 'axios';

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
		console.log(response.data.object.result, "sub task list response");
		{/*dispatch(action.showTask(response.data.object.result));*/}
		dispatch(action.showSubTask(taskList));
	},
	error =>{
		console.log("error in fetching task");
		dispatch({type: 'error'})
	})
}
