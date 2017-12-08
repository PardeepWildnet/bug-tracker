import React, { Component } from 'react';
import { Button, Radio, Icon, Modal, Form, Input, Select, Upload } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import enUS from 'antd/lib/locale-provider/en_US';

import * as userDetailApi from './../../data/UserDetail/api';
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
		console.log("values are ddg", this.props.id);
		this.state = {
			visible : this.props.visible,
			id : this.props.id || '',
			projectName : value.projectName || '',
			projectDetails : value.projectDetails || '',
			projectCraetedBy : value.projectCraetedBy || '',
			projectStartDate : value.projectStartDate || '',
			projectEndDate : value.projectEndDate| '',
			confirmLoading: false
		}
	}

	componentDidMount (){
		console.log("id is ", this.props.id);
		if(this.props.id) {
			this.props.dispatch(userDetailApi.fetchUserDetail(this.props.id));
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
			userRole,
			userDetail,
			id
		} = this.props;

		const { 
			getFieldDecorator 
		} = this.props.form;

		console.log("id in detail view", id);
		const renderDesignation =  userRole ? userRole.result.map((item) => (
	    	<Option 
	    		value={ item.roleName } 
	    		key = { item.roleId }
	    	>
	    		{ item.roleName }
	    	</Option>
	    )) : '';
	    debugger
		return (
		       <Modal title="Add User"
			          visible={visible}
			          onCancel={this.handleCancel}
			          footer={[]}
			        >
			          { userDetail ?
			          <Form onSubmit = { this.handleSubmit }>
			          

				        <FormItem>
				          {
				          	getFieldDecorator('Fname', {
				             rules: [{ required: true, message: 'Please input First name!' }],
				             initialValue : userDetail.result.firstName
				          })(
			            		<Input  />
				          )}
				        </FormItem>

	   					<FormItem>
				          {
				          	getFieldDecorator('Lname', {
				             rules: [{ required: true, message: 'Please input Last name!' }],
				             initialValue : userDetail.result.lastName
				          })(
			            		<Input />
				          )}
				        </FormItem>
	
	   					<FormItem>
				          {
				          	getFieldDecorator('email', {
				             rules: [{ required: true, message: 'Please input email!' }],
				             initialValue : userDetail.result.email
				          })(
			            		<Input />
				          )}
				        </FormItem>
	
				        <FormItem>
				          {getFieldDecorator('designation', {
				            rules: [{ required: true, message: 'Please input designation of user!' }],
				            initialValue : userDetail.result.designation
				          })(
					          <Select >
					          	{renderDesignation}
					         </Select>
				          )}
				        </FormItem>

				        <FormItem>
				          {getFieldDecorator('gender', {
				            rules: [{ required: true, message: 'Please input designation of user!' }],
				            initialValue : userDetail.result.lastName
				          })(
					          <Select >
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
				    </Form>: 
			  			''
				      }
				    hjkhhk************
				    {projectName}
			        </Modal>
		)
	}
}
const EditUser = Form.create()(EditUserDetailView);
export default connect(
state => {
		return ({
			userRole : state.user.data.userRole[0],
			userDetail : state.user.data.userDetail[0]
		})
	}
)(EditUser)