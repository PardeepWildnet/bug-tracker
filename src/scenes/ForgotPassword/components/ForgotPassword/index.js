import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { NavLink } from 'react-router-dom';

import * as api from './../../data/ForgotPasswordView/api';
import './ForgotPassword.css';

const FormItem = Form.Item;

class ForgotPassword extends Component{
	
	constructor(props){
		super(props);
		localStorage.setItem('isNavBar','hide');
		this.handleSubmit = this.handleSubmit.bind(this);
		console.log(this.props, "this props")
	}

	handleSubmit (e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values, this.props.history);
		    this.props.dispatch(api.ForgotPasswordApi(values))
		    this.props.form.resetFields();
		  }
		});
	}

	render(){
		const { 
			getFieldDecorator, 
			loginState 
		} = this.props.form;

		return(
			<div>
				<p className = 'heading-style forgot-password-heading'> Forgot Password </p>
				<Form onSubmit = { this.handleSubmit } className = "forgot-password">
			        <FormItem>
			          {
			          	getFieldDecorator('email', {
			            	rules: [{ required: true, message: 'Please input your email!' }]
			          	})(
		            		<Input placeholder="Enter Email" />
			          	)}
			        </FormItem>

		        <FormItem>
			        <Button type="primary" htmlType="submit" className="login-form-button">
			            Forgot Password
			        </Button>
	        		<NavLink to="/" className = 'list-group-item-signIn'>
		        	   Back
		        	</NavLink>
		        </FormItem>
			    </Form>
			</div>
		)
	}
}

const ForgotPasswordForm = Form.create()(ForgotPassword);

export default connect(
	
)(ForgotPasswordForm);
