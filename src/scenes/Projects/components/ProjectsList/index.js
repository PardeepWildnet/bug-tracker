import React, { Component } from 'react';
import { Form, Affix, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as projectListApi from './../../data/ProjectsList/api';
import * as api from './../../data/DeleteProject/api';
import EditProject from './../EditProjectDetails';
import './ProjectList.css'

const FormItem = Form.Item;
class ProjectsListView extends Component {
	constructor(props) {
		super(props);
		this.editProject = this.editProject.bind(this);
		this.deleteProject = this.deleteProject.bind(this);
		this.handlePageNumber = this.handlePageNumber.bind(this);
		this.state = {
			visible : false,
			pageNumber : 1,
			projectName : 'nmnm',
			projectCreatedBy : 'jhjhj',
			projectDetails : 'kjk',
			projectStartDate : '',
			projectEndDate : '',
			projectId : ''
		}
	}

	handlePageNumber (value) {
		this.setState({
			pageNumber : value
		}, function() {
			console.log("current page number is", this.state.pageNumber);
		})
		this.props.dispatch(projectListApi.fetchProjectsList(value));
	}

	editProject (project) {
		console.log("inside edit project", project);
		if(project) {
			this.setState({
				visible : !this.state.visible,
				projectName : project.projectName ,
				projectCreatedBy : project.projectCreatedBy , 
				projectDetails : project.projectDetails ,
				projectStartDate : project.projectStartDate ,
				projectEndDate : project.projectEndDate,
				projectId : project._id
			})
		}
		else {
			this.setState({
				visible : !this.state.visible
			})
		}
		this.forceUpdate();
	}

	deleteProject (project) {
		this.props.dispatch(api.deleteProject(project))
		console.log("inside delete project", project);
	}

	render(){
		const { 
			projects 
		} = this.props;

		const { 
			getFieldDecorator 
		} = this.props.form;
		console.log("project list is", projects);
		debugger
		// const data = (projects.totalRecords && projects.totalRecords / 10 )|| 2;
		return(
			<div>
				<div className = 'project-list-container'>
					<table className = 'table table-striped table-responsive'>
						<tbody>
								<tr>
								<th>S No.</th>
								<th>Name</th>
								<th>Created By</th>
								<th>Details</th>
								<th>Start Date</th>
								<th>End Date</th>
								<th>Action</th>
							</tr>
						</tbody>
						
						<tbody>
					{
						projects ? 
						projects.data.result.map((project, index) => (
								<tr key = {index}>
									<td><Link to={'/tasks/' + project._id }> {index + ((this.state.pageNumber - 1) * 10) + 1} </Link></td>
									<td><Link to={'/tasks/' + project._id }> {project.projectName  ? project.projectName : '-'} </Link></td>
									<td><Link to={'/tasks/' + project._id }> {project.projectCreatedByName  ?  project.projectCreatedByName :'-'} </Link></td>
									<td><Link to={'/tasks/' + project._id }> {project.projectDetails ? project.projectDetails : '-'} </Link></td>
									<td><Link to={'/tasks/' + project._id }> {project.projectStartDate} </Link></td>
									<td><Link to={'/tasks/' + project._id }> {project.projectEndDate} </Link></td>
									<td>
										<Link to={'/dashboard/projects/' + project._id }><i className="fa fa-eye icon-style" aria-hidden="true"></i></Link>
										<i className="fa fa-pencil icon-style" onClick = {() => this.editProject(project) } aria-hidden="true"></i>
										<i className="fa fa-trash-o icon-style" onClick = {() => this.deleteProject(project) } aria-hidden="true"></i>
									</td>
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
					<FormItem>
			          {getFieldDecorator('editProjectDetails', {
			            initialValue: { 
			            	projectName : this.state.projectName, 
			            	projectCreatedBy : this.state.projectCreatedBy,
			            	projectDetails : this.state.projectDetails, 
			            	projectStartDate : this.state.projectStartDate,
			            	projectEndDate : this.state.projectEndDate,
			            	projectId : this.state.projectId
			            },
			          })(
				          <EditProject
							visible = {this.state.visible}
							onCancel = { () => this.editProject()}
						/>
					  )}
			        </FormItem>
				</div>
			<Pagination defaultCurrent={1}  total={projects ? projects.data.totalRecords : 10} onChange = {this.handlePageNumber}/>
		</div>
		)
	}
}
const ProjectsList = Form.create()(ProjectsListView);
export default connect(
	
)(ProjectsList);