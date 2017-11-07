export const LOG_IN = '/scenes/Login/data/LOGIN';

export const login = (payload) => { 
	return {
		type: LOG_IN,
		payload 
	}
}