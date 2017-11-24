import axios from 'axios';

import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as action from './action';

export const deleteTeam = (data) => (dispatch) => {
	const url = config.base_url + 'users/deleteproject';
	const teamDetails = {
		uid : data.id
	}
	const token = "jwt " + config.token
	axios.delete(url, teamDetails, {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
    }})
		.then((response) => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'Delete Team');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.msg , 'Delete Team');
			}
			dispatch(action.deleteTeamAction(response))

		},
		err => {
			toast.openNotificationWithIcon('error', err.response.data.msg , 'Delete Team');
			dispatch({type: 'error'})
		})
}