import React, { Component } from 'react';
import { connect } from  'react-redux';

import './style.css'

class UserSearch extends Component{
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
			<div className = 'search-container'>
				<p className = 'search-heading'>Search By Email </p>
				<input 
					className = 'master-search'
					placeholder = 'Search Email'
					onChange = {this.onSearch}
				/>
			</div>
		)
	}
}

export default connect(
	state => ({

	})
)(UserSearch);