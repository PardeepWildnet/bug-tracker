import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';

import * as api from './../../data/EditProfileView/api';
const FormItem = Form.Item;

class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	} 

	handleSubmit (e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values, this.props.history);
		    this.props.dispatch(api.EditProfileAPI(values))
		    this.props.form.resetFields();
			this.props.history.push('/dashboard');
		  }
		});
	}

	componentWillReceiveProps(nextProps, nextState){
		console.log("After Login ", nextProps.loginState);
		/*if(nextProps.loginState.length && nextProps.loginState[0].data.status === 200){
			console.log("After Login in componentWillReceiveProps ");
			this.forceUpdate();
		}*/
	}

	render(){
		const { 
			getFieldDecorator 
		} = this.props.form;

		return(
			<Form onSubmit = { this.handleSubmit } className = "login">
				<p className = 'heading-style sign-up-heading'> Edit Profile </p>
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
		            <Button type="primary" htmlType="submit" className="login-form-button">
		          		SAVE
		          	</Button>
		        </FormItem>

		    </Form>
		)
	}
}

const EditProfileView = Form.create()(EditProfile);

export default connect(

)(withRouter(EditProfileView));