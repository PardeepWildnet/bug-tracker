import React , { Component } from 'react';
import { connect }  from 'react-redux';
import { BackTop } from 'antd';

import AddTasks from './AddTasks';
import TaskList from './TaskList';
import StatusFilter from './StatusFilter';

import * as userApi from './../../User/data/UserList/api';
import * as api from './../data/TaskList/api';

class Tasks extends Component {
	filterKeyword = '';

	componentWillMount = () => {
		this.props.dispatch(userApi.fetchUserList('1'));
		this.props.dispatch(api.ShowTaskListApi('1'));
	}

	statusFilter = (keyword) => {
		this.filterKeyword = keyword;
		this.forceUpdate();
	}

	render () {
		const {
			taskLists,
			id
		} = this.props;
		return (

			<div className = 'container-style'>
				<p className = 'heading-style'> Tasks </p>
				<AddTasks />
				<br />
				<StatusFilter statusFilter = {this.statusFilter}/>
				<p className = 'heading-style'> Task List </p>
				<br />
				<TaskList tasks = { taskLists } filterKeyword = {this.filterKeyword}/>
				<BackTop />
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
