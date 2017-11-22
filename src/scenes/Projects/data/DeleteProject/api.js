import axios from 'axios';
import { message } from 'antd';

import * as config from './../../../../config';
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
			message.success("Project deleted successfully")
			dispatch(action.deleteProjectAction(response))
		},
		err => {
			message.error("Project is not deleted")
			dispatch({type : 'error'})
		})
}