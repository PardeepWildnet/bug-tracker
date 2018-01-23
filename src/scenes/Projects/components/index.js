import React, { Component } from 'react';
import { connect }  from 'react-redux';
import { BackTop } from 'antd';

import AddProjects from './AddProjects';
import ProjectsList from './ProjectsList';

import * as teamsApi from './../data/Teams/api';
import * as api from './../data/ProjectsList/api';

console.clear();

const ContainerStyle = {
	padding : '2% 5%'
};

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

		return (
			<div style = { ContainerStyle }>
				<p className = 'heading-style project-style'> Projects </p>
				<AddProjects teams = { teams }/>
				<ProjectsList projects = { productLists } />
				<BackTop />
			</div>
		)
	}
}

export default connect(
	state => {
		return ({
			productLists : state.projects.data.projectsList[state.projects.data.projectsList.length - 1],
			teams : state.projects.data.teams[state.projects.data.teams.length-1],
		})
	}
)(Projects)