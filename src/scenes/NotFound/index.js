import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NotFound extends Component {
	render () {
		return (
			<div>
				Page Not Found
				<NavLink to="/" className = 'list-group-item-signIn'>
	        	   Back
	        	</NavLink>
			</div>
		)
	}
}

export default NotFound