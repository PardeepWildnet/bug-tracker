import React, { Component } from 'react';
import { connect } from  'react-redux';

import * as dashBoardActions from './../../data/dashboard/action';
import './style.css';

class ItemSearch extends Component{
	constructor(props){
		super(props);
		this.onSearch = this.onSearch.bind(this);
	}

	onSearch(e){
		// console.log(e.target.value);
		this.props.onSearch(e.target.value);
	}

	render(){
		return(
			<div>
				<input 
					className = 'master-search'
					placeholder = 'Master Search here.....'
					onChange = {this.onSearch}
				/>
			</div>
		)
	}
}

export default connect(
	state => ({

	})
)(ItemSearch);