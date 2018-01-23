import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Radio, Icon, Modal, Form, Input, Select, Upload } from 'antd';

import * as userRoleApi from './../../data/UserRole/api';
import * as editUserApi from './../../data/EditUser/api';
import Loader from './../../../Loader';
import * as api from './../../data/UserDetail/api';
import './UserDetail.css';

const FormItem = Form.Item;
const Option = Select.Option;

class UserDetailView extends Component {
	checkVisibility = false;
	constructor(props){
		super(props);
		this.state = { visible: false }
	}

	componentWillMount() {
		this.props.dispatch(userRoleApi.userRole());
		this.props.dispatch(api.fetchUserDetail(this.props.match.params.id));
	}

	componentWillReceiveProps(nextProps, nextState){
		if(nextProps.editUser && nextProps.editUser.status === 200 && this.checkVisibility == false){
			this.setState({ visible: false });
		    this.props.form.resetFields();
				this.forceUpdate();
		}
	}

	// This method is used to show the user modal
	showModal = () => {
		this.setState({ visible: !this.state.visible });
		this.checkVisibility = true;
	}

	// This method is used to close the user modal
	handleCancel = () => {
		this.setState({ visible: false });
		this.checkVisibility = false;
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values);
		    this.props.dispatch(editUserApi.editUserDetails(values, this.props.match.params.id))
				this.checkVisibility = false;
				this.props.history.push('/dashboard/user');
		  }
		});
	}

	render () {
		const { visible } = this.state;

		const {
			userDetail,
			role,
			editUser,
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

		return (
			<div className = 'user-detail-view'>
				<p className = 'heading-style user-style'> User Detail </p>
				<table className='table table-striped table-view'>
					<tbody>
						<tr>
								<th>Title</th>
								<th>Description</th>
						</tr>
					</tbody>
				    {userDetail ?
			  			<tbody>
				  			<tr>
				  				<td>Name : </td>
				  				<td>{userDetail.result.firstName}  {userDetail.result.lastName}</td>
				  			</tr>
							<tr>
				  				<td>Email :</td>
				  				<td>{userDetail.result.email}</td>
				  			</tr>
							<tr>
				  				<td>Gender :</td>
				  				<td>{userDetail.result.gender}</td>
				  			</tr>

				  			<tr>
				  				<td>Designation :</td>
				  				<td>{userDetail.result.accountType}</td>
				  			</tr>

			  				<tr>
				  				<td colSpan = '2'>
				  					<Button type="primary"  icon="plus-circle-o" onClick={this.showModal} >Edit User</Button>
				  				</td>
				  			</tr>
				  		</tbody> :
			  			<tbody>
			  				<tr>
								<td colspan = '2'>
									<Loader />
								</td>
							</tr>
			  			</tbody>
					}
   				</table>

		        <Modal title="Edit User Details"
		          visible={visible}
		          onCancel={this.handleCancel}
		          footer={[]}
		        >
		        { userDetail ?
					  <Form onSubmit = { this.handleSubmit }>
					    <FormItem>
					      {
					      	getFieldDecorator('Fname', {
					         rules: [{ required: true, message: 'Please input First name!' }],
					         initialValue : userDetail.result.firstName

					      })(
					    		<Input />
					      )}
					    </FormItem>

						<FormItem>
					      {
					      	getFieldDecorator('Lname', {
					         rules: [{ required: true, message: 'Please input Last name!' }],
					         initialValue : userDetail.result.lastName

					      })(
					    		<Input/>
					      )}
					    </FormItem>

						<FormItem>
					      {
					      	getFieldDecorator('email', {
					         rules: [{ required: true, message: 'Please input email!' }],
					         initialValue : userDetail.result.email

					      })(
					    		<Input  />
					      )}
					    </FormItem>

					    <FormItem>
					      {getFieldDecorator('designation', {
					        rules: [{ required: true, message: 'Please input designation of user!' }],
					         initialValue : userDetail.result.accountType
					      })(
					          <Select >
					          	{renderDesignation}
					         </Select>
					      )}
					    </FormItem>

					    <FormItem>
					      {getFieldDecorator('gender', {
					        rules: [{ required: true, message: 'Please input designation of user!' }],
					         initialValue : userDetail.result.gender
					      })(
					          <Select >
					          		<Option value="Male">Male</Option>
									<Option value="Female">Female</Option>
					         </Select>
					      )}
					    </FormItem>

					    <FormItem>
					      <Button type="primary" htmlType="submit" className="login-form-button">
					        SAVE
					      </Button>
					    </FormItem>
					</Form> : ''
				}

		        </Modal>
			</div>
		)
	}
}
const UserDetail = Form.create()(UserDetailView);

export default connect(
	state => {
		return ({
			editUser : state.user.data.editUser[state.user.data.editUser.length - 1],
			userDetail : state.user.data.userDetail[state.user.data.userDetail.length - 1],
			role : state.user.data.userRole[0]
		})
	}
)(UserDetail);
