export const ADD_SUBTASK = "scenes/taskList/data/subTask";

export const subTask = (payload) => {
	console.log("inside action of add subtask " + payload);
	return {
		type : ADD_SUBTASK,
		payload		
	}
}