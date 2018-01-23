import React, { Component } from 'react';
import { Pagination, Tooltip, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Time from 'react-time';

import * as projectListApi from './../../data/ProjectsList/api';
import Loader from './../../../Loader'
import * as api from './../../data/DeleteProject/api';
import './ProjectList.css'


class ProjectsList extends Component {
	constructor(props) {
		super(props);
		this.pageNumber = 1;
		this.state = { visible : false }
	}

	// This method is used to render list of projects with page number
	handlePageNumber = (value) => {
		this.pageNumber = value;
		this.props.dispatch(projectListApi.fetchProjectsList(value));
	}

	// This method is used to delete the project
	deleteProject = (project) => this.props.dispatch(api.deleteProject(project))

	render(){
		const { projects } = this.props;
		
		return(
			<div>
				<div className = 'project-list-container'>
				<p className = 'total-record-style'>Total Projects : {projects ? projects.totalRecords : '0'} </p>
					<table className = 'table table-striped table-responsive'>
						<tbody>
							<tr>
								<th>S No.</th>
								<th>Name</th>
								<th>Created By</th>
								<th>Details</th>
								<th>Teams Assigned</th>
								<th>Start Date</th>
								<th>End Date</th>
								<th>Action</th>
							</tr>
						</tbody>
						{ projects ? 
							<tbody>
								{
								projects.result ?
								projects.result.map((project, index) => (
									<tr key = {index}>
										<td> {index + ((this.pageNumber - 1) * 10) + 1} </td>
										<td> {project.projectName  ? project.projectName : '-'} </td>
										<td> {project.projectCreatedBy  ?  project.projectCreatedBy.firstName + " " +project.projectCreatedBy.lastName :'-'} </td>
										<td> {project.projectDetails ? project.projectDetails : '-'} </td>
										<td>
											{
												project.assigneeTeam ? project.assigneeTeam.map((team, index) => (
													<p key = {index}>
														<Link to={'/dashboard/teams/' + team._id }>
															{team ? team.teamTitle : '-'}
														</Link>
													</p> ))  : '-'
											}
										</td>
										<td> <Time value={project.projectStartDate} format="DD-MM-YYYY" /> </td>
										<td> <Time value={project.projectEndDate} format="DD-MM-YYYY" /> </td>
										<td>
											<Link to={'/dashboard/projects/' + project._id }>
												<Tooltip title="Project Detail Here">
													<i className="fa fa-eye icon-style" aria-hidden="true"></i>
												</Tooltip>
											</Link>
											<Popconfirm title="Are you sure delete this Project ?" onConfirm= {() => this.deleteProject(project) } okText="Yes" cancelText="No">
												<i className="fa fa-trash-o icon-style" aria-hidden="true"></i>
											</Popconfirm>
										</td>
									</tr>
								))  : 
								<tr>
									<td colSpan = '8'>
										No Record Found	
									</td>
								</tr>
								}
							</tbody> :
							<tr>
								<td colSpan = '8'>
									<Loader />
								</td>
							</tr>
						}
					</table>
				</div>
				{
					projects && projects.totalRecords > 10 ?
						<Pagination defaultCurrent={1}  total={projects.totalRecords} onChange = {this.handlePageNumber}/> : ''
				}
			</div>
		)
	}
}

export default connect()(ProjectsList);
