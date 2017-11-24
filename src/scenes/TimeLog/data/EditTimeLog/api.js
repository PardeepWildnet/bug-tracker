import axios from 'axios';

import * as toast from './../../../../App.js'
import * as action from './action.js';
import * as config from './../../../../config.js';

export const editLogTime = (values) => (dispatch) => {
	// const url = 'http://180.151.103.85:3013/api/admin/upload/image';
	const url = config.base_url+'admin/skills/add';
	// const date = values.date.format("MMM Do YY");
	console.log("inside api of edit time");
	let timeLogDetails = {
		'category': values.category,
		'desc':values.task,
		'id' : values.time.format('LT'),
		'token' : config.token
	}

	axios.post(url, timeLogDetails)
		.then(response => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'Edit Log Time');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.msg , 'Edit Log Time');
			}
			 dispatch(action.editTimeAction(response))
			 console.log(response, "time-log response");
		},
		err => {
			toast.openNotificationWithIcon('error', 'error', 'Edit Log Time');
			dispatch({type: 'error'})
			console.log(err, "time-log error response");
		})
}