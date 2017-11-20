import axios from 'axios';

import * as config from './../../../../config';
import * as action from './action';

export const fetchProjectsList = () => (dispatch) => {
	const url = config.base_url + 'users/viewprojects/1';
	
	const token = "jwt " + config.token
	axios.get(url, {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
        }})
		.then((response) => {
			dispatch(action.initiateItems(response.data));
		},
		err => {
			dispatch({type: "error"});
			console.log(err, "fetchProjectsList err");
		})
}