import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import * as api from './../../data/UserDetail/api';
import './UserDetail.css';

class UserDetail extends Component {
	constructor (props) {
		super(props);
		console.log("props", props);
	}

	componentWillMount (){
		console.log("id is ", this.props.match.params.id);
		this.props.dispatch(api.fetchUserDetail(this.props.match.params.id));
	}

	render () {
		const {
			userDetail 
		} = this.props;

		console.log("user detail ", userDetail);
		return (
			<div className = 'user-detail-view'>
				<p className = 'heading-style user-style'> User Detail </p>
				<table className = 'table table-striped table-responsive table-view'>
					<tbody>
						<tr>
								<th>Key</th>
								<th>Value</th>
						</tr>
					</tbody>
				  { userDetail ?
				  	userDetail.map((item, index) => (
		  			item.id === this.props.match.params.id ? 
			  			<tbody key = {index}>
				  			<tr>
				  				<td>Name : </td>
				  				<td>{item.firstName}  {item.lastName}</td>
				  			</tr>
							<tr>
				  				<td>Email :</td>
				  				<td>{item.email}</td>
				  			</tr>
							<tr>
				  				<td>Gender :</td>
				  				<td>{item.gender}</td>
				  			</tr>
							<tr>
				  				<td> Designation : </td>
				  				<td>{item.designation}</td>
				  			</tr>
							<tr>
				  				<td>Department : </td>
				  				<td>{item.department}</td>
				  			</tr>
				  			<tr>
				  				<td>Phone No.</td>
				  				<td>{item.phone}</td>
				  			</tr>
				  			<tr>
				  				<td>Address : </td>
				  				<td>{item.address}</td>
				  			</tr>
				  		</tbody> : 
			  			''
				  	)):''
				  }
   				</table>
			</div>
		)
	}
}

export default connect(
	state => {
		return ({
			userDetail : state.user.data.userDetail[0]
		})
	}
)(UserDetail);
