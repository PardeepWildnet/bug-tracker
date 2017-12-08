import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';

import * as config from './../../../../config';
import * as api from './../../data/EditProfileView/api';

const FormItem = Form.Item;

console.clear();

class EditProfile extends Component {
	constructor(props) {
		super(props);
		
		this.handleSubmit = this.handleSubmit.bind(this);
	} 

	// This method id used to edit profile of admin
	handleSubmit (e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values, this.props.history);
		    this.props.dispatch(api.EditProfileAPI(values))
		    this.props.form.resetFields();
		  }
		});
	}

	render(){
		const { getFieldDecorator } = this.props.form;

		return(
			<Form onSubmit = { this.handleSubmit } className = "login">
				<p className = 'heading-style sign-up-heading'> Edit Profile </p>
		        <FormItem>
		          {
		          	getFieldDecorator('firstName', {
		            	rules: [
		            		{ required: true, message: 'Please input your First Name!' }
		            	],
		            	initialValue : config.userInfo.data.data.firstName
		          	})
		          	(
	            		<Input />
		          	)
		          }
		        </FormItem>

		        <FormItem>
		          {
		          	getFieldDecorator('lastName', {
		            	rules: [
		            		{ required: true, message: 'Please input your Last Name!' }
		            	],
		            	initialValue : config.userInfo.data.data.lastName
		          	})
		          	(
	            		<Input  />
		          	)
		          }
		        </FormItem>

		        <FormItem>
		          {
		          	getFieldDecorator('email', {
		            	rules: [
		            		{ required: true, message: 'Please input your email!' }
		            	],
		            	initialValue : config.userInfo.data.data.email
		          	})
		          	(
	            		<Input />
		          	)
		          }
		        </FormItem>

		        <FormItem>
		          {
		          	getFieldDecorator('accountType', {
		            	rules: [
		            		{ required: true, message: 'Please input your accountType!' }
		            	],
		            	initialValue : config.userInfo.data.data.accountType
		          	})
		          	(
	            		<Input />
		          	)
		          }
		        </FormItem>

		    	 <FormItem>
		            <Button type="primary" htmlType="submit" className="login-form-button">
		          		SAVE
		          	</Button>
		        </FormItem>
		    </Form>
		)
	}
}

const EditProfileView = Form.create()(EditProfile);

export default connect()(withRouter(EditProfileView));