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
		
		console.log("tasks", tasks);
		return(
			<div >
				{
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
				}
			</div>
		)
	}
}

export default TaskList
