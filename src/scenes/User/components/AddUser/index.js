import React, { Component } from 'react';
import { Button, Radio, Icon, Modal, Form, Input, Select, Upload } from 'antd';
import { connect } from 'react-redux';

import * as api from './../../data/AddUser/api';
import * as searchAllApi from './../../data/UserList/api';
import * as serachApi from './../../data/SearchByRole/api';
import designation from './../../../../Assets/designationList.json';
import './AddUser.css';

const FormItem = Form.Item;
const Option = Select.Option;

class AddUserView extends Component {
	searchedRole = '';
	constructor(props){
		super(props);

		this.SearchByRole = this.SearchByRole.bind(this);
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
		if(nextProps.addUser && nextProps.addUser.status === 200 && this.checkVisibility == false){
			this.setState({ visible: false });
	    this.props.form.resetFields();
			this.forceUpdate();
		}
	}

	// This method is used to show the add user modal
	showModal = () => {
		this.setState({ visible: !this.state.visible });
		this.checkVisibility = true;
	}

	// This method is used to close the add user modal
	handleCancel = () => {
		this.setState({ visible: false });
		this.checkVisibility = false;
	}

	SearchByRole = (value) => {
		console.log(`selected ${value}`);
		this.searchedRole = value;
		if(value == "All") {
			this.props.dispatch(searchAllApi.fetchUserList(1))
		}
		else {
			this.props.dispatch(serachApi.serachByRoles(value, 1))
		}
		this.props.SearchByRole(value);
	}

	// This method is used to add user
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values);
		    this.props.dispatch(api.addUser(values))
				this.checkVisibility = false;
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
				<Button type="primary"  icon="plus-circle-o" onClick={this.showModal} className = 'add-btn-style'>Add User</Button> <br />
				<p className = 'search-heading-style'> Search By Role </p>

				<Select placeholder="Search By Roles" className = 'search-by-role' onChange = {this.SearchByRole}>
					<Option
			    		value= 'All'
			    		key = ''
			    	>
			    		All
	    			</Option>
		          	{renderDesignation}
		        </Select><br />

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
								{getFieldDecorator('email', {
									rules: [{type: 'email', message: 'The input is not valid E-mail!' }, {
										required: true, message: 'Please input your E-mail!',
									}],
								})(
						    		<Input placeholder="Email" />
						      )}
						    </FormItem>

						    <FormItem>
						      {getFieldDecorator('designation', {
						        rules: [{ required: true, message: 'Please input designation of user!' }],
						      })(
						          <Select placeholder="Select Designation">
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
													<Option value="Others">Others</Option>
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
