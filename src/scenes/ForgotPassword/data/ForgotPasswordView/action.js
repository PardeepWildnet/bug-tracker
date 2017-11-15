export const FORGOT_PASSWORD = '/scenes/ForgotPassword/data/FORGOT_PASSWORD';

export const forgotPassword = (payload) => { 
	return {
		type: FORGOT_PASSWORD,
		payload 
	}
}