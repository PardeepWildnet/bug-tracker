import React, { Component } from 'react';
import { connect }  from 'react-redux';

import AddTeams from './AddTeams';
import TeamList from './TeamList';

import * as api from './../data/TeamsList/api';

class Teams extends Component {
	constructor() {
		super();
	}

	componentWillMount(){
		this.props.dispatch(api.fetchTeamList());
	}

	componentWillReceiveProps(nextProps, nextState){
		console.log("After Login ", nextProps);
	}

	render() {
		const { 
			teamLists 
		} = this.props;

		return (
			<div>
				<p className = 'heading-style project-style'> Teams </p>
				<AddTeams />
				<TeamList teams = { teamLists } />
			</div>
		)
	}
}

export default connect(
	state => {
		return ({
			teamLists : state.teams.data.teamsList[0]
		})
	}
)(Teams)