import React, { Component } from 'react';
import { connect } from 'react-redux';
import Time from 'react-time';
import { Button, Radio, Modal, Form, Input, Select, InputNumber, Progress  } from 'antd';

import * as userApi from './../../../User/data/UserList/api';
import * as api from './../../data/TaskDetail/api';
import * as editTaskApi from './../../data/EditTask/api';
import './TaskDetail.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class TaskDetailView extends Component {
	constructor(props){
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.showModal = this.showModal.bind(this);
		this.handleParticipants = this.handleParticipants.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		
		this.state = {
			visible: false,
			participants : []
		}
	}

	// This method is call before rendering the component to get the task details and user list
	componentWillMount() {
		this.props.dispatch(userApi.fetchUserList('1'));
		this.props.dispatch(api.fetchTaskDetail(this.props.match.params.id));
	}

	// This method is called whenever component get any prop
	componentWillReceiveProps(nextProps, nextState){
		console.log("In Task Detail ", nextProps.editTask)
		if(nextProps.editTask && nextProps.editTask.data.status === 200){
			this.forceUpdate();
		}
	}

	// This method is used to get the participants to whom the task is assigned
	handleParticipants(value) {
	  console.log(`selected ${value}`);
	  this.setState({
	  	participants : value
	  }, function() {
	  	console.log("selected participants are :- ", this.state.participants);
	  })
	}

	// This method is used to show edit task modal
	showModal() {
		this.setState({
		  visible: !this.state.visible,
		}, function () {
			console.log("show modal button ", this.state.visible);
		});
	}

	// this method is used to close the edit task modal
	handleCancel() {
		this.setState({
		  visible: false,
		}, function() {
			console.log('Clicked cancel button');
		});
	}

	// This method is used to edit the task details
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values);
		    this.props.dispatch(editTaskApi.editTaskDetails(values, this.props.match.params.id, this.state.participants))
		    this.setState({
		    	visible: false,
		    });
		    this.props.form.resetFields();
			this.props.history.push('/dashboard/tasks');
		  }
		});
	}

	render () {
		const { visible } = this.state;

		const {
			taskDetail,
			userLists,
			form : { getFieldDecorator },
			editTask
		} = this.props;

		const renderParticipants = userLists ? userLists.result.map((user) => (
	    	<Option 
	    		value={ user.firstName + user.lastName } 
	    		key = { user._id }
	    	>
	    		{ user.firstName } { user.lastName }
	    	</Option>
	    )):'';

	    console.log("task detail is", taskDetail);
		return (
			<div className = 'task-detail-view'>
				<p className = 'heading-style task-style'> Task Detail </p>
				<table className='table table-striped table-responsive table-view'>
					<tbody>
						<tr>
								<th>Title</th>
								<th>Description</th>
						</tr>
					</tbody>
				    {taskDetail ?
			  			<tbody>
				  			<tr>
				  				<td>Title : </td>
				  				<td>{taskDetail.result.taskTitle ? taskDetail.result.taskTitle : '-'} </td>
				  			</tr>
							<tr>
				  				<td>Created At :</td>
				  				<td> <Time value={taskDetail.result.taskCreatedAt ? taskDetail.result.taskCreatedAt : '-'} format="DD-MM-YYYY" /> </td>
				  			</tr>

							<tr>
				  				<td>Details :</td>
				  				<td>{taskDetail.result.taskDetails ? taskDetail.result.taskDetails : '-'}</td>
				  			</tr>
	
							<tr>
				  				<td>Visibility :</td>
				  				<td>{taskDetail.result.visibilityTo ? taskDetail.result.visibilityTo : '-'}</td>
				  			</tr>

				  			<tr>
				  				<td>Assign To :</td>
				  				<td>
				  					{
				  						taskDetail.result.assignTo ? taskDetail.result.assignTo.map((tl, index) => (
											<p key = {index}>{tl ? tl.firstName + " " + tl.lastName : '-'}</p>))  : '-'
									} 
								</td>
				  			</tr>

				  			<tr>
				  				<td>Assign By :</td>
				  				<td>{taskDetail.result.assignBy ? taskDetail.result.assignBy.firstName + " " + taskDetail.result.assignBy.lastName : '-'}</td>
				  			</tr>
							
				  			<tr>
				  				<td colSpan = '2'>
				  					 <Progress number={taskDetail.result.taskStatus ? taskDetail.result.taskStatus : 50} size="small" />
				  				</td>
				  			</tr>

			  				<tr>
				  				<td colSpan = '2'>
				  					<Button type="primary"  icon="plus-circle-o" onClick={this.showModal} >Edit Task</Button>
				  				</td>
				  			</tr>

				  		</tbody> : 
			  			<tbody>
			  				<tr>
								<td colspan = '7'>
									No Record Found
								</td>
							</tr>
			  			</tbody>
					}
   				</table>

   				<Modal title="Edit Task Details"
		          visible={visible}
		          onCancel={this.handleCancel}
		          footer={[]}
		        >
		        { taskDetail ?
					<Form onSubmit={this.handleSubmit}  >
				        <FormItem>
				          {getFieldDecorator('title', {
				            rules: [{ required: true, message: 'Please input title of task!' }],
				            initialValue : taskDetail.result.taskTitle
				          })(
				            <Input placeholder="Give the list a title" />
				          )}
				        </FormItem>
						
						<FormItem>
				          {getFieldDecorator('assignee', {
				            rules: [{ required: true, message: 'Please input participant name!' }],
				            initialValue : taskDetail.result.assignTo._id
				          })(
					         <Select mode = 'multiple' placeholder="Select default Assignee" onChange={this.handleParticipants}>
					            {renderParticipants}
					         </Select>
				          )}
				        </FormItem>

				        <FormItem>
				          {getFieldDecorator('detail', {
				            initialValue : taskDetail.result.taskComment
				          })(
				            <Input placeholder="Describe this List (optional)" />
				          )}
				        </FormItem>

				        <p style = {{marginTop : '16px'}}> Who can view this task list :-</p>
				        
				        <FormItem>
				          {getFieldDecorator('scope', {
				            initialValue : 'Everyone'
				          })(
					        <RadioGroup >
						        <Radio value='Everyone'> Everyone </Radio>
						        <Radio value='Private'> Private </Radio>
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
			            	SAVE
			         	</Button>
			         	<br />	
	         		</Form>	: ''
				}
	        </Modal>
		</div>
		)
	}
}
const TaskDetail = Form.create()(TaskDetailView);

export default connect(
	state => {
		debugger
		return ({
			userLists : state.user.data.userList[state.user.data.userList.length -1],
			taskDetail : state.tasks.data.taskDetail[state.tasks.data.taskDetail.length - 1],
			editTask : state.tasks.data.editTask[state.tasks.data.editTask.length - 1],
		})
	}
)(TaskDetail);
			