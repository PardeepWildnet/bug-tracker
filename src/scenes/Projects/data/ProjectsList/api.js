import axios from 'axios';

import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as action from './action';

export const fetchProjectsList = (value) => (dispatch) => {
	const url = config.base_url + 'users/viewprojects/' + value;
	console.log("value in fetch project list in ", value);

	console.log("token in fetch project list is ", config.token);
	const token = "jwt " + config.token
	axios.get(url, {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
        }})
		.then((response) => {
			dispatch(action.initiateItems(response.data));
		},
		err => {
			toast.showToast('error occured in fetching list');
			dispatch({type: "error"});
		})
}