export const FETCH_API = 'scenes/AddTeam/data/FETCH_API';

export const initiateTeams = (payload) => {
	return {
		type: FETCH_API,
		payload
	}
}