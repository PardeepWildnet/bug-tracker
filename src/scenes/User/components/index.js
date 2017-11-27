import React, { Component } from 'react';
import { connect }  from 'react-redux';

import AddUser from './AddUser';
import UserList from './UserList';

import * as api from './../data/UserList/api';
import * as userRoleApi from './../data/UserRole/api';

class Users extends Component {
	constructor() {
		super();
	}

	componentWillMount(){
		this.props.dispatch(api.fetchUserList('1'));
		this.props.dispatch(userRoleApi.userRole());
	}

	componentWillReceiveProps(nextProps, nextState){
		console.log("Inside Add Projects", nextProps);
	}

	render() {
		const { 
			userLists,
			userRole
		} = this.props;

	debugger
		return (
			<div>
				<p className = 'heading-style project-style'> Users </p>
				<AddUser role = {userRole} />
				<UserList users = {userLists}/>
			</div>
		)
	}
}

export default connect(
	state => {
	debugger
		return ({
			userLists : state.user.data.userList[0],
			userRole : state.user.data.userRole[0]
		})
	}
)(Users)