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
		this.handleSubmit = this.handleSubmit.bind(this);
		console.log(this.props, "this props");
		const token = this.props.match.params.token;
		console.log ("token is :- ", token);
		localStorage.setItem('isNavBar','hide');
		this.state = {
		    confirmDirty: false,
	    };
	}

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
			getFieldDecorator, 
		} = this.props.form;

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

export default connect(
	
)(withRouter(ResetPasswordForm));
