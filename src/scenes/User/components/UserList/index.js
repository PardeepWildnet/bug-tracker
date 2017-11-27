import React, { Component } from 'react';
import { Form, Affix, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as api from './../../data/UserList/api';
import * as userDeleteApi from './../../data/UserDelete/api';
import user from './../../../../Assets/userList.json';
// import * as api from './../../data/DeleteProject/api';
import EditUser from './../EditUserDetails';
// import './ProjectList.css'

const FormItem = Form.Item;

class UserListView extends Component {
	constructor(props) {
		super(props);
		this.editUser = this.editUser.bind(this);
		this.handlePageNumber = this.handlePageNumber.bind(this);
		this.deleteUser = this.deleteUser.bind(this);

		this.state = {
			visible : false,
			projectName : 'nmnm',
			projectCreatedBy : 'jhjhj',
			projectDetails : 'kjk',
			projectStartDate : '',
			projectEndDate : '',
		}
	}

	handlePageNumber (value) {
		this.props.dispatch(api.fetchUserList(value));
	}

	editUser (item) {
		console.log("inside edit project", item);
		if(item) {
			this.setState({
				visible : !this.state.visible,
				projectName : item.firstName ,
				projectCreatedBy : item.lastName , 
				projectDetails : item.email ,
				projectStartDate : item.gender ,
				projectEndDate : item.designation
			})
		}
		else {
			this.setState({
				visible : !this.state.visible
			})
		}
		this.forceUpdate();
    	console.log(this.state.visible, item);
	}

	deleteUser (item) {
		this.props.dispatch(userDeleteApi.deleteUser(item))
	}

	render(){
		const { 
			users , 
			userRole
		} = this.props;

		const { 
			getFieldDecorator 
		} = this.props.form;
		// console.log("user list", userRole ? userRole.data.result : userRole);

		return(

			<div>
				<div className = 'project-list-container'>
					<table className = 'table table-striped table-responsive'>
						<tbody>
							<tr>
								<th>S No.</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Email</th>
								<th>Action</th>
							</tr>
						</tbody>
					
						<tbody>
						{
							users ? 
							users.result.map((item, index) => (
									<tr key = {index}>
										<td>{index + 1} </td>
										<td>{item.firstName} </td>
										<td>{item.lastName} </td>
										<td>{item.email} </td>
										<td>
											<i className="fa fa-pencil icon-style" onClick = {() => this.editUser(item) } aria-hidden="true"></i>
											<Link to={'/dashboard/user/' + item.id }><i className="fa fa-eye icon-style" aria-hidden="true"></i></Link>
											<i className="fa fa-trash-o icon-style" onClick = {() => this.deleteUser(item) } aria-hidden="true"></i>
										</td>
									</tr>
							)) :
							<tr>
								<td colSpan = '5'>
									<img src={require("./../../../../Assets/loader.gif")} className = 'loader-style'/>
								</td>
							</tr>
						}
						</tbody>
					</table>
				</div>
				<FormItem>
			          {getFieldDecorator('editProjectDetails', {
		            	initialValue: { 
			            	projectName : this.state.projectName, 
			            	projectCreatedBy : this.state.projectCreatedBy,
			            	projectDetails : this.state.projectDetails, 
			            	projectStartDate : this.state.projectStartDate,
			            	projectEndDate : this.state.projectEndDate
		           		 },
				          })(
					          <EditUser
								visible = {this.state.visible}
								onCancel = { () => this.editUser()}
							/>
						  )}
		        </FormItem>

				<Pagination defaultCurrent={1} total={users ? users.totalRecords : 10} onChange = {this.handlePageNumber}/>
			</div>
		)
	}
}
const UserList = Form.create()(UserListView);
export default connect(
	
)(UserList);