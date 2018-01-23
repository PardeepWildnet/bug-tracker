import axios from 'axios';

import * as config from './../../../../config.js';
import * as toast from './../../../../App.js'
import * as action from './action.js';
import taskList from './../../../../Assets/taskList.json';

export const ShowTaskListApi = (value) => (dispatch) => {
	const url = config.base_url + 'tasks/viewTasks/' + value;

	let header =  {headers: {
            'Content-Type': 'application/json',
            'authorization' : "jwt " + config.token
    }}

	axios.get(url, header)
	.then(response =>{
		localStorage.setItem('loader', false);
		if(response.data.status !== 200) {
			toast.openNotificationWithIcon('error', response.data.err , 'Show Task List');
		}
		console.log(response.data, "task list response");
		dispatch(action.showTask(response.data));
		// dispatch(action.showTask(taskList));
	},
	err =>{
		localStorage.setItem('loader', false);
		toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'No Record Found' , 'Tasks');
		console.log("error in fetching task");
		dispatch(action.showTask(err));
		// dispatch(action.showTask(err));

		// dispatch({type: 'error'})
	})
}
