import axios from 'axios';

import * as config from './../../../../config';
import * as action from './action';

export const addProject = (data) => (dispatch) => {
	const url = config.base_url + 'users/createproject';
	// let body_params = {token: config.token, page_number: 1};
	const projectDetails = {
		projectName : data.name,
		projectCreatedBy : 'demo',
		projectDetails : data.details,
		projectStartDate : data.daterange[0],
		projectEndDate: data.daterange[1]
	}

	const token = "jwt " + config.token
	console.log("token in add project api is :- ", token);
	axios.post(url, projectDetails,  {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
        }})
		.then((response) => {
			dispatch(action.initiateItems(response.data));
		},
		err => {
			dispatch({type: "error"});
			console.log(err, "fetchProjectsList err");
		})
}