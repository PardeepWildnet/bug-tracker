import React, { Component } from 'react';
import { connect } from  'react-redux';
import { Radio, Select } from 'antd';

const Option = Select.Option;
const RadioGroup = Radio.Group;

class StatusFilter extends Component{
	constructor(props){
		super(props);
		this.onSearch = this.onSearch.bind(this);
	}

	onSearch(e){
		// console.log(e.target.value);
	}
	render(){
	debugger
		return(
			<div style = {{width : '100%'}}>
				<Select mode = 'multiple' placeholder="Select default Assignee" onChange={this.handleParticipants}>
				 	<Option value="jack">Jack</Option>
					<Option value="lucy">Lucy</Option>
					<Option value="disabled" disabled>Disabled</Option>
					<Option value="Yiminghe">yiminghe</Option>
		        </Select>
			</div>
		)
	}
}

export default connect(
	state => ({

	})
)(StatusFilter);