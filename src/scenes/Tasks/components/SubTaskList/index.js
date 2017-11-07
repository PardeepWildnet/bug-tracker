import React, { Component } from 'react';
import { Checkbox } from 'antd';

import './SubTaskList.css';

export class SubTaskList extends Component {
	onChange(e) {
  		console.log(`checked = ${e.target.checked}`);
	}

	render () {
		const {
			subTasks 
		} = this.props;

		return (
			<div className = 'sub-task-container'>
				{
					subTasks && 
					subTasks.map((subTask) => (
						<div key = { subTask.id }>
							<Checkbox onChange={this.onChange}></Checkbox>
							 <span className = 'title-style'> Title are :- { subTask.title } </span>
						</div>
					))
				}
			</div>
		)
	}
}