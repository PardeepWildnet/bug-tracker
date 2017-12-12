import axios from 'axios';

import user from './../../../../Assets/userList.json';
import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as action from './action';

export const fetchProjectDetail = (data) => (dispatch) => {
	const url = config.base_url + 'project/GetProjectById/' + data;
	let header =  {headers: {
            'Content-Type': 'application/json',
            'authorization' :"jwt " + config.token
    }}
	axios.post(url, {} , header)
		.then((response) => {
			if(response.data.status !== 200) {
				toast.openNotificationWithIcon('error', response.data.err , 'Project Detail');
			}
			dispatch(action.initiateItems(response.data));
		},
		err => {
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'Error in fetching details' , 'Project Detail');
			dispatch(action.initiateItems(user));
		})
}