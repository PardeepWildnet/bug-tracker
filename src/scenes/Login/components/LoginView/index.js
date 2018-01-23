import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
import { withRouter } from "react-router-dom";
import { NavLink } from 'react-router-dom';

import Loader from './../../../Loader';
import * as loginAPI from './../../data/LoginView/api';
import './Login.css';
import './Loader.css';

console.clear();
const FormItem = Form.Item;

class LoginView extends Component{
	constructor(props){
		super(props);
		localStorage.setItem('loader', false);
	}

	componentWillReceiveProps = (nextProps, nextState) => {
		console.log("After Login ", nextProps.loginState)
		if(
			nextProps.loginState[nextProps.loginState.length - 1] &&
			nextProps.loginState[nextProps.loginState.length - 1].data &&
			nextProps.loginState[nextProps.loginState.length - 1].data.status == 200
		){
			this.props.history.push('/dashboard');
			console.log("After Login in componentWillReceiveProps ");
			this.forceUpdate();
		}
	}

	// This method id used to login the user
	handleSubmit = (e) => {
		e.preventDefault();
		localStorage.setItem('loader', true);
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
			form : { getFieldDecorator },
			loginState
		} = this.props;

		return(
			<div className = 'login-container'>
				<div className = 'title-img-container'>
					<img src={require("./../../../../Assets/logo.jpg")} role="presentation" className = 'title-img-style' />
				</div>
				{ localStorage.getItem('loader') == 'true' ? <div className="loading" v-if='loader'></div> : ''}
				<Form onSubmit = { this.handleSubmit } className = "login">
					<p className = 'heading-style login-heading'> Login</p>
			        <FormItem>
			          {getFieldDecorator('email', {
			            rules: [{type: 'email', message: 'The input is not valid E-mail!' }, {
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
	state => {
		return ({
			loginState: state.login.data.loginview
		})
	}
)(withRouter(LoginViewForm));
