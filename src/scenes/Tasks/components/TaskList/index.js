import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button, Input, Icon, Pagination } from 'antd';

import * as api from './../../data/TaskList/api';
import AddSubTask from './../SubTask';
import * as deleteApi from './../../data/DeleteTask/api';
import './TaskList.css';
import { SubTaskList } from './../SubTaskList';

class TaskList extends Component {
	constructor(props) {
		super(props);

		this.deleteTask = this.deleteTask.bind(this);
		this.handlePageNumber = this.handlePageNumber.bind(this);
		
		this.state = {
			pageNumber : 1,
		}
	}

	// This method is used to delete the task 
	deleteTask (project) {
		this.props.dispatch(deleteApi.deleteProject(project))
		console.log("inside delete project", project);
	}

	// This method is used to render list of task with page number
	handlePageNumber (value) {
		this.setState({
			pageNumber : value
		}, function() {
			console.log("current page number is", this.state.pageNumber);
		})
		this.props.dispatch(api.ShowTaskListApi(value));
	}
	
	render () {
		const { 
			tasks 
		} = this.props;
		
		return(
			<div>
				<div className = 'project-list-container'>
					<table className = 'table table-striped table-responsive'>
						<tbody>
							<tr>
								<th>S No.</th>
								<th>Title</th>
								<th>Details</th>
								<th>Assignee Id</th>
								<th>Assignee By</th>
								<th>Action</th>
							</tr>
						</tbody>
						
						<tbody>
						{
							tasks ? 
							tasks.result.map((item, index) => (
									<tr key = {index}>
										<td> {index + ((this.state.pageNumber - 1) * 10) + 1} </td>
										<td> {item.taskTitle ? item.taskTitle : '-'} </td>
										<td> {item.taskDetails ? item.taskDetails : '-'} </td>
										<td>{item.assignTo ? item.assignTo.map((tl, index) => (
												<p key = {index}>{tl ? tl : '-'}</p>))  : '-'
											} 
										</td>
										<td> {item.assignBy ? item.assignBy : '-'} </td>
										<td>
											<Link to={'/dashboard/task/' + item._id }><i className="fa fa-eye icon-style" aria-hidden="true"></i></Link>
											<i className="fa fa-trash-o icon-style" onClick = {() => this.deleteTask(item) } aria-hidden="true"></i>
											<Link to = {'/dashboard/task/subtask/' + item._id }>
												<Button type="primary" htmlType="submit" className="login-form-add-button">
										        	Add Sub Task
										     	</Button>
										    </Link>
										</td>
									</tr>
							)) :
							<tr>
								<td colSpan = '6'>
									<img src={require("./../../../../Assets/loader.gif")} role="presentation" className = 'loader-style'/>
								</td>
							</tr>
						}
						</tbody>
					</table>
				</div>
			<Pagination defaultCurrent={1}  total={tasks ? tasks.totalRecords : 10} onChange = {this.handlePageNumber}/>
		</div>
		)
	}
}
export default connect()(TaskList);

				/*{
 					this.props.tasks && 
					this.props.tasks.map((task) => (
						<div key = {task.id}>
							<p>{ task.title }</p>
							<p>{ task.days }</p>
							<p>{ task.desc }</p><br /><br />
							<AddSubTask id = {task.id} />
							<br />
							<hr />
						</div>
					))
				}*/
										/*<td> {item.assignTo.assigneeId ? item.assignTo.assigneeId : '-'} </td>
										<td> {item.assignBy.assigner ? item.assignBy.assigner : '-'} </td>*/
