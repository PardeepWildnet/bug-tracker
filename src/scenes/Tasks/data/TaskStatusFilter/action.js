export const SHOW_TASK = 'scenes/TaskList/data/TASK';

export const showTask = (payload) => { 
	return {
		type: SHOW_TASK,
		payload
	}
}