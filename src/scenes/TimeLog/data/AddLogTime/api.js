import axios from 'axios';

import * as action from './action.js';
import * as config from './../../../../config.js';

export const addLogTime = (values, fileList, date, time) => (dispatch) => {
	// const url = config.base_url+'admin/skills/add';
	const url = 'http://180.151.103.85:3013/api/admin/upload/image';
	console.log("inside api is :- ", values);
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
			 dispatch(action.timeLogAction(response))
			 console.log(response, "time-log response");
		},
		err => {
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
	