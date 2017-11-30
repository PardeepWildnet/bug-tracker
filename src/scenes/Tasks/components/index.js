import React , { Component } from 'react';
import { connect }  from 'react-redux';

import AddTasks from './AddTasks';
import TaskList from './TaskList';

import * as userApi from './../../User/data/UserList/api';
import * as api from './../data/TaskList/api';

class Tasks extends Component {
	componentWillMount (){
		this.props.dispatch(userApi.fetchUserList('1'));
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
			taskLists : state.tasks.data.showTasks[state.tasks.data.showTasks.length - 1]
		})
	}
)(Tasks)