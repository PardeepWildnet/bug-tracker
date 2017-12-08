import axios from 'axios';

import * as config from './../../../../config.js';
import * as toast from './../../../../App.js'
import * as action from './action.js';
import taskList from './../../../../Assets/taskList.json';

export const TaskStatusFilterApi = () => (dispatch) => {
	const url = config.base_url + 'tasks/getAllTaskStatus';

	let header =  {headers: {
            'Content-Type': 'application/json',
            'authorization' : "jwt " + config.token
    }}
	
	axios.get(url, header)
	.then(response =>{
		if(response.data.status == 200) {
			toast.openNotificationWithIcon('success', response.data.msg, 'Task Status');
		}
		else {
			toast.openNotificationWithIcon('error', response.data.err , 'Task Status');
		}
		dispatch(action.showTask(response));
	},
	err =>{
		toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'No Record Found' , 'Task Status');
		dispatch({type : 'error'});
	})
}
