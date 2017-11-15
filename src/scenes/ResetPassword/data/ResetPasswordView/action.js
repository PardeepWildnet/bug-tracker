export const RESET_PASSWORD = '/scenes/ForgotPassword/data/RESET_PASSWORD';

export const resetPassword = (payload) => { 
	return {
		type: RESET_PASSWORD,
		payload 
	}
}