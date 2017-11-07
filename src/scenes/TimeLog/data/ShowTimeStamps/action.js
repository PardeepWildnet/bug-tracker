export const SHOW_TIME_LOG = 'scenes/TaskList/data/TASK';

export const showTimeLog = (payload) => { 
	console.log("inside action in tasklist and data is :- ",payload);
	return {
		type: SHOW_TIME_LOG,
		payload
	}
}