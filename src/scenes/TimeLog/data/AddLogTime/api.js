import axios from 'axios';

import * as action from './action.js';
import * as config from './../../../../config.js';

export const addLogTime = (values, date, time) => (dispatch) => {
	const token = config.token;
	// const url = config.base_url+'admin/skills/add';
	const url = 'http://180.151.103.85:3013/api/admin/upload/image';

	let formData = new FormData();
    formData.append('token', token)
    formData.append('image', values.upload[0])
	
	axios.post(url, formData)
		.then(response => {
			 dispatch(action.timeLogAction(response))
			 console.log(response, "time-log response");
		},
		err => {
			dispatch({type: 'error'})
			console.log(err, "time-log error response");
		})
}
    // formData.append('desc', values.userName)
    // formData.append('category', date)
    // formData.append('id', time)
	// const url = 'http://180.151.103.85:3013/api/admin/upload/image';
 	/*let timeLogDetails = {
		'category': date,
		'desc':values.userName,
		'id' : time,
		'token' : token
	}*/