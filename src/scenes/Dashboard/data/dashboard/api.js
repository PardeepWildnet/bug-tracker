import axios from 'axios';

import * as config from './../../../../config';
import * as actions from './action';

export const fetchAPI = () => (dispatch) => {
	// const url = config.base_url + 'dssdsd';
	const url = 'https://randomuser.me/api/?results=50';

	axios.get(url)
		.then(response => {
			console.log(actions.initiateItems(response));
			dispatch(actions.initiateItems(response))
		},
		error => {
			dispatch({type: "error"});
		})
}