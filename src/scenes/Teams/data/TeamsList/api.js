import axios from 'axios';

import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as action from './action';

export const fetchTeamList = (pageNumber) => (dispatch) => {
	const url = config.base_url + 'superAdmins/viewTeam/' + pageNumber;
	
	const token = "jwt " + config.token
	debugger
	axios.get(url, {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
        }})
		.then((response) => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, ' Team List');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.err , ' Team List');
			}
			dispatch(action.initiateTeams(response.data));
		},
		err => {
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'No Record Found' , 'Team List');
			dispatch({type: "error"});
			console.log(err, "error");
		})
}