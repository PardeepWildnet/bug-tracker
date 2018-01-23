import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { NavLink } from 'react-router-dom';

import * as signUpApi from './../../data/SignUpView/api';
import './SignUp.css'
const FormItem = Form.Item;

class SignUpView extends Component {
	constructor(props){
		super(props);
		this.state = { confirmDirty: false };
	}

	// This method is used to register the admin
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values, this.props.history);
		    this.props.dispatch(signUpApi.SignUpAPI(values))
		    this.props.form.resetFields();
		  }
		});
	}

	// This method is used to check whether the confirm password is same to password
	checkPassword = (rule, value, callback) => {
	    const form = this.props.form;
	    if (value && value !== form.getFieldValue('password')) {
	      callback('Two passwords that you enter is inconsistent!');
	    } else {
	      callback();
	    }
	}

	// This method is used to heck whether the password is same to comfirm password field
	checkConfirm = (rule, value, callback) => {
	    const form = this.props.form;
	    if (value && this.state.confirmDirty) {
	      form.validateFields(['confirm'], { force: true });
	    }
	    callback();
	}

	render(){
		const { getFieldDecorator } = this.props.form;

		return(
			<div className = 'signup-container'>
				<div className = 'title-img-container'>
					<img src={require("./../../../../Assets/logo.jpg")} role="presentation" className = 'title-img-style' />
				</div>
				<Form onSubmit = { this.handleSubmit } className = "signup">
					<p className = 'heading-style sign-up-heading'> Sign Up </p>
			        <FormItem>
			          {
			          	getFieldDecorator('firstName', {
			            	rules: [
			            		{ required: true, message: 'Please input your First Name!' }
			            	]
			          	})(
		            		<Input placeholder="First Name" />
			          	)}
			        </FormItem>

			        <FormItem>
			          {
			          	getFieldDecorator('lastName', {
			            	rules: [
			            		{ required: true, message: 'Please input your Last Name!' }
			            	]
			          	})(
		            		<Input placeholder="Last Name" />
			          	)}
			        </FormItem>

			        <FormItem>
			          {getFieldDecorator('email', {
			            rules: [{
			              type: 'email', message: 'The input is not valid E-mail!',
			            }, {
			              required: true, message: 'Please input your E-mail!',
			            }],
			          })(
		            		<Input placeholder="Email" />
			          	)}
			        </FormItem>

			        <FormItem hasFeedback>
			          {getFieldDecorator('password', {
			            rules: [{
			              required: true, message: 'Please input your password!',
			            }, {
			              validator: this.checkConfirm,
			            }],
			          })(
			            <Input type="password" placeholder = "Enter Password"/>
			          )}
			        </FormItem>

			        <FormItem hasFeedback >
			          {getFieldDecorator('confirm', {
			            rules: [{
			              required: true, message: 'Please confirm your password!',
			            }, {
			              validator: this.checkPassword,
			            }],
			          })(
			            <Input type="password" onBlur={this.handleConfirmBlur} placeholder = "Confirm Password"/>
			          )}
			        </FormItem>

			        <FormItem>
				        <Button type="primary" htmlType="submit" className="login-form-button">
			          		Sign Up
			          	</Button>
        			  	<NavLink to="/login" className = 'list-group-item-signIn'>
        			  		Login
        			  	</NavLink>
			        </FormItem>

			    </Form>
			</div>
		)
	}
}

const SignUpViewForm = Form.create()(SignUpView);

export default connect()(SignUpViewForm);
