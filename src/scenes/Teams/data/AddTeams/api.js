import axios from 'axios';

import * as toast from './../../../../App.js'
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
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'Add Team');
			}
			else {
				toast.openNotificationWithIcon('error', 'error', 'Add Team');
			}
			dispatch(action.initiateTeams(response.data));
		},
		err => {
			toast.openNotificationWithIcon('error', 'error', 'Add Team');
			dispatch({type: "error"});
			console.log(err, "error");
		})
}