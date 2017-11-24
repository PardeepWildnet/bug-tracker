import React, { Component } from 'react';
import { Form, Affix, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as api from './../../data/UserList/api';
import user from './../../../../Assets/userList.json';
// import * as api from './../../data/DeleteProject/api';
// import EditProject from './../EditProjectDetails';
// import './ProjectList.css'

const FormItem = Form.Item;

class UserListView extends Component {
	constructor(props) {
		super(props);
		this.handlePageNumber = this.handlePageNumber.bind(this);
	}

	handlePageNumber (value) {
		this.props.dispatch(api.fetchUserList(value));
	}

	render(){
		const { 
			users 
		} = this.props;

		const { 
			getFieldDecorator 
		} = this.props.form;
		console.log("user list", user);
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
							user ? 
							user.map((item, index) => (
									<tr key = {index}>
										<td>{index + 1} </td>
										<td>{item.firstName} </td>
										<td>{item.lastName} </td>
										<td>{item.email} </td>
										<td><Link to={'/dashboard/user/' + item.id }><i className="fa fa-eye icon-style" aria-hidden="true"></i></Link></td>
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
				<Pagination defaultCurrent={1} total={500} onChange = {this.handlePageNumber}/>
			</div>
		)
	}
}
const UserList = Form.create()(UserListView);
export default connect(

)(UserList);