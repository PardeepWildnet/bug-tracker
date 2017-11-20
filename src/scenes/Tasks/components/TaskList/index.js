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
