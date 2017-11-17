import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Logout extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount () {
		this.props.history.push('/login');
	}
}


export default connect(

)(withRouter(Logout));