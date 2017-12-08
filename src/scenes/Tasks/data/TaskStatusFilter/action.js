export const TASK_STATUS_LIST = 'scenes/AllStatus/data/TASK';

export const showTask = (payload) => { 
	return {
		type: TASK_STATUS_LIST,
		payload
	}
}