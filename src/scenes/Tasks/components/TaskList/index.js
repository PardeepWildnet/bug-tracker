import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Input, Icon, Pagination } from 'antd';

import AddSubTask from './../SubTask';
import './TaskList.css';
import { SubTaskList } from './../SubTaskList';

class TaskList extends Component {
	constructor(props) {
		super(props);

		this.handlePageNumber = this.handlePageNumber.bind(this);
		
		this.state = {
			pageNumber : 1,
		}
	}

	handlePageNumber (value) {
		this.setState({
			pageNumber : value
		}, function() {
			console.log("current page number is", this.state.pageNumber);
		})
		// this.props.dispatch(projectListApi.fetchProjectsList(value));
	}
	
	render () {
		const { 
			tasks 
		} = this.props;
		
		console.log("tasks", tasks);
		return(
			<div>
				<div className = 'project-list-container'>
					<table className = 'table table-striped table-responsive'>
						<tbody>
							<tr>
								<th>S No.</th>
								<th>Title</th>
								<th>Details</th>
								<th>Comment</th>
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
									<td> {item.taskComment ? item.taskComment : '-'} </td>
									<td>
										<Link to={'/dashboard/tasks/' + item._id }><i className="fa fa-eye icon-style" aria-hidden="true"></i></Link>
										<i className="fa fa-trash-o icon-style" onClick = {() => this.deletetask(item) } aria-hidden="true"></i>
									</td>
								</tr>
						)) :
						<tr>
							<td colSpan = '5'>
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

export default TaskList
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
