import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import './style.css';

class ItemList extends Component{

	onSelectProduct(item){
		console.log(item);
		this.props.history.push('/dashboard/' + item.email);
	}

	render(){
		const { 
			receipeList, 
			filterKeyword 
		} = this.props;

		let filteredList = receipeList.length && [...receipeList[0].data.results];

		filteredList = filterKeyword &&  filteredList.filter((obj,i) => {
			const objEmail = obj.email.toLowerCase()
			return objEmail.indexOf(filterKeyword) > -1 ? obj : null
		}) || filteredList

		return(
			<div>
				{
					filteredList.length ? filteredList.map((item, i) => (
						<div 
							className='item-container' 
							key={i} 
							onClick={() => { this.onSelectProduct(item) 
							}}>
								<img 
									className='receipe-logo' 
									src={item.picture.thumbnail} 
									alt = {item.name.first} 
								/>
								<span>
									{item.email ? item.email : item.name.first } 
								</span>
						</div>
					)):
					<span>
						Loading...
					</span>
				}
			</div>
		)
	}
}

export default withRouter(ItemList)