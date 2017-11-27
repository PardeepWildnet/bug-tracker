import React, { Component } from 'react';
import { Fetch } from './../Fetch';

export class User extends Component {
	render() {
		return(
			<div>
				<h1> Users </h1>
				<Fetch url = "http://jsonplaceholder.typicode.com/users">
				{(data) => {
					return data.map((value, index) =>{
						return <li key = { index }>{value.address.street}</li>
					})
				}}
				</Fetch>
			</div>
		);
	}
}