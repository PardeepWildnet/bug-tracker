import axios from 'axios';
import { Observable } from 'rxjs/Rx';

import * as toast from './../../../../App.js'
import * as config from './../../../../config';
import * as loginActions from './action';

export const LoginAPI = (loginData) => (dispatch) => {
	const url = config.base_url + 'api/login';
   
	const loginDetails = {
		email : loginData.email,
		password : loginData.password
	}
	axios.post(url, loginDetails)
		.then(response => {
			localStorage.setItem('userDetail',JSON.stringify(response));
			if(response.data.status == 200) {
				toast.openNotificationWithIcon('success', 'Login Successful', 'Login ');
			}
			else {
				toast.openNotificationWithIcon('error', response.data.err, 'Login ');
			}
            config.loggedInObs.next(true);
			console.log("loggedInObs", config.loggedInObs );
			// console.log(response, "login response");
			dispatch(loginActions.login(response))
		},
		err => {
			dispatch({type: 'error'})
			toast.openNotificationWithIcon('error', err.response ? err.response.data.msg : 'Login Failed' , ' Login');
			console.log(err, "login error response");
		})
}