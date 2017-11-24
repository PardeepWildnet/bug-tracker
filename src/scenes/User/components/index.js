import React, { Component } from 'react';
import { connect }  from 'react-redux';

import AddUser from './AddUser';
import UserList from './UserList';

import * as api from './../data/UserList/api';

class Users extends Component {
	constructor() {
		super();
	}

	componentWillMount(){
		this.props.dispatch(api.fetchUserList('1'));
	}

	componentWillReceiveProps(nextProps, nextState){
		console.log("Inside Add Projects", nextProps);
	}

	render() {
		const { 
			userLists 
		} = this.props;

	debugger
		return (
			<div>
				<p className = 'heading-style project-style'> Users </p>
				<AddUser />
				<UserList users = {userLists}/>
			</div>
		)
	}
}

export default connect(
	state => {
		return ({
			userLists : state.user.data.userList[0],
		})
	}
)(Users)