import axios from 'axios';

import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as action from './action';

export const fetchProjectsList = (value) => (dispatch) => {
	const url = config.base_url + 'project/viewprojects/' + value;
	console.log("value in fetch project list in ", value);

	console.log("token in fetch project list is ", config.token);
	const token = "jwt " + config.token
	axios.get(url, {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
        }})
		.then((response) => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'Projects List ');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.err , 'Projects List ');
			}
			dispatch(action.initiateItems(response));
		},
		err => {
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'No Record Found' , 'Projects');
			dispatch({type: "error"});
		})
}