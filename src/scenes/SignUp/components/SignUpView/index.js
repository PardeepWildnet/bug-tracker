import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { NavLink } from 'react-router-dom';

import * as signUpApi from './../../data/SignUpView/api';
const FormItem = Form.Item;

class SignUpView extends Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		console.log(this.props, "this props")
		this.state = {
		    confirmDirty: false,
	    };
	}

	handleSubmit (e) {
		e.preventDefault();
		debugger
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values, this.props.history);
		    this.props.dispatch(signUpApi.SignUpAPI(values))
		    message.success('Please verify your email first');
		    this.props.form.resetFields();
		  }
		});
	}

	checkPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
		  callback('Two passwords that you enter is inconsistent!');
		} else {
		  callback();
		}
	}

	checkConfirm = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
		  form.validateFields(['confirm'], { force: true });
		}
		callback();
	}

	render(){
		const { 
			getFieldDecorator 
		} = this.props.form;

		return(
			<div>
				<p className = 'heading-style'> Sign Up </p>
				<Form onSubmit = { this.handleSubmit } className = "login">
			        <FormItem>
			          {
			          	getFieldDecorator('firstName', {
			            	rules: [
			            		{ required: true, message: 'Please input your First Name!' }
			            	]
			          	})
			          	(
		            		<Input placeholder="First Name" />
			          	)
			          }
			        </FormItem>

			        <FormItem>
			          {
			          	getFieldDecorator('lastName', {
			            	rules: [
			            		{ required: true, message: 'Please input your Last Name!' }
			            	]
			          	})
			          	(
		            		<Input placeholder="Last Name" />
			          	)
			          }
			        </FormItem>
	
			        <FormItem>
			          {
			          	getFieldDecorator('email', {
			            	rules: [
			            		{ required: true, message: 'Please input your email!' }
			            	]
			          	})
			          	(
		            		<Input placeholder="Email" />
			          	)
			          }
			        </FormItem>

			        <FormItem>
			          {
			          	getFieldDecorator('password', {
				            rules: [{
				              required: true, message: 'Please input your password!',
				            }, {
				              validator: this.checkConfirm,
				            }],
			          })(
			            	<Input type="password" placeholder = "Password"/>
			          )}
			        </FormItem>

			        <FormItem>
			          {
			          	getFieldDecorator('confirm', {
				            rules: [{
				              required: true, message: 'Please confirm your password!',
				            }, {
				              validator: this.checkPassword,
				            }],
				        })(
				            <Input type="password" onBlur={this.handleConfirmBlur} placeholder = 'Confirm Password'/>
			          )}
			        </FormItem>

			    	 <FormItem>
			          {
			          	getFieldDecorator('remember', {
			            valuePropName: 'checked',
			          })}
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