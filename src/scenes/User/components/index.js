import React, { Component } from 'react';
import { connect }  from 'react-redux';
import { BackTop, Carousel } from 'antd';

import AddUser from './AddUser';
import UserList from './UserList';
import UserSearch from './UserSearch';

import './style.css';
import * as api from './../data/UserList/api';
import * as userRoleApi from './../data/UserRole/api';

console.clear();

class Users extends Component {
	constructor(props) {
		super(props);
		this.filterKeyword = '';
		this.searchedRole = '';		
	}
	
	componentWillMount = () => {
		this.props.dispatch(api.fetchUserList('1'));
		this.props.dispatch(userRoleApi.userRole());
	}

	onSearch = (keyword) => {
		this.filterKeyword = keyword;
		this.forceUpdate();
	}

	SearchByRole = (role) => {
		this.searchedRole = role;
		this.forceUpdate();
	}

	render() {
		const {
			userLists,
			userRole
		} = this.props;
		return (
			<div className = 'container-style' >
				<p className = 'heading-style project-style'> Users </p>
				<Carousel autoplay effect="fade">
				    <div><h3>1</h3></div>
				    <div><h3>2</h3></div>
				    <div><h3>3</h3></div>
				    <div><h3>4</h3></div>
				</Carousel>
				<AddUser role = {userRole} SearchByRole = {this.SearchByRole}/>
				<UserSearch onSearch={this.onSearch} /><br />
				<UserList users = {userLists} filterKeyword = {this.filterKeyword} searchedRole = {this.searchedRole}/>
				<BackTop />
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
             	// <img alt="example" width="100%" src={require("./../../../Assets/users.jpg")} className="custom-image user-image"/>
