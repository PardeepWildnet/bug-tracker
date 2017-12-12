import axios from 'axios';

import * as api from './../TeamsList/api';
import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as action from './action';

export const addTeamMember = (data, id) => (dispatch) => {
	console.log("inside add team membrer api", data);
	const url = config.base_url + 'superAdmins/addTeamMembers/' + id;
	
	const teamDetails = {
		teamMembersId : data.teamMember
	}
	axios.put(url, teamDetails, {headers: {
            'Content-Type': 'application/json',
            'authorization' : "jwt " + config.token
    }})
		.then((response) => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, ' Team Member');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.err , ' Team Member');
			}
			dispatch(api.fetchTeamList('1'));
			dispatch(action.initiateItems(response.data));
		},
		err => {
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'No Record Found' , 'Team Member');
			dispatch({type: "error"});
		})
}