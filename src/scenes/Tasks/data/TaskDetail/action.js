export const FETCH_API = 'scenes/TaskDetail/data/FETCH_API';

export const initiateItems = (payload) => {
	return {
		type: FETCH_API,
		payload
	}
}