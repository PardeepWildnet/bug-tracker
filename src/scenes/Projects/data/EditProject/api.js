import axios from 'axios';

import * as fetchDetailApi from './../../data/ProjectDetail/api';
import * as toast from './../../../../App.js'
import * as action from './action.js';
import * as config from './../../../../config.js';

export const editProjectDetails = (data, id, createdBy) => (dispatch) => {
	// const url = 'http://180.151.103.85:3013/api/admin/upload/image';
	const url = config.base_url+'project/updateproject/' + id;
	// const date = values.date.format("MMM Do YY");

	let projectDetails = {
		projectCreatedBy : createdBy,
		projectName : data.name,
		projectDetails : data.details,
		projectStartDate  : data.daterange[0],
		projectEndDate : data.daterange[1],
		projectCreatedByName : 'createdBy'
	}
	console.log("inside api of edit project", id);

	const token = "jwt " + config.token
	let header =  {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
    }}
	axios.put(url, projectDetails, header)
		.then(response => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'Edit Project Details');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.err , 'Edit Project Details');
			}
			dispatch(fetchDetailApi.fetchProjectDetail(id));
			dispatch(action.editProjectDetailAction(response))
			console.log(response, "success");
		},
		err => {
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'Project is not Updated' , 'Projects');
			dispatch({type: 'error'})
			console.log(err, "error");
		})
}