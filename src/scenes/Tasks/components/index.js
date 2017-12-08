import React , { Component } from 'react';
import { connect }  from 'react-redux';

import AddTasks from './AddTasks';
import TaskList from './TaskList';
import StatusFilter from './StatusFilter';

import * as userApi from './../../User/data/UserList/api';
import * as api from './../data/TaskList/api';

class Tasks extends Component {
	filterKeyword = '';

	constructor(props){
		super(props);
		this.statusFilter = this.statusFilter.bind(this);
	}

	componentWillMount (){
		this.props.dispatch(userApi.fetchUserList('1'));
		this.props.dispatch(api.ShowTaskListApi());
	}

	statusFilter(keyword){
		this.filterKeyword = keyword;
		this.forceUpdate();
	}

	render () {
		const { 
			taskLists, 
			id 
		} = this.props;

		return (
			<div>
				<p className = 'heading-style'> Tasks </p>
				<AddTasks />
				<br />
				<StatusFilter statusFilter = {this.statusFilter}/>
				<p className = 'heading-style'> Task List </p>
				<br />
				<TaskList tasks = { this.props.taskLists } filterKeyword = {this.filterKeyword}/>
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