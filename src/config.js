import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

export const base_url = 'https://bugtracker-backend.herokuapp.com/';
export const goodkarms_url = 'http://180.151.103.85:3015/api/';
export const acta_url = 'http://actaagency.com.au/administrator/';
export const userInfo = JSON.parse(localStorage.getItem('userDetail')) || {};
export const token = userInfo.data && userInfo.data.token || '';


// export let token = 'hjhj';
// export const userInfo = JSON.parse(localStorage.getItem('userDetail')) || {};
// export var loggedInObs: Rx.Subject<any> = new Rx.Subject<any>();
export const loggedInObs: Rx.Subject = new Rx.Subject();
 		/*loggedInObs.subscribe(response => {
     	debugger;
         let userInfo =JSON.parse(localStorage.getItem('userDetail')) || {};
         this.token = userInfo.data && userInfo.data.token;
			// localStorage.setItem('userDetail',JSON.stringify(response));
            // this.userType = this.userInfo.UserRole;
            })*/
