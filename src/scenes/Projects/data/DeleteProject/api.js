import axios from 'axios';

import * as config from './../../../../config';
import * as toast from './../../../../App.js'
import * as action from './action.js'

export const deleteProject = (data) => (dispatch) => {
	const url = config.base_url + 'users/deleteproject';
	const projectDetails = {
		uid : data._id
	}
	const token = "jwt " + config.token
	axios.delete(url, projectDetails, {headers: {
            'Content-Type': 'application/json',
            'authorization' : token
    }})
		.then((response) => {
			dispatch(action.deleteProjectAction(response))
		},
		err => {
			toast.showToast('project is not deleted');
			dispatch({type : 'error'})
		})
}