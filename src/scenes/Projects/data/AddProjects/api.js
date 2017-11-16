import axios from 'axios';

import * as config from './../../../../config';
import * as action from './action';

export const addProject = (data) => (dispatch) => {
	const url = config.base_url + 'users/createproject';
	// let body_params = {token: config.token, page_number: 1};
	const projectDetails = {
		projectName : data.name,
		projectCreatedBy : 'demo',
		projectDetails : data.details,
		projectStartDate : data.daterange[0],
		projectEndDate: data.daterange[1]
	}

	const header = {
        'Content-Type': 'application/json',
		'authorization' : 'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTBjMGE4MmYwMGQ4ODE5Yjg3MTMwZWEiLCJpYXQiOjE1MTA4MzUwNjh9.XD3beMlWuZeCHaTG1uArKxuuReMo3Sg0hBk5R30IrDQ'
	}
	axios.post(url, projectDetails, header)
		.then((response) => {
			console.log(response.data.data, "fetchProjectsList response");
			dispatch(action.initiateItems(response.data));
		},
		err => {
			dispatch({type: "error"});
			console.log(err, "fetchProjectsList err");
		})
}