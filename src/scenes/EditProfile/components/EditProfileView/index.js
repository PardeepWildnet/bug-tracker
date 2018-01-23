import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Upload, Icon } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';

import * as config from './../../../../config';
import * as imageApi from './../../data/UploadImage/api';
import * as api from './../../data/EditProfileView/api';

const FormItem = Form.Item;

console.clear();

class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = { fileList: [] }
	}

	// This method is used to edit profile of admin
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values, this.props.history);
		    this.props.dispatch(imageApi.UploadImageAPI(values, this.state.fileList))
		    this.props.dispatch(api.EditProfileAPI(values, this.state.fileList))
		    this.props.form.resetFields();
		  }
		});
	}

 	normFile = (e) => {
	    console.log('Upload event: in norm file', e);
	    if (Array.isArray(e)) {
	      return e;
	    }
	    this.setState({
	    	fileList : e.fileList
	    })
	    return e && e.fileList;
	}

 	imageUpload = (e) => {
	    console.log('Upload event:', e);
	}

	render(){
		const { getFieldDecorator } = this.props.form;

		 const props = {
	    	onRemove: (file) => {
		        this.setState(({ fileList }) => {
		          const index = fileList.indexOf(file);
		          const newFileList = fileList.slice();
		          newFileList.splice(index, 1);
		          return {
		            fileList: newFileList,
		          };
		        });
		      },

			beforeUpload: (file) => {
				return false;
			},
	    };

		return(
			<Form onSubmit = { this.handleSubmit } className = "login">
				<p className = 'heading-style sign-up-heading'> Edit Profile </p>

		        <FormItem>
		          {getFieldDecorator('upload', {
		            valuePropName: 'fileList',
		            getValueFromEvent: this.normFile,
		          })(
		            <Upload {...props}>
		              <Button>
		                <Icon type="upload" /> Click to upload
		              </Button>
		            </Upload>
		          )}
		        </FormItem>

		        <FormItem>
		          {
		          	getFieldDecorator('firstName', {
		            	rules: [
		            		{ required: true, message: 'Please input your First Name!' }
		            	],
		            	initialValue : config.userInfo.data.data.firstName
		          	})
		          	(
	            		<Input />
		          	)
		          }
		        </FormItem>

		        <FormItem>
		          {
		          	getFieldDecorator('lastName', {
		            	rules: [
		            		{ required: true, message: 'Please input your Last Name!' }
		            	],
		            	initialValue : config.userInfo.data.data.lastName
		          	})
		          	(
	            		<Input  />
		          	)
		          }
		        </FormItem>

		        <FormItem>
		          {
		          	getFieldDecorator('email', {
		            	rules: [
		            		{ required: true, message: 'Please input your email!' }
		            	],
		            	initialValue : config.userInfo.data.data.email
		          	})
		          	(
	            		<Input />
		          	)
		          }
		        </FormItem>

		        <FormItem>
		          {
		          	getFieldDecorator('accountType', {
		            	rules: [
		            		{ required: true, message: 'Please input your accountType!' }
		            	],
		            	initialValue : config.userInfo.data.data.accountType
		          	})
		          	(
	            		<Input />
		          	)
		          }
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

export default connect()(withRouter(EditProfileView));
