import axios from 'axios';

import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as api from './../ProjectsList/api';
import * as action from './action';

export const addProject = (data) => (dispatch) => {
	const url = config.base_url + 'project/createproject';

	const projectDetails = {
		projectName : data.name,
		projectCreatedBy : config.userInfo.data.data._id,
		projectDetails : data.details,
		projectStartDate : data.daterange[0],
		projectEndDate: data.daterange[1]
	}

	let header =  {headers: {
            'Content-Type': 'application/json',
            'authorization' : "jwt " + config.token
  }}
	axios.post(url, projectDetails, header)
		.then((response) => {
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', response.data.msg, 'Add Project ');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.err , 'Add Project ');
			}
			dispatch(api.fetchProjectsList('1'));
			dispatch(action.initiateItems(response.data));
		},
		err => {
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'Project is not Added' , 'Projects');
			dispatch({type: "error"});
		})
}
