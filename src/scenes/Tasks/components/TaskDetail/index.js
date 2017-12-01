import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Radio, Icon, Modal, Form, Input, Select, Upload, InputNumber } from 'antd';

import * as userApi from './../../../User/data/UserList/api';
import * as api from './../../data/TaskDetail/api';
import './UserDetail.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class TaskDetailView extends Component {
	constructor(props){
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.showModal = this.showModal.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		
		this.state = {
			visible: false,
		}
	}

	// This method is call before rendering the component to get the task details and user list
	componentWillMount() {
		this.props.dispatch(userApi.fetchUserList('1'));
		this.props.dispatch(api.fetchTaskDetail(this.props.match.params.id));
	}

	// This method is called whenever component get any prop
	componentWillReceiveProps(nextProps, nextState){
		console.log("In Task Detail ", nextProps.userDetail)
		if(nextProps.userDetail && nextProps.userDetail.status === 200){
			this.setState({
		    	visible: false,
		    });
			this.forceUpdate();
		}
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
		    // this.props.dispatch(editUserApi.editUserDetails(values, this.props.match.params.id))
		    this.props.form.resetFields();
		  }
		});
	}

	render () {
		const { visible } = this.state;

		const {
			taskDetail,
			userLists
		} = this.props;

		const renderParticipants = userLists ? userLists.result.map((user) => (
	    	<Option 
	    		value={ user._id } 
	    		key = { user._id }
	    	>
	    		{ user.firstName } { user.lastName }
	    	</Option>
	    )):'';

	    const { getFieldDecorator } = this.props.form;

		return (
			<div className = 'user-detail-view'>
				<p className = 'heading-style user-style'> Task Detail </p>
				<table className='table table-striped table-responsive table-view'>
					<tbody>
						<tr>
								<th>Key</th>
								<th>Value</th>
						</tr>
					</tbody>
				    {taskDetail ?
			  			<tbody>
				  			<tr>
				  				<td>Title : </td>
				  				<td>{taskDetail.result.taskTitle} </td>
				  			</tr>
							<tr>
				  				<td>Created At :</td>
				  				<td> {taskDetail.result.taskCreatedAt}</td>
				  			</tr>

							<tr>
				  				<td>Comment :</td>
				  				<td>{taskDetail.result.taskComment}</td>
				  			</tr>
	
							<tr>
				  				<td>Task Group :</td>
				  				<td>{taskDetail.result.taskGroup}</td>
				  			</tr>

				  			<tr>
				  				<td>Assign To :</td>
				  				<td>{taskDetail.result.assignTo.assigneeId}</td>
				  			</tr>

				  			<tr>
				  				<td>Assign By :</td>
				  				<td>{taskDetail.result.assignBy.assigner}</td>
				  			</tr>
							
			  				<tr>
				  				<td colSpan = '2'>
				  					<Button type="primary"  icon="plus-circle-o" onClick={this.showModal} >Edit Task</Button>
				  				</td>
				  			</tr>
				  		</tbody> : 
			  			<tbody>
			  				<tr>
								<td colSpan = '7'>
									<img src={require("./../../../../Assets/loader.gif")} role="presentation" className = 'loader-style'/>
								</td>
							</tr>
			  			</tbody>
					}
   				</table>

   				<Modal title="Edit User Details"
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
			            initialValue : taskDetail.result.assignTo.assigneeId
			          })(
				          <Select placeholder="Select default Assignee">
				            {renderParticipants}
				         </Select>
			          )}
			        </FormItem>

			        <FormItem>
			          {getFieldDecorator('detail', {
			            rules: [{ required: true, message: 'Please input your task option!' }],
			            initialValue : taskDetail.result.taskComment
			          })(
			            <Input placeholder="Describe this List (optional)" />
			          )}
			        </FormItem>

			        <p style = {{marginTop : '16px'}}> Who can view this task list :-</p>
			        
			        <FormItem>
			          {getFieldDecorator('scope', {
			            rules: [{ required: true, message: 'Please input your task option!' }],
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
	         	</Form>		 : ''
				}
	        </Modal>
		</div>
		)
	}
}
const TaskDetail = Form.create()(TaskDetailView);

export default connect(
	state => {
		return ({
			userLists : state.user.data.userList[state.user.data.userList.length -1],
			taskDetail : state.tasks.data.taskDetail[state.tasks.data.taskDetail.length - 1],
		})
	}
)(TaskDetail);
			