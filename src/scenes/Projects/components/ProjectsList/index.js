import React, { Component } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as api from './../../data/DeleteProject/api';
import './ProjectList.css'

class ProjectsList extends Component {
	constructor() {
		super();
		this.editProject = this.editProject.bind(this);
		this.deleteProject = this.deleteProject.bind(this);
	}

	editProject (project) {
		console.log("inside edit project", project);

	}

	deleteProject (project) {
		this.props.dispatch(api.deleteProject(project))
		console.log("inside delete project", project);
	}

	render(){
		const { 
			projects 
		} = this.props;
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
					projects.result.map((project, index) => (
							<tr key = {project.id}>
								<td><Link to={'/tasks/' + project.id }> {index + 1} </Link></td>
								<td><Link to={'/tasks/' + project.id }> {project.projectName} </Link></td>
								<td><Link to={'/tasks/' + project.id }> {project.projectCreatedBy} </Link></td>
								<td><Link to={'/tasks/' + project.id }> {project.projectDetails} </Link></td>
								<td><Link to={'/tasks/' + project.id }> {project.projectStartDate} </Link></td>
								<td><Link to={'/tasks/' + project.id }> {project.projectEndDate} </Link></td>
								<td><i className="fa fa-pencil icon-style" onClick = {() => this.editProject(project) } aria-hidden="true"></i>
								/<i className="fa fa-trash-o icon-style" onClick = {() => this.deleteProject(project) } aria-hidden="true"></i></td>
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

export default connect(

)(ProjectsList);

// <Link to={'/tasks?id:' + project.id + '&email:' + project.email} key = {project.id}>
// <img src = 'https://cdn.dribbble.com/users/255512/screenshots/2215917/animation.gif' className = 'loader-style'/>

