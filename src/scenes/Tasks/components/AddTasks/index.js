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

	// This method is used to add task
	addTask = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form in add task: ', values);
			    this.props.dispatch(addTaskApi.AddTaskApi(values, this.state.participants))
			    this.props.form.resetFields();
			}
		});
	}

	render() {
	    const {
	    	userLists,
	    	form : { getFieldDecorator }
	    } = this.props;

	    const renderParticipants = userLists ? userLists.result.map((user) => (
	    	<Option
	    		value={ user._id }
	    		key = { user._id }
	    	>
	    		{ user.firstName } { user.lastName }
	    	</Option>
	    )):'';

		return(
			<Form onSubmit={this.addTask} className = 'login-form-add' >
		        <FormItem>
		          {getFieldDecorator('title', {
		            rules: [{ required: true, message: 'Please input title of task!' }],
		          })(
		            <Input placeholder="Give the list a title" />
		          )}
		        </FormItem>

						<FormItem>
		          {getFieldDecorator('assignee', {
		            rules: [{ required: true, message: 'Please input assignee!' }],
		          })(
			          <Select mode = 'multiple' placeholder="Select default Assignee">
			            {renderParticipants}
			         </Select>
		          )}
		        </FormItem>

		        <FormItem>
		          {getFieldDecorator('detail')(
		            <Input placeholder="Describe this List (optional)" />
		          )}
		        </FormItem>

		        <p style = {{marginTop : '16px'}}> Who can view this task list :-</p>

		        <FormItem>
		          {getFieldDecorator('scope', {
		          })(
			        <RadioGroup >
				        <Radio value='Everyone'> Everyone </Radio>
				        <Radio value='Private'> Private </Radio>
				    </RadioGroup>
		          )}
		        </FormItem>

			    	<FormItem label = 'Select number of days'>
			          {getFieldDecorator('hours', {
			            initialValue : '3'
			          })(
			    		<InputNumber min={1} max={30} />
			          )}
  	       		</FormItem>

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
	state => {
		return ({
			userLists : state.user.data.userList[state.user.data.userList.length -1],
		})
	}
)(AddTasks);
