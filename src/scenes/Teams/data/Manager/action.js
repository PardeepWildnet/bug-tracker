export const FETCH_API = 'scenes/MAnagerList/data/FETCH_API';

export const initiateItems = (payload) => {
	return {
		type: FETCH_API,
		payload
	}
}