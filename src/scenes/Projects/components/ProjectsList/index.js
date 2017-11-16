import React, { Component } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

import './ProjectList.css'

class ProjectsList extends Component {
	constructor() {
		super();
		this.editProject = this.editProject.bind(this);
	}

	editProject (data) {
		console.log("inside edit project");
	}

	render(){
		const { 
			projects 
		} = this.props;
		
		return(
			<div className = 'project-list-container'>
				<table width = '100%' className = 'table table-striped'>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Link</th>
						<th>Action</th>
					</tr>
					<tbody>
				{
					projects ? 
					projects.data.map((product) => (
							<tr>
								<td><Link to={'/tasks/' + product.id } key = {product.id}>{product.name}</Link></td>
								<td><Link to={'/tasks/' + product.id } key = {product.id}>{product.email}</Link></td>
								<td><Link to={'/tasks/' + product.id } key = {product.id}>www.instagram.com</Link></td>
								<td>
								/<i className="fa fa-clock-o icon-style" aria-hidden="true"></i></td>
							</tr>
					)) :
					<tr>
						<td colspan = '4'>
							<img src={require("./../../../../Assets/loader.gif")} className = 'loader-style'/>
						</td>
					</tr>
				}
				</tbody>
				</table>


			</div>
		)
	}
}

export default ProjectsList

// <Link to={'/tasks?id:' + product.id + '&email:' + product.email} key = {product.id}>
// <img src = 'https://cdn.dribbble.com/users/255512/screenshots/2215917/animation.gif' className = 'loader-style'/>

