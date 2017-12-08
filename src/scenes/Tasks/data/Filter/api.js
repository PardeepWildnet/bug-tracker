import axios from 'axios';

import * as config from './../../../../config.js';
import * as toast from './../../../../App.js'
import * as action from './action.js';
import taskList from './../../../../Assets/taskList.json';

export const FilterApi = (type, number) => (dispatch) => {
	const url = config.base_url + 'tasks/getTasksByStatus/' + type + '/' + number;

	let header =  {headers: {
            'Content-Type': 'application/json',
            'authorization' : "jwt " + config.token
    }}
	
	axios.get(url, header)
	.then(response =>{
		if(response.data.status == 200) {
			toast.openNotificationWithIcon('success', response.data.msg, 'Show Task List');
		}
		else {
			toast.openNotificationWithIcon('error', response.data.err , 'Show Task List');
		}
		console.log(response.data, "task list response");
		dispatch(action.showTask(response.data));
		// dispatch(action.showTask(taskList));
	},
	err =>{
		toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'No Record Found' , 'Tasks');
		console.log("error in fetching task");
		dispatch({type : 'error'});
		// dispatch({type: 'error'})
	})
}
