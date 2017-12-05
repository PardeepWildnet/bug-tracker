import React, { Component } from 'react';
import { Button, Radio, Icon, Modal, Form, Input, Select, Upload } from 'antd';
import { connect } from 'react-redux';

import * as api from './../../data/AddUser/api';
import designation from './../../../../Assets/designationList.json';
import './AddUser.css';

const FormItem = Form.Item;
const Option = Select.Option;

class AddUserView extends Component {
	constructor(props){
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.showModal = this.showModal.bind(this);
		this.handleCancel = this.handleCancel.bind(this);

		this.state = {
			visible: false,
			teams : [], 
		}
	}


	// This method is called after getting any props
	componentWillReceiveProps(nextProps, nextState){
		if(nextProps.addUser && nextProps.addUser.status === 200){
			this.setState({
		    	visible: false,
		    });
		    this.props.form.resetFields();
			this.forceUpdate();
		}
	}

	// This method is used to add user model
	showModal() {
		this.setState({
		  visible: !this.state.visible,
		});
	}

	// This method is used to cancel the modal
	handleCancel() {
		console.log('Clicked cancel button');
		this.setState({
		  visible: false,
		});
	}

	// This method is used to add user
	handleSubmit (e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values);
		    this.props.dispatch(api.addUser(values))
		  }
		});
	}

	render(){
		const { 
			visible, 
			ModalText,
		} = this.state;

		const { 
			role,
			addUser,
			form : { getFieldDecorator }
		} = this.props;

		const renderDesignation =  role ? role.result.map((item) => (
	    	<Option 
	    		value={ item.roleName } 
	    		key = { item.roleId }
	    	>
	    		{ item.roleName }
	    	</Option>
	    )) : '';

		return(
			<div className = 'add-project-container'>
				<Button type="primary"  icon="plus-circle-o" onClick={this.showModal} >Add User</Button>
		        <Modal title="Add User"
		          visible={visible}
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

					    <FormItem>
					      {getFieldDecorator('gender', {
					        rules: [{ required: true, message: 'Please input designation of user!' }],
					      })(
					          <Select placeholder="Select Gender">
					          		<Option value="Male">Male</Option>
									<Option value="Female">Female</Option>
					         </Select>
					      )}
					    </FormItem>

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
	state => {
		return ({
			addUser : state.user.data.addUser[state.user.data.addUser.length - 1],
		})
	}
)(AddUser);
