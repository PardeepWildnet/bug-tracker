import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

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
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values, this.props.history);
		    this.props.dispatch(signUpApi.SignUpAPI(values))
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
		const { getFieldDecorator } = this.props.form;

		return(
			<div>
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
			            		{ required: true, message: 'Please input your username!' }
			            	]
			          	})
			          	(
		            		<Input placeholder="email" />
			          	)
			          }
			        </FormItem>

			        <FormItem
			          label="Password"
			          hasFeedback
			        >
			          {getFieldDecorator('password', {
			            rules: [{
			              required: true, message: 'Please input your password!',
			            }, {
			              validator: this.checkConfirm,
			            }],
			          })(
			            <Input type="password" />
			          )}
			        </FormItem>

			        <FormItem
			          label="Confirm Password"
			          hasFeedback
			        >
			          {getFieldDecorator('confirm', {
			            rules: [{
			              required: true, message: 'Please confirm your password!',
			            }, {
			              validator: this.checkPassword,
			            }],
			          })(
			            <Input type="password" onBlur={this.handleConfirmBlur} />
			          )}
			        </FormItem>

			        <FormItem>
			          {
			          	getFieldDecorator('remember', {
			            valuePropName: 'checked',
			            initialValue: true,
			          })(
			            <Checkbox>Remember me</Checkbox>
			          )}
			          <Button type="primary" htmlType="submit" className="login-form-button">
			            Sign Up
			          </Button>
			        </FormItem>
			    </Form>
			</div>
		)
	}
}

const SignUpViewForm = Form.create()(SignUpView);

export default connect()(SignUpViewForm);