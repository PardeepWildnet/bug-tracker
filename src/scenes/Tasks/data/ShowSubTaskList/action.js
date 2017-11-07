export const SHOW_SUB_TASK = 'scenes/SubTaskList/data/TASK';

export const showSubTask = (payload) => { 
	console.log("inside action in subtasklist and data is :- ",payload);
	return {
		type: SHOW_SUB_TASK,
		payload
	}
}