import React, { Component } from 'react';
import { Button, Radio, Icon, Modal, Form, Input, Select, Upload } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import enUS from 'antd/lib/locale-provider/en_US';

import * as api from './../../data/EditUser/api';
const dateFormat = 'YYYY-MM-DD';
const Option = Select.Option;
const FormItem = Form.Item;

class EditUserDetailView extends Component {
	constructor (props) {
		super(props);
		const value = this.props.value || {};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		console.log("values are", value);
		this.state = {
			visible : this.props.visible,
			projectName : value.projectName || '',
			projectDetails : value.projectDetails || '',
			projectCraetedBy : value.projectCraetedBy || '',
			projectStartDate : value.projectStartDate || '',
			projectEndDate : value.projectEndDate| '',
			confirmLoading: false
		}
	}

	componentWillReceiveProps(nextProps) {
	    // Should be a controlled component.
	    if ('value' in nextProps) {
	      const value = nextProps.value;
	      this.setState(value);
	    }
	}

	handleDateRange = (date, dateString) => {
		console.log(date, dateString);
	}

   	handleCancel = (e) => {
	    console.log(e);
	    this.setState({
	    	visible: false,
	    });
    	this.props.onCancel();
	}

	
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values);
		    this.props.dispatch(api.editUserDetails(values))
		    this.props.form.resetFields();
		  }
		  this.setState({
	    	visible: false,
	      });
	      this.props.onCancel();
		});
	}

	render () {
		const {
			projectName,
			projectCreatedBy,
			projectDetails,
			projectStartDate,
			projectEndDate,
			visible, 
			userRole
		} = this.props;

		const { 
			getFieldDecorator 
		} = this.props.form;

		const renderDesignation =  userRole ? userRole.result.map((item) => (
	    	<Option 
	    		value={ item.roleName } 
	    		key = { item.roleId }
	    	>
	    		{ item.roleName }
	    	</Option>
	    )) : '';
		console.log("edit project details , values are", projectName, projectDetails);

		return (
		       <Modal title="Add User"
			          visible={visible}
			          onCancel={this.handleCancel}
			          footer={[]}
			        >
			          <Form onSubmit = { this.handleSubmit }>


				        <FormItem>
				          {
				          	getFieldDecorator('Fname', {
				             rules: [{ required: true, message: 'Please input First name!' }],
				             initialValue : this.state.firstName
				          })(
			            		<Input placeholder="First Name" />
				          )}
				        </FormItem>
	   					<FormItem>
				          {
				          	getFieldDecorator('Lname', {
				             rules: [{ required: true, message: 'Please input Last name!' }],
				             initialValue : this.state.lastName
				          })(
			            		<Input placeholder="Last Name" />
				          )}
				        </FormItem>
	
	   					<FormItem>
				          {
				          	getFieldDecorator('email', {
				             rules: [{ required: true, message: 'Please input email!' }],
				             initialValue : this.state.email
				          })(
			            		<Input placeholder="Email" />
				          )}
				        </FormItem>
	
				        <FormItem>
				          {getFieldDecorator('designation', {
				            rules: [{ required: true, message: 'Please input designation of user!' }],
				            initialValue : this.state.designation
				          })(
					          <Select placeholder="Select designation">
					          	{renderDesignation}
					         </Select>
				          )}
				        </FormItem>

				        <FormItem>
				          {getFieldDecorator('gender', {
				            rules: [{ required: true, message: 'Please input designation of user!' }],
				            initialValue : this.state.gender
				          })(
					          <Select placeholder="Select Gender">
					          		<Option value="Male">Male</Option>
    								<Option value="Female">Female</Option>
					         </Select>
				          )}
				        </FormItem>
	
				        <FormItem>
				          <Button type="primary" htmlType="submit" className="login-form-button">
				            SAVE
				          </Button>
				        </FormItem>
				    </Form>
				    {projectName}
			        </Modal>
		)
	}
}
const EditUser = Form.create()(EditUserDetailView);
export default connect(
state => {
		return ({
			userRole : state.user.data.userRole[0]
		})
	}
)(EditUser)