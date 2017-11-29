import { combineReducers } from 'redux';

import { reducer as TeamsListReducer } from './TeamsList/reducer';
import { reducer as DeleteTeamsReducer } from './DeleteTeam/reducer';
import { reducer as ManagerListReducer } from './Manager/reducer';
import { reducer as TlListReducer } from './TL/reducer';
import { reducer as TeamDetailReducer } from './TeamDetail/reducer';
import { reducer as AddTeamsReducer } from './AddTeams/reducer';
import { reducer as EditTeamsReducer } from './EditTeam/reducer';

export const reducer = combineReducers({
	teamsList : TeamsListReducer,
	editTeams : EditTeamsReducer,
	addTeam : AddTeamsReducer,
	teamDetail : TeamDetailReducer,
	tlList : TlListReducer,
	manager : ManagerListReducer,
	deleteTeam : DeleteTeamsReducer
})