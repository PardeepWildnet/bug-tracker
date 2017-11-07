import React, { Component } from 'react';
import { connect }  from 'react-redux';

import AddProjects from './AddProjects';
import ProjectsList from './ProjectsList';

import * as api from './../data/ProjectsList/api';

class Projects extends Component {

	componentWillMount(){
		this.props.dispatch(api.fetchProjectsList());
	}

	componentWillReceiveProps(nextProps, nextState){
		console.log("After Login ", nextProps);
	}

	render() {
		const { productLists } = this.props;

		return (
			<div>
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