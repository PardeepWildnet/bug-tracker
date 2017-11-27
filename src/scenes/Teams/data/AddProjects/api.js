import axios from 'axios';
import { message } from 'antd';

import * as config from './../../../../config';
import * as action from './action';

export const addProject = (data) => (dispatch) => {
	const url = config.base_url + 'users/createproject';
	const projectDetails = {
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

	axios.post(url, projectDetails, header)
		.then((response) => {
			message.success("Project added successfully")
			dispatch(action.initiateItems(response.data));
		},
		err => {
			message.error("Project is not added")
			dispatch({type: "error"});
			console.log(err, "fetchProjectsList err");
		})
}