import React, { Component } from 'react';
import { connect }  from 'react-redux';

import AddProjects from './AddProjects';
import ProjectsList from './ProjectsList';

import * as teamsApi from './../data/Teams/api';
import * as api from './../data/ProjectsList/api';

console.clear();

class Projects extends Component {
	componentWillMount(){
		this.props.dispatch(teamsApi.teams());
		this.props.dispatch(api.fetchProjectsList('1'));
	}

	componentWillReceiveProps(nextProps, nextState){
		console.log("Inside Add Projects", nextProps);
	}

	render() {
		const { 
			productLists ,
			teams
		} = this.props;
		debugger
		return (
			<div>
				<p className = 'heading-style project-style'> Projects </p>
				<AddProjects teams = { teams }/>
				<ProjectsList projects = { productLists } />
			</div>
		)
	}
}

export default connect(
	state => {
		debugger
		console.log("size of project list is", state.projects.data.projectsList.length);
		return ({
			productLists : state.projects.data.projectsList[state.projects.data.projectsList.length - 1],
			teams : state.projects.data.teams[state.projects.data.teams.length-1],
		})
	}
)(Projects)