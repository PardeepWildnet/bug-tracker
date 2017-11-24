import React, { Component } from 'react';
import { Button, Radio, Icon, Modal, Form, Input, Select, Upload } from 'antd';
import { connect } from 'react-redux';

import * as api from './../../data/AddUser/api';
import designation from './../../../../Assets/designationList.json';
import './AddUser.css';

const FormItem = Form.Item;
const Option = Select.Option;
// const {  RangePicker } = DatePicker;

class AddUserView extends Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			visible: false,
			confirmLoading: false,
			teams : [], 
			fileList: [],
		}
	}

	showModal = () => {
		this.setState({
		  visible: !this.state.visible,
		});
	}

	handleCancel = () => {
		console.log('Clicked cancel button');
		this.setState({
		  visible: false,
		});
	}

	handleSubmit (e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values);
		    this.props.dispatch(api.addUser(values, this.state.fileList))
		    this.props.form.resetFields();
		    this.setState({
			  visible: !this.state.visible,
			});
		  }
		});
	}

	render(){
		const { 
			visible, 
			confirmLoading, 
			ModalText 
		} = this.state;

		const { 
			getFieldDecorator 
		} = this.props.form;

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
		    listType: 'picture',
			beforeUpload: (file) => {
				this.setState(({ fileList }) => ({
				  fileList: [...fileList, file],
				}));
				return false;
			},
	        fileList: this.state.fileList,
	       
	    };
		 const renderDesignation = designation.map((item) => (
	    	<Option 
	    		value={ item.position } 
	    		key = { item.id }
	    	>
	    		{ item.position }
	    	</Option>
	    ));


		return(
			<div className = 'add-project-container'>
				<Button type="primary"  icon="plus-circle-o" onClick={this.showModal} >Add User</Button>
			        <Modal title="Add User"
			          visible={visible}
			          confirmLoading={confirmLoading}
			          onCancel={this.handleCancel}
			          footer={[]}
			        >
			          <Form onSubmit = { this.handleSubmit }>


				        <FormItem>
				          {
				          	getFieldDecorator('Fname', {
				             rules: [{ required: true, message: 'Please input First name!' }]
				          })(
			            		<Input placeholder="First Name" />
				          )}
				        </FormItem>
	   					<FormItem>
				          {
				          	getFieldDecorator('Lname', {
				             rules: [{ required: true, message: 'Please input Last name!' }]
				          })(
			            		<Input placeholder="Last Name" />
				          )}
				        </FormItem>
	
	   					<FormItem>
				          {
				          	getFieldDecorator('email', {
				             rules: [{ required: true, message: 'Please input email!' }]
				          })(
			            		<Input placeholder="Email" />
				          )}
				        </FormItem>
	
				        <FormItem>
				          {getFieldDecorator('designation', {
				            rules: [{ required: true, message: 'Please input designation of user!' }],
				          })(
					          <Select placeholder="Select designation">
					            {renderDesignation}
					         </Select>
				          )}
				        </FormItem>
	
						<Upload {...props}>
							<Button>
								<Icon type="upload" /> Select File
							</Button>
						</Upload>
						
				        <FormItem>
				          <Button type="primary" htmlType="submit" className="login-form-button">
				            SUBMIT
				          </Button>
				        </FormItem>
				    </Form>

			        </Modal>
			</div>
		)
	}
}

const AddUser = Form.create()(AddUserView);
export default connect(

)(AddUser);
