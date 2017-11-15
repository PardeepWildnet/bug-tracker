export const EDIT_TIME_LOG = "scenes/editLogTime/data/editTimeLogAction";

export const editTimeAction = (payload) => {
	console.log("inside action of edit time");
	
	return {
		type : EDIT_TIME_LOG,
		payload		
	}
}