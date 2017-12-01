import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect }  from 'react-redux';

import AddTeams from './AddTeams';
import TeamList from './TeamList';

import * as managerApi from './../data/Manager/api';
import * as tlApi from './../data/TL/api';
import * as api from './../data/TeamsList/api';

class Teams extends Component {
	componentWillMount(){
		this.props.dispatch(managerApi.manager());
		this.props.dispatch(tlApi.tlApi());
		this.props.dispatch(api.fetchTeamList(1));
	}

	componentWillReceiveProps(nextProps, nextState){
		console.log("Inside Team ", nextProps);
	}

	render() {
		const { 
			teamLists,
			manager ,
			tlList
		} = this.props;

		return (
			<div>
				<p className = 'heading-style project-style'> Teams </p>
				<AddTeams managerList = { manager } tlList = { tlList }/>
				<TeamList teams = { teamLists } />
			</div>
		)
	}
}

Teams.propTypes = {
  tlList: PropTypes.object,
  teamLists: PropTypes.object,
  manager: PropTypes.object
};

export default connect(
	state => {
		return ({
			tlList : state.teams.data.tlList[state.teams.data.tlList.length - 1],
			teamLists : state.teams.data.teamsList[state.teams.data.teamsList.length - 1],
			manager : state.teams.data.manager[state.teams.data.manager.length - 1]
		})
	}
)(Teams)