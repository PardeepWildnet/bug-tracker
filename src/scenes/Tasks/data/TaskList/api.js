import axios from 'axios';

import * as config from './../../../../config.js';
import * as action from './action.js';
import taskList from './../../../../Assets/taskList.json';

export const ShowTaskListApi = () => (dispatch) => {
	const url = config.base_url + 'admin/skills/list';
	
	var parameters = {
		page_number : '1',
		token : config.token
	}
	
	axios.post(url, parameters)
	.then(response =>{
		console.log(response.data.object.result, "task list response");
		dispatch(action.showTask(response.data.object.result));
		// dispatch(action.showTask(taskList));
	},
	error =>{
		console.log("error in fetching task");
		dispatch(action.showTask(taskList));
		// dispatch({type: 'error'})
	})
}
