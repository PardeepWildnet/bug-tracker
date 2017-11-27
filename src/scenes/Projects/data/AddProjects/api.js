import axios from 'axios';

import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as action from './action';

export const addProject = (data) => (dispatch) => {
	const url = config.base_url + 'project/createproject';
	const projectDetails = {
		projectName : data.name,
		projectCreatedBy : config.userInfo.data.data._id,
		projectDetails : data.details,
		projectStartDate : data.daterange[0],
		projectEndDate: data.daterange[1]
	}

	const token = "jwt " + config.token
	let header =  {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
    }}

	axios.post(url, projectDetails, header)
		.then((response) => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'Add Project ');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.msg , 'Add Project ');
			}
			dispatch(action.initiateItems(response.data));
		},
		err => {
			if(err.response !== undefined){
				toast.openNotificationWithIcon('error', err.response.data.msg, 'Add Project');
			}
			else {
				toast.openNotificationWithIcon('error', 'Something went wrong. Please try again later', 'Add Project');
			}
			dispatch({type: "error"});
		})
}