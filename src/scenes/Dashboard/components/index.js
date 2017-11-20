import React, { Component } from 'react';
import { connect } from  'react-redux';

import * as fetchAPI from './../data/dashboard/api';

import ItemList from './ItemList';
import ItemSearch from './ItemSearch';

class DashboardView extends Component{
	filterKeyword = '';

	constructor(props){
		super(props);
		localStorage.setItem('isNavBar','show');
		this.onSearch = this.onSearch.bind(this);
	}

	componentWillMount(){
		this.props.dispatch(fetchAPI.fetchAPI());
	}

	onSearch(keyword){
		this.filterKeyword = keyword;
		this.forceUpdate();
	}

	render(){
		const { 
			receipeList 
		} = this.props;

		return(
			<div> 
			<p className = 'heading-style'> Dashboard </p>
				{/*<ItemSearch onSearch={this.onSearch} />
								<ItemList 
									receipeList = {receipeList} 
									filterKeyword = {this.filterKeyword} 
								/>*/}
			</div>
		)
	}
}

export default connect(
	state => {
		return ({
			receipeList: state.dashboard.data.dashboard
		})
	}
)(DashboardView);