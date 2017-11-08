import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { withRouter, Route } from "react-router-dom";
import { NavLink } from 'react-router-dom';

import * as loginAPI from './../../data/LoginView/api';
import './Login.css';

const FormItem = Form.Item;

class LoginView extends Component{
	
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		console.log(this.props, "this props")
	}

	handleSubmit (e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values, this.props.history);
		    this.props.dispatch(loginAPI.LoginAPI(values))
		    this.props.form.resetFields();
		  }
		});
	}

	componentWillReceiveProps(nextProps, nextState){
		console.log("After Login ", nextProps.loginState);
		if(nextProps.loginState.length && nextProps.loginState[0].data.status_code == 200){
			console.log("After Login in componentWillReceiveProps ");
			this.props.history.push('/dashboard');
		}
	}

	render(){
		const { 
			getFieldDecorator, 
			loginState 
		} = this.props.form;

		return(
			<div>
				<Form onSubmit = { this.handleSubmit } className = "login">
			        <FormItem>
			          {
			          	getFieldDecorator('email', {
			            	rules: [{ required: true, message: 'Please input your username!' }]
			          	})(
		            		<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
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
			          {
			          	getFieldDecorator('remember', {
			            valuePropName: 'checked',
			            initialValue: false,
			          })(
			            <Checkbox>Remember me</Checkbox>
			          )}
			          <a className="login-form-forgot" href="">Forgot password</a>
			          <Button type="primary" htmlType="submit" className="login-form-button">
			            Log in
			          </Button>Or &nbsp;
        			  <NavLink to="/sign-up" className = 'list-group-item-signIn'>
        			  	Register now
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