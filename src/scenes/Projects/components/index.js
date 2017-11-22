import React, { Component } from 'react';
import { connect }  from 'react-redux';

import AddProjects from './AddProjects';
import ProjectsList from './ProjectsList';

import * as api from './../data/ProjectsList/api';

class Projects extends Component {
	constructor() {
		super();
		localStorage.setItem('isNavBar','show');
	}

	componentWillMount(){
		this.props.dispatch(api.fetchProjectsList('1'));
	}

	componentWillReceiveProps(nextProps, nextState){
		console.log("After Login ", nextProps);
	}

	render() {
		const { 
			productLists 
		} = this.props;

		return (
			<div>
				<p className = 'heading-style project-style'> Projects </p>
				<AddProjects />
				<ProjectsList projects = { productLists } />
			</div>
		)
	}
}

export default connect(
	state => {
		return ({
			productLists : state.projects.data.projectsList[0]
		})
	}
)(Projects)