import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from "react-router-dom";
import { Form, Input, Button } from 'antd';

import * as api from './../../data/ResetPasswordView/api';
import './ResetPassword.css';

const FormItem = Form.Item;

class ResetPassword extends Component{
	
	constructor(props){
		super(props);

		console.log(this.props, "this props");
		this.handleSubmit = this.handleSubmit.bind(this);
		this.checkPassword = this.checkPassword.bind(this);
		this.checkConfirm = this.checkConfirm.bind(this);

		this.state = {
		    confirmDirty: false,
	    };
	}

	// This method is used to reset the password
	handleSubmit (e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values, this.props.history);
		    this.props.dispatch(api.ResetPasswordApi(values, this.props.match.params.token))
		    this.props.form.resetFields();
			this.props.history.push('/login');
		  }
		});
	}

	// This method is used to check whether the confirm password is same to password
	checkPassword(rule, value, callback)  {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
		  callback('Two passwords that you enter is inconsistent!');
		} else {
		  callback();
		}
	}

	// This method is used to heck whether the password is same to comfirm password field
	checkConfirm (rule, value, callback) {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
		  form.validateFields(['confirm'], { force: true });
		}
		callback();
	}

	render(){
		const { getFieldDecorator } = this.props.form;

		return(
			<div className = 'reset-password-container'>
				<Form onSubmit = { this.handleSubmit } className = "reset-password">
					<p className = 'heading-style reset-password-heading'> Reset Password </p>
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
			        	<Button type="primary" htmlType="submit" className="login-form-button">
			           	 Reset Password
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

const ResetPasswordForm = Form.create()(ResetPassword);

export default connect()(withRouter(ResetPasswordForm));
