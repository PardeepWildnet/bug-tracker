import axios from 'axios';

import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as action from './action';

export const searchByDate = (date) => (dispatch) => {
	console.log("date is :-", date._d);
	const url = config.base_url + 'project/projectsSearchByDate/1' ;

	let data = {
		startDate : date[0],
		endDate : date[1]
	}

	axios.post(url, data, {headers: {
            'Content-Type': 'application/json',
            'authorization' : "jwt " + config.token
    }})
		.then((response) => {
			if(response.data.status !== 200) {
				toast.openNotificationWithIcon('error', response.data.err , 'User Role ');
			}
			dispatch(action.initiateItems(response));
		},
		err => {
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'No Record Found' , 'User');
			dispatch({type: "error"});
		})
}