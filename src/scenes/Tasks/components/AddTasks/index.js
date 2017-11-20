import React, { Component } from 'react';
import { Input, Menu, Dropdown, Icon, Button, Form, Select, Radio, InputNumber } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router';

import * as addTaskApi from './../../data/AddTasks/api';
import participants from './../../../../Assets/participantsList.json';
import './AddTask.css';

const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class AddTasksView extends Component {
	constructor(props){
		super(props);
		this.addTask = this.addTask.bind(this);
		this.onChange = this.onChange.bind(this);
		this.state = {
			value : 1
		}
	}

	addTask(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form in add task: ', values);
			    this.props.dispatch(addTaskApi.AddTaskApi(values))
			    this.props.form.resetFields();
			}
		});
	}

	onChange = (e) => {
		console.log('radio checked', e.target.value);
		this.setState({
		  value: e.target.value,
		});
	}


	render() {
	    const { 
	    	getFieldDecorator 
	    } = this.props.form;

	    const renderParticipants = participants.map((pariticipant) => (
	    	<Option 
	    		value={ pariticipant.name } 
	    		key = { pariticipant.id }
	    	>
	    		{ pariticipant.name }
	    	</Option>
	    ));

		return(
			<Form onSubmit={this.addTask} className = 'login-form-add' >
		        <FormItem>
		          {getFieldDecorator('category', {
		            rules: [{ required: true, message: 'Please input title of task!' }],
		          })(
		            <Input placeholder="Give the list a title" />
		          )}
		        </FormItem>
				
				<FormItem>
		          {getFieldDecorator('participants', {
		            rules: [{ required: true, message: 'Please input participant name!' }],
		          })(
			          <Select placeholder="Select default Assignee">
			            {renderParticipants}
			         </Select>
		          )}
		        </FormItem>

		        <FormItem>
		          {getFieldDecorator('desc', {
		            rules: [{ required: true, message: 'Please input your task option!' }],
		          })(
		            <Input placeholder="Describe this List (optional)" />
		          )}
		        </FormItem>

		        <p style = {{marginTop : '16px'}}> Who can view this task list :-</p>
		        
		        <FormItem>
		          {getFieldDecorator('scope', {
		            rules: [{ required: true, message: 'Please input your task option!' }],
		          })(
			        <RadioGroup setFieldsValue={this.state.value}>
				        <Radio value={1}> Everyone </Radio>
				        <Radio value={2}> Private </Radio>
				    </RadioGroup>
		          )}
		        </FormItem>

			    <div>
			    	<span> Select number of days </span> 
			    	<FormItem>
			          {getFieldDecorator('days', {
			            rules: [{ required: true, message: 'Please input your task option!' }],
			            initialValue : '3'
			          })(
			    		<InputNumber min={1} max={10} />
			          )}
			        </FormItem>
			    </div>

				<Button type="primary" htmlType="submit" className="login-form-add-button">
	            	Add Task
	         	</Button>
	         	<br />	
         	</Form>		
		)
	}
}
const AddTasks = Form.create()(AddTasksView);
export default connect(

)(AddTasks);
