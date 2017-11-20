import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './VerifyEmail.css'
class VerifyEmail extends Component {
	render () {
		return(
			<div className = 'verify-email'>
				<h1> Your account is verified successfully </h1>
        		<NavLink to="/login" activeClassName = 'active' className = 'list-group-item'> Login </NavLink>
        	</div>
		)
	}
}

export default VerifyEmail