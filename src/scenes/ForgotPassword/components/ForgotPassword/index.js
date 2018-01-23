import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { NavLink } from 'react-router-dom';

import * as api from './../../data/ForgotPasswordView/api';
import './ForgotPassword.css';

const FormItem = Form.Item;

class ForgotPassword extends Component{

	// This method is used to handle forgot password api
	handleSubmit = (e) => {
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
		const { getFieldDecorator } = this.props.form;

		return(
			<div className = 'forgot-password-container'>
				<div className = 'title-img-container'>
					<img src={require("./../../../../Assets/logo.jpg")} role="presentation" className = 'title-img-style' />
				</div>
				<Form onSubmit = { this.handleSubmit } className = "forgot-password">
					<p className = 'heading-style forgot-password-heading'> Forgot Password </p>
			        <FormItem>
			          {
			          	getFieldDecorator('email', {
			              rules: [{ required: true, message: 'Please input your Email!' }]
			          	}, {
			              type: 'email', message: 'The input is not valid E-mail!',
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
