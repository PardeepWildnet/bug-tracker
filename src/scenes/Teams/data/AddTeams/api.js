import axios from 'axios';

import * as api from './../TeamsList/api';
import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as action from './action';

export const addTeam = (data, teamLeads) => (dispatch) => {
	const url = config.base_url + 'superAdmins/createTeam';
	console.log("leads in add team api data are", data);
	const teamDetails = {
		teamManagerId : data.manager,
		teamTitle  : data.name,
		teamDetails  : data.details,
		teamLeadsId : teamLeads
	}

	let header =  {headers: {
            'Content-Type': 'application/json',
            'authorization' : "jwt " + config.token
    }}

	axios.post(url, teamDetails, header)
		.then((response) => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, ' Team');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.err , ' Team');
			}
			dispatch(api.fetchTeamList('1'));
			dispatch(action.initiateTeams(response.data));
		},
		err => {
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'Team is not Added' , 'Team');
			dispatch({type: "error"});
			console.log(err, "error");
		})
}