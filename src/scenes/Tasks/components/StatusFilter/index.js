import React, { Component } from 'react';
import { connect } from  'react-redux';
import { Radio, Select } from 'antd';

import * as filterApi from './../../data/Filter/api';
import * as api from './../../data/TaskStatusFilter/api';
import './style.css'

const Option = Select.Option;
const RadioGroup = Radio.Group;

class StatusFilter extends Component{
	constructor(props){
		super(props);

		this.statusFilter = this.statusFilter.bind(this);
	}

	componentWillMount() {
		this.props.dispatch(api.TaskStatusFilterApi())
	}

	statusFilter (value) {
		this.props.dispatch(filterApi.FilterApi(value, 1))
		this.props.statusFilter(value);
	}

 	render(){
		const { status } = this.props;

		const renderStatus = status ? status.data.taskStatus.map((item) => (
	    	<Option 
	    		value={ item.taskStatus } 
	    		key = { item.id }
	    	>
	    		{ item.taskStatus } 
	    	</Option>
	    )):'';

		return(
			<div style = {{width : '100%'}}>
				<p className = 'search-text-style'> Search by Status </p>
				<Select placeholder="Select Status" onChange={this.statusFilter} className = 'status-select-style'>
				 	{renderStatus}
		        </Select>
			</div>
		)
	}
}
export default connect(
	state => {
		debugger
		return ({
			status : state.tasks.data.status[state.tasks.data.status.length - 1]
		})
	}
)(StatusFilter);
