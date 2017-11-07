export const GET_TASK = 'scenes/TaskList/data/TASK';

export const addTask = (payload) => {
	return {
		type: GET_TASK,
		payload
	}
}