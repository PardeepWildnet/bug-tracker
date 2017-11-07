export const base_url = 'http://180.151.103.85:3015/api/';
export const goodkarms_url = 'http://180.151.103.85:3015/api/';
export const acta_url = 'http://actaagency.com.au/administrator/';
export const userInfo = JSON.parse(localStorage.getItem('userDetail')) || {"data":{"object":{"token":"cRToDbCMR3rW"}}};
export const token = userInfo.data.object.token/*!=undefined ? userInfo.data.object.token : 'kjk'*/;