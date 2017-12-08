import React, { Component } from 'react';
import { connect }  from 'react-redux';

import AddUser from './AddUser';
import UserList from './UserList';
import UserSearch from './UserSearch';

import * as api from './../data/UserList/api';
import * as userRoleApi from './../data/UserRole/api';

console.clear();

class Users extends Component {
	filterKeyword = '';
	constructor(props){
		super(props);
		this.onSearch = this.onSearch.bind(this);
	}

	componentWillMount(){
		this.props.dispatch(api.fetchUserList('1'));
		this.props.dispatch(userRoleApi.userRole());
	}

	componentWillReceiveProps(nextProps, nextState){
		console.log("Inside Add Projects", nextProps);
	}

	onSearch(keyword){
		this.filterKeyword = keyword;
		this.forceUpdate();
	}

	render() {
		const { 
			userLists,
			userRole
		} = this.props;
		return (
			<div>
				<p className = 'heading-style project-style'> Users </p>
				<AddUser role = {userRole} />
				<UserSearch onSearch={this.onSearch} /><br />
				<UserList users = {userLists} filterKeyword = {this.filterKeyword} />
			</div>
		)
	}
}

export default connect(
	state => {
		return ({
			userLists : state.user.data.userList[state.user.data.userList.length -1],
			userRole : state.user.data.userRole[0]
		})
	}
)(Users)