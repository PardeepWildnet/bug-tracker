import axios from 'axios';

import * as api from './../TeamsList/api';
import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as action from './action';

export const deleteTeam = (data) => (dispatch) => {
	const url = config.base_url + 'superAdmins/deleteTeam/' + data._id;
	const teamDetails = {
		uid : data.id
	}
	const token = "jwt " + config.token
	axios.delete(url, {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
    }})
		.then((response) => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, ' Team');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.err , ' Team');
			}
			dispatch(api.fetchTeamList('1'));
			dispatch(action.deleteTeamAction(response))

		},
		err => {
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'Team is not Deleted' , 'Team');
			dispatch({type: 'error'})
		})
}