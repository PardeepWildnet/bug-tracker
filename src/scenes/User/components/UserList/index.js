import React, { Component } from 'react';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as serachApi from './../../data/SearchByRole/api';
import * as api from './../../data/UserList/api';
import * as userDeleteApi from './../../data/UserDelete/api';
import user from './../../../../Assets/userList.json';

class UserList extends Component {
	serachByRole = '';
	constructor(props) {
		super(props);

		this.handlePageNumber = this.handlePageNumber.bind(this);
		this.deleteUser = this.deleteUser.bind(this);

		this.state = {
			visible : false,
			pageNumber : 1,
		}
	}

	handlePageNumber (value) {
		this.setState({
			pageNumber : value
		}, function() {
			console.log("current page number is", this.state.pageNumber);
		})
		if(this.serachByRole){
			this.props.dispatch(serachApi.serachByRoles(this.serachByRole, value))
		}
		else {
			this.props.dispatch(api.fetchUserList(value));
		}
	}

	deleteUser (item) {
		this.props.dispatch(userDeleteApi.deleteUser(item))
	}

	render(){
		const { 
			users , 
			userRole,
			filterKeyword,
			searchedRole
		} = this.props;

		this.serachByRole = searchedRole;

		let filteredList = users ? users : '';
		filteredList = filterKeyword && filteredList.result.filter((item, index) => {
			const itemEmail = item.email.toLowerCase()
			return itemEmail.indexOf(filterKeyword) > -1 ? item : null
		}) || filteredList

		return(
			<div>
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
						{
							filteredList ? 
							filteredList.result.map((item, index) => (
									<tr key = {index}>
										<td>{index + ((this.state.pageNumber - 1) * 10) + 1}</td>
										<td>{item.firstName} {item.lastName} </td>
										<td>{item.email} </td>
										<td>{item.accountType} </td>
										<td>
											<Link to={'/dashboard/user/' + item._id }><i className="fa fa-eye icon-style" aria-hidden="true"></i></Link>
											<i className="fa fa-trash-o icon-style" onClick = {() => this.deleteUser(item) } aria-hidden="true"></i>
										</td>
									</tr>
							)) :
							<tr>
								<td colSpan = '5'>
									<img src={require("./../../../../Assets/loader.gif")} role="presentation" className = 'loader-style'/>
								</td>
							</tr>
						}
						</tbody>
					</table>
				</div>

				<Pagination defaultCurrent={1} total={filteredList ? filteredList.totalRecords : 10} onChange = {this.handlePageNumber}/>
			</div>
		)
	}
}
export default connect(
	
)(UserList);