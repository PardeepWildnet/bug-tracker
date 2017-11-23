export const base_url = 'https://bugtracker-backend.herokuapp.com/';
export const goodkarms_url = 'http://180.151.103.85:3015/api/';
export const acta_url = 'http://actaagency.com.au/administrator/';
export const userInfo = JSON.parse(localStorage.getItem('userDetail')) || {};
export const token = userInfo.data && userInfo.data.token || '';

