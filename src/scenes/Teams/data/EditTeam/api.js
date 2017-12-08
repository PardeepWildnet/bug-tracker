import axios from 'axios';

import * as api from './../../data/TeamDetail/api';
import * as toast from './../../../../App.js'
import * as action from './action.js';
import * as config from './../../../../config.js';

export const editTeamDetails = (data, teamLeads, id) => (dispatch) => {
	// const url = 'http://180.151.103.85:3013/api/admin/upload/image';
	const url = config.base_url+'superAdmins/updateTeam/' + id;
	// const date = values.date.format("MMM Do YY");
	console.log("inside api of edit team", data);
	const teamDetails = {
		teamManagerId : data.manager,
		teamTitle  : data.name,
		teamDetails  : data.details,
		teamLeadsId : teamLeads
	}
	const token = "jwt " + config.token
	let header =  {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
    }}
	axios.put(url, teamDetails, header)
		.then(response => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'Edit Team Details');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.err , 'Edit Team Details');
			}
			dispatch(api.fetchTeamDetail(id));
			dispatch(action.editTeamDetailAction(response))
			console.log(response, "time-log response");
		},
		err => {
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'Team is not Updated' , 'Team');
			dispatch({type: 'error'})
			console.log(err, "time-log error response");
		})
}