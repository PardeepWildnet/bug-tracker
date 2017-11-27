import axios from 'axios';

import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as action from './action';

export const fetchTeamList = () => (dispatch) => {
	const url = config.base_url + 'users/viewprojects/1';
	
	const token = "jwt " + config.token
	axios.get(url, {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
        }})
		.then((response) => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, ' Team List');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.msg , ' Team List');
			}
			dispatch(action.initiateTeams(response.data));
		},
		err => {
			if(err.response !== undefined){
				toast.openNotificationWithIcon('error', err.response.data.msg, 'Team List');
			}
			else {
				toast.openNotificationWithIcon('error', 'Something went wrong. Please try again later', 'Team List');
			}
			dispatch({type: "error"});
			console.log(err, "error");
		})
}