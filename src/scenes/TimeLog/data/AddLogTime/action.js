export const ADD_TIME_LOG = "scenes/addLogTime/data/timeLogAction";

export const timeLogAction = (payload) => {
	console.log("inside action of add add time log " + payload);
	return {
		type : ADD_TIME_LOG,
		payload		
	}
}