import React, { Component } from 'react';
import { Form, Button, Input, Icon } from 'antd';

import AddSubTask from './../SubTask';
import './TaskList.css';
import { SubTaskList } from './../SubTaskList';

class TaskList extends Component {

	render () {
		const { 
			tasks 
		} = this.props;
		
		return(
			<div >
				{
 					this.props.tasks && 
					this.props.tasks.map((task) => (
						<div key = {task.id}>
							<p>{ task.desc }</p>
							<p>{ task.category }</p>
							<p>{ task.desc }</p><br /><br />
							<AddSubTask id = {task.id} />
							<br />
							<hr />
						</div>
					))
				}
			</div>
		)
	}
}

export default TaskList

/*<div key = {task.id}>
							<p>{ task.desc }</p>
							<p>{ task.category }</p>
							<p>{ task.desc }</p><br /><br />
							<AddSubTask id = {task.id} />
							<br />
							<hr />
						</div>*/

						/*<div key = { task.id } className = 'tasklist-container'>
							<a className = 'task-title-style'>{ task.title }</a>
							{ task.scope == 'private' ? 
								<i className="fa fa-lock scope-icon-style" aria-hidden="true" ></i> : ''
							}
							{ task.milestone && <i className="fa fa-link scope-icon-style" aria-hidden="true"></i> }
							<a href = "">{ task.desc }</a>
							<span className = 'duration-style'> { task.date } </span>
							<SubTaskList subTasks = { task.subTasks } />
							<AddSubTask id = {task.id} subTask = { task.subTasks } />
						</div>*/
