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
		debugger
		return(
			<div className = 'project-list-container'>
				<table width = '100%' className = 'table table-striped'>
					<tr>
						<th>S No.</th>
						<th>Name</th>
						<th>Created By</th>
						<th>Details</th>
						<th>Start Date</th>
						<th>End Date</th>
						<th>Action</th>
					</tr>
					<tbody>
				{
					projects ? 
					projects.result.map((product, index) => (
							<tr key = {product.id}>
								<td><Link to={'/tasks/' + product.id }>{index}</Link></td>
								<td><Link to={'/tasks/' + product.id }>{product.projectName}</Link></td>
								<td><Link to={'/tasks/' + product.id }>{product.projectCreatedBy}</Link></td>
								<td><Link to={'/tasks/' + product.id }>{product.projectDetails}</Link></td>
								<td><Link to={'/tasks/' + product.id }>{product.projectStartDate}</Link></td>
								<td><Link to={'/tasks/' + product.id }>{product.projectEndDate}</Link></td>
								<td><i className="fa fa-pencil icon-style" aria-hidden="true"></i>
								/<i className="fa fa-trash-o icon-style" aria-hidden="true"></i></td>
							</tr>
					)) :
					<tr>
						<td colSpan = '7'>
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

