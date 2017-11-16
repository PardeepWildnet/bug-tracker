import axios from 'axios';

import * as config from './../../../../config';
import * as action from './action';

export const fetchProjectsList = () => (dispatch) => {
	const url = config.base_url + 'users/viewprojects/1';
	let body_params = {token: config.token};
debugger
	axios.get(url)
		.then((response) => {
			console.log(response.data.data, "fetchProjectsList response");
			dispatch(action.initiateItems(response.data));
		},
		err => {
			dispatch({type: "error"});
			console.log(err, "fetchProjectsList err");
		})
}