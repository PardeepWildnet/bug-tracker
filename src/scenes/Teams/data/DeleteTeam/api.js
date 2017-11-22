import axios from 'axios';
import { message } from 'antd';

import * as config from './../../../../config';
import * as action from './action';

export const deleteTeam = (data) => (dispatch) => {
	const url = config.base_url + 'users/deleteproject';
	const teamDetails = {
		uid : 12
	}
	const token = "jwt " + config.token
	axios.delete(url, teamDetails, {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
    }})
		.then((response) => {
			message.success("Team deleted successfully")
			dispatch(action.deleteTeamAction(response))

		},
		err => {
			message.error("Team is not deleted")
			dispatch({type: 'error'})
		})
}