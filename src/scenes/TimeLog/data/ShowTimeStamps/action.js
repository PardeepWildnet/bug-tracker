export const SHOW_TIME_LOG = 'scenes/TaskList/data/TASK';

export const showTimeLog = (payload) => { 
	return {
		type: SHOW_TIME_LOG,
		payload
	}
}