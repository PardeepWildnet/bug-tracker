export const GET_TASK = 'scenes/AddTask/data/TASK';

export const addTask = (payload) => {
	return {
		type: GET_TASK,
		payload
	}
}