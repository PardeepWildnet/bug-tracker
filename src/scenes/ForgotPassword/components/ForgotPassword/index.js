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
		this.handleSubmit = this.handleSubmit.bind(this);
		localStorage.setItem('isNavBar','hide');
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
				<Form onSubmit = { this.handleSubmit } className = "forgot-password">
					<p className = 'heading-style forgot-password-heading'> Forgot Password </p>
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
