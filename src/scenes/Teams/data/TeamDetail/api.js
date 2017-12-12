import axios from 'axios';

import user from './../../../../Assets/userList.json';
import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as action from './action';

export const fetchTeamDetail = (data) => (dispatch) => {
	const url = config.base_url + 'superAdmins/GetTeamById/' + data;

	let header =  {headers: {
            'Content-Type': 'application/json',
            'authorization' :"jwt " + config.token
    }}
	axios.post(url, {} , header)
		.then((response) => {
			if(response.data.status !== 200) {
				toast.openNotificationWithIcon('error', response.data.err , 'User Detail');
			}
			dispatch(action.initiateItems(response.data));
		},
		err => {
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'Error in fetching details' , 'Users Detail');
			dispatch(action.initiateItems(user));
		})
}