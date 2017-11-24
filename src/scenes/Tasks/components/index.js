import React , { Component } from 'react';
import { connect }  from 'react-redux';

import AddTasks from './AddTasks';
import TaskList from './TaskList';

import * as api from './../data/TaskList/api';

class Tasks extends Component {
	constructor() {
		super(); 
	}

	componentWillMount (){
		this.props.dispatch(api.ShowTaskListApi());
	}

	render () {
		const { 
			taskLists, 
			id 
		} = this.props;

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