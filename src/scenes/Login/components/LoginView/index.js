import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
import { withRouter } from "react-router-dom";
import { NavLink } from 'react-router-dom';

import * as loginAPI from './../../data/LoginView/api';
import './Login.css';

console.clear();
const FormItem = Form.Item;

class LoginView extends Component{
	constructor(props){
		super(props);
	}

	componentWillReceiveProps = (nextProps, nextState) => {
		console.log("After Login ", nextProps.loginState)
		if(nextProps.loginState.length && nextProps.loginState[0].data.status === 200){
			this.props.history.push('/dashboard');
			console.log("After Login in componentWillReceiveProps ");
			this.forceUpdate();
		}
	}

	// This method id used to login the user
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values, this.props.history);
		    this.props.dispatch(loginAPI.LoginAPI(values))
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
			<div className = 'login-container'>
				<Form onSubmit = { this.handleSubmit } className = "login">
					<p className = 'heading-style login-heading'> Login</p>
			        <FormItem>
			          {getFieldDecorator('email', {
			            rules: [{
			              type: 'email', message: 'The input is not valid E-mail!',
			            }, {
			              required: true, message: 'Please input your E-mail!',
			            }],
			          })(
		            		<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Email" />
			          	)}
			        </FormItem>

					<FormItem>
					  {
					  	getFieldDecorator('password', {
					    rules: [{ required: true, message: 'Please input your Password!' }],
					  })(
					    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
					  )}
					</FormItem>

			        <FormItem>
        			  <NavLink to="/forgot-password" className = 'list-group-item-signIn'>
			           	Forgot Password
			          </NavLink>
			          <Button type="primary" htmlType="submit" className="login-form-button">
			            Login
			          </Button>
        			  <NavLink to="/sign-up" className = 'list-group-item-signIn'>
        			  	Register Now
        			  </NavLink>
			        </FormItem>
			    </Form>
			</div>
		)
	}
}

const LoginViewForm = Form.create()(LoginView);

export default connect(
	state => ({
		loginState: state.login.data.loginview
	})
)(withRouter(LoginViewForm));
