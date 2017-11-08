export const SHOW_SUB_TASK = 'scenes/SubTaskList/data/TASK';

export const showSubTask = (payload) => { 
	return {
		type: SHOW_SUB_TASK,
		payload
	}
}