import React , { Component } from 'react';
import { connect }  from 'react-redux';

import AddTasks from './AddTasks';
import TaskList from './TaskList';

import * as api from './../data/TaskList/api';

class Tasks extends Component {
	constructor() {
		super(); 
		localStorage.setItem('isNavBar','show');
	}

	componentWillMount (){
		this.props.dispatch(api.ShowTaskListApi());
	}

	render () {
		const { 
			taskLists, 
			id 
		} = this.props;
		console.log("value of nav bar is :- ", localStorage.getItem('isNavBar'))
		console.log( " id id :- " + id);

		return (
			<div>
				<AddTasks />
				<br />
				<h1> Task List </h1>
				<br />
				<TaskList tasks = { this.props.taskLists } />
			</div>
		)
	}
}

export default connect(
	state => {
		return ({
			taskLists : state.tasks.data.showTasks[0]
		})
	}
)(Tasks)