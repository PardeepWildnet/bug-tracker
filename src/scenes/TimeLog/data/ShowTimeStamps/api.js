import axios from 'axios';

import * as config from './../../../../config.js';
import * as toast from './../../../../App.js'
import * as action from './action.js';
import taskList from './../../../../Assets/taskList.json';

export const ShowTimeLogApi = () => (dispatch) => {
	const url = config.base_url + 'admin/skills/list';
	
	var parameters = {
		page_number : '1',
		token : config.token
	}
	
	axios.post(url, parameters)
	.then(response =>{
		if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'Time Log');
			}
			else {
				toast.openNotificationWithIcon('error', 'error', 'Time Log');
			}
		console.log(response.data.object.result, "time list response");
		dispatch(action.showTimeLog(response.data.object.result));
		// dispatch(action.showTask(taskList));
	},
	error =>{
		toast.openNotificationWithIcon('error', 'error', 'Time Log');
		console.log("error in fetching timelog");
		dispatch({type: 'error'})
	})
}
