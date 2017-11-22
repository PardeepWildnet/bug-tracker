import axios from 'axios';
import { message } from 'antd';

import * as config from './../../../../config';
import * as action from './action';

export const addTeam = (data, teamLeads) => (dispatch) => {
	const url = config.base_url + 'users/createproject';
	const projectDetails = {
		projectName : data.name,
		projectCreatedBy : 'demo',
		projectDetails : data.details,
	}

	const token = "jwt " + config.token
	let header =  {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
    }}

	axios.post(url, projectDetails, header)
		.then((response) => {
			message.success("Team added successfully")
			dispatch(action.initiateTeams(response.data));
		},
		err => {
			message.error("Team is not added")
			dispatch({type: "error"});
			console.log(err, "error");
		})
}