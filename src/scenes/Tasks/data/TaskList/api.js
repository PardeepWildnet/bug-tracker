import axios from 'axios';

import * as config from './../../../../config.js';
import * as toast from './../../../../App.js'
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
		if(response.data.status == 200) {
			toast.openNotificationWithIcon('success', response.data.msg, 'Show Task List');
		}
		else {
			toast.openNotificationWithIcon('error', response.data.msg , 'Show Task List');
		}
		console.log(response.data.object.result, "task list response");
		dispatch(action.showTask(response.data.object.result));
		// dispatch(action.showTask(taskList));
	},
	err =>{
		if(err.response !== undefined){
			toast.openNotificationWithIcon('error', err.response.data.msg, 'Show Task List');
		}
		else {
			toast.openNotificationWithIcon('error', 'Something went wrong. Please try again later', 'Show Task List');
		}
		console.log("error in fetching task");
		dispatch({type : 'error'});
		// dispatch({type: 'error'})
	})
}
