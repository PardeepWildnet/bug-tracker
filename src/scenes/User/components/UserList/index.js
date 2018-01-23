import React, { Component } from 'react';
import { Pagination, Tooltip, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as serachApi from './../../data/SearchByRole/api';
import * as api from './../../data/UserList/api';
import * as userDeleteApi from './../../data/UserDelete/api';
import Loader from './../../../Loader';
import user from './../../../../Assets/userList.json';
import './style.css';

class UserList extends Component {
	constructor(props) {
		super(props);
		this.serachByRole = '';
		this.pageNumber = 1;
		localStorage.setItem('loader', true);
		this.state = { visible : false }
	}

	handlePageNumber = (value) => {
		this.pageNumber = value;
		if(this.serachByRole){
			this.props.dispatch(serachApi.serachByRoles(this.serachByRole, value))
		}
		else {
			this.props.dispatch(api.fetchUserList(value));
		}
	}

	deleteUser = (item) => this.props.dispatch(userDeleteApi.deleteUser(item))

	render(){
		const {
			users ,
			userRole,
			filterKeyword,
			searchedRole
		} = this.props;

		this.serachByRole = searchedRole;

	    let filteredList = users ? users : '';
	    let filteredList1 = {result : [], totalRecords : ''};

	    if (filterKeyword) {
			filteredList1.result = filterKeyword && filteredList.result.filter((item, index) => {
				const itemEmail = item.email.toLowerCase()
				return itemEmail.indexOf(filterKeyword) > -1 ? item : null
			}) || filteredList
			filteredList1.totalRecords = filteredList1.result.length;
			filteredList = filteredList1;
			this.pageNumber = 1;
	    }
	    
	    if( filteredList === '') {
          	return  (
				<div className = 'project-list-container'>
	          	<table className = 'table table-striped table-responsive'>
					<tbody>
						<tr>
							<th>S No.</th>
							<th> Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>Action</th>
						</tr>
					</tbody>

					<tbody>
						<tr>
							<td colSpan = '5'>
								<Loader />
							</td>
						</tr>
					</tbody>
				</table>
				</div>
			)
	    }
	    else {
		return(
			<div>
				<div className = 'user-list-container' style = {{ background : this.context.background}}>
				<p className = 'total-record-style'>Total Users : {filteredList ? filteredList.totalRecords : '0'} </p>
					<table className = 'table table-striped table-responsive'>
						<tbody>
							<tr>
								<th>S No.</th>
								<th> Name</th>
								<th>Email</th>
								<th>Role</th>
								<th>Action</th>
							</tr>
						</tbody>

						<tbody>
						{
							filteredList && filteredList.totalRecords  ?
							filteredList.result.map((item, index) => (
								<tr key = {index}>
									<td>{index + ((this.pageNumber - 1) * 10) + 1}</td>
									<td>{item.firstName} {item.lastName} </td>
									<td>{item.email} </td>
									<td>{item.accountType} </td>
									<td>
										<Link to={'/dashboard/user/' + item._id }>
											<Tooltip title="User Detail Here">
												<i className="fa fa-eye icon-style" aria-hidden="true"></i>
											</Tooltip>
										</Link>
										<Popconfirm title="Are you sure delete this User ?" onConfirm= {() => this.deleteUser(item) } okText="Yes" cancelText="No">
											<i className="fa fa-trash-o icon-style" aria-hidden="true"></i>
										</Popconfirm>
									</td>
								</tr>
							)) :
							<tr>
								<td colSpan = '5'>No Record Found </td>
							</tr>
						}
						</tbody>
					</table>
				</div>
				{ filteredList && filteredList.totalRecords > 10 ?
					<Pagination defaultCurrent={1} total={filteredList ? filteredList.totalRecords : 10} onChange = {this.handlePageNumber}/> : ''
				}
			</div>
		)
	}}
}


UserList.contextTypes = {
  color: PropTypes.string,
  background : PropTypes.string
};

export default connect(

)(UserList);
