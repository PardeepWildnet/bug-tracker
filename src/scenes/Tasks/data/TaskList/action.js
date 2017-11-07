export const SHOW_TASK = 'scenes/TaskList/data/TASK';

export const showTask = (payload) => { 
	console.log("inside action in tasklist and data is :- ",payload);
	return {
		type: SHOW_TASK,
		payload
	}
}