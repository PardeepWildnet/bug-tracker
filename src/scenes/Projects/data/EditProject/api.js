import axios from 'axios';

import * as action from './action.js';
import * as config from './../../../../config.js';

export const editProjectDetails = (data) => (dispatch) => {
	// const url = 'http://180.151.103.85:3013/api/admin/upload/image';
	const url = config.base_url+'users/updateproject';
	// const date = values.date.format("MMM Do YY");
	console.log("inside api of edit time");
	let projectDetails = {
		projectName : data.name,
		projectCreatedBy : 'demo',
		projectDetails : data.details,
		projectStartDate : data.daterange[0],
		projectEndDate: data.daterange[1]
	}

	const token = "jwt " + config.token
	let header =  {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
    }}
	axios.put(url, projectDetails, header)
		.then(response => {
			 dispatch(action.editProjectDetailAction(response))
			 console.log(response, "time-log response");
		},
		err => {
			dispatch({type: 'error'})
			console.log(err, "time-log error response");
		})
}