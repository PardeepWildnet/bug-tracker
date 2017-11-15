import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class VerifyEmail extends Component {
	render () {
		return(
			<div>
				<h1> Your account is verified successfully </h1>
        		<NavLink to="/login" activeClassName = 'active' className = 'list-group-item'> Login </NavLink>
        	</div>
		)
	}
}

export default VerifyEmail