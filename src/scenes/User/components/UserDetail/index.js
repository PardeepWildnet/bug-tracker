import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Radio, Icon, Modal, Form, Input, Select, Upload } from 'antd';

import * as userRoleApi from './../../data/UserRole/api';
import * as editUserApi from './../../data/EditUser/api';
import * as api from './../../data/UserDetail/api';
import './UserDetail.css';

const FormItem = Form.Item;
const Option = Select.Option;

class UserDetailView extends Component {
	constructor(props){
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.showModal = this.showModal.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		
		this.state = {
			visible: false,
		}
	}

	componentWillMount() {
		this.props.dispatch(userRoleApi.userRole());
		this.props.dispatch(api.fetchUserDetail(this.props.match.params.id));
	}


	showModal() {
		this.setState({
		  visible: !this.state.visible,
		}, function () {
			console.log("show modal button ", this.state.visible);
		});
	}

	componentWillReceiveProps(nextProps, nextState){
		console.log("After Login ", nextProps.userDetail)
		if(nextProps.userDetail && nextProps.userDetail.status === 200){
			this.setState({
		    	visible: false,
		    });
			this.forceUpdate();
		}
	}

	handleCancel() {
		this.setState({
		  visible: false,
		}, function() {
			console.log('Clicked cancel button');
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    console.log('Received values of form: ', values);
		    this.props.dispatch(editUserApi.editUserDetails(values, this.props.match.params.id))
		    this.props.form.resetFields();
		  }
		});
	}

	render () {
		const { visible } = this.state;

		const {
			userDetail,
			role
		} = this.props;

		const renderDesignation =  role ? role.result.map((item) => (
	    	<Option 
	    		value={ item.roleName } 
	    		key = { item.roleId }
	    	>
	    		{ item.roleName }
	    	</Option>
	    )) : '';
	    
	    const { 
			getFieldDecorator 
		} = this.props.form;

		return (
			<div className = 'user-detail-view'>
				<p className = 'heading-style user-style'> User Detail </p>
				<table className='table table-striped table-responsive table-view'>
					<tbody>
						<tr>
								<th>Key</th>
								<th>Value</th>
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
			  			<tbody></tbody>
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
			userDetail : state.user.data.userDetail[state.user.data.userDetail.length - 1],
			role : state.user.data.userRole[0]
		})
	}
)(UserDetail);
