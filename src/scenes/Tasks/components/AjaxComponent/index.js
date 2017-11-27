import React, { Component }  from 'react';
import { Fetch } from './../Fetch';

export class Ajax extends Component {
	render() {
		return(
			<Fetch url = "http://jsonplaceholder.typicode.com/posts">
			{(data) => {
				return data.map((value, index) =>{
					return <li key = { index }>{value.title}</li>
				})
			}}
			</Fetch>
		);
	}
}