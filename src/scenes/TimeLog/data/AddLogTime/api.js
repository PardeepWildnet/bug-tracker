import axios from 'axios';

import * as toast from './../../../../App.js'
import * as action from './action.js';
import * as config from './../../../../config.js';

export const addLogTime = (values, fileList, date, time) => (dispatch) => {
	const url = 'http://180.151.103.85:3013/api/admin/upload/image';
	// const url = config.base_url+'admin/skills/add';
	// const date = values.date.format("MMM Do YY");
	// const time = values.time.format('LT');

	let formData = new FormData();
	formData.append('token', config.token);
	fileList.forEach((file) => {
      formData.append('files[]', file);
    });

    const header = {     
    	headers: { 'content-type': 'multipart/form-data' }
	}

	axios.post(url, formData, header)
		.then(response => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'Add Log Time');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.msg , 'Add Log Time');
			}
			 dispatch(action.timeLogAction(response))
			 console.log(response, "time-log response");
		},
		err => {
			if(err.response !== undefined){
				toast.openNotificationWithIcon('error', err.response.data.msg, 'Add Log Time');
			}
			else {
				toast.openNotificationWithIcon('error', 'Something went wrong. Please try again later', 'Add Log Time');
			}
			dispatch({type: 'error'})
			console.log(err, "time-log error response");
		})
}
    
 	/*let timeLogDetails = {
		'category': date,
		'desc':values.task,
		'id' : time,
		'token' : token
	}*/
	