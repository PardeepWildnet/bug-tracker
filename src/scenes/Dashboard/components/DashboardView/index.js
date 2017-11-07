import React, { Component } from 'react';
import './style.css';

class DashboardView extends Component{
	
	render(){
		return(
			<div>
				Your Selected Receipe Name is :- <b> {this.props.match.params.receipe} </b>
			</div>
		)
	}
}

export default DashboardView;