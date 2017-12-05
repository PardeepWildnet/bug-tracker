export const FETCH_API = 'scenes/AddTeamMember/data/FETCH_API';

export const initiateItems = (payload) => {
	return {
		type: FETCH_API,
		payload
	}
}